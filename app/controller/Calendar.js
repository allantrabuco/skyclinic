/*
 * File: app/controller/Calendar.js
 */

Ext.define('skyclinic.controller.Calendar', {
    extend: 'Ext.app.Controller',

    refs: {
        mainRef: 'calendar'
    },

    control: {
        "calendar": {
            afterlayout: 'onCalendarAfterLayout',
            afterrender: 'onCalendarAfterRender',
            resize: 'onPanelResize'
        },
        "calendar toolbar button[action=previous]": {
            click: 'onPreviousButtonClick'
        },
        "calendar toolbar button[action=next]": {
            click: 'onNextButtonClick'
        },
        "calendar toolbar button[action=today]": {
            click: 'onTodayButtonClick'
        },
        "calendar toolbar button[action=goto]": {
            click: 'onGotoButtonClick'
        },
        "calendar toolbar button[action=month]": {
            click: 'onMonthButtonClick'
        },
        "calendar toolbar button[action=week]": {
            click: 'onWeekButtonClick'
        },
        "calendar toolbar button[action=day]": {
            click: 'onDayButtonClick'
        }
    },

    onCalendarAfterLayout: function(container, layout, eOpts) {
        var me = this,
            cmp = container,
            today = new Date();

        cmp.refDate = today;
        cmp.selected = today;

        if (cmp.first) {
            cmp.first = false;
            if (cmp.action !== 'd')
                me.buildCalendar(today);
        } else {
            if (!Ext.isEmpty(cmp.firstMarkEl)) {
                cmp.firstMarkEl.parentElement.scrollIntoView();
            }
        }
    },

    onCalendarAfterRender: function(component, eOpts) {
        var me = this,
            cmp = component;
        cmp.first = true;

        cmp.down('panel[name=dayView]').body.on('click', me.onDayWeekViewClick, me);
    },

    onPreviousButtonClick: function(button, e, eOpts) {
        var me = this,
            btn = button,
            cmp = btn.up('calendar');
            viewerBtn = cmp.down ('toolbar').down('button[pressed=true]');

        if (viewerBtn.action === 'month') {

            cmp.refDate = Ext.Date.subtract(cmp.refDate, Ext.Date.MONTH, 1);
            me.buildCalendar(cmp.refDate);

        } else if (viewerBtn.action === 'week') {

            cmp.refDate = Ext.Date.subtract(cmp.selected, Ext.Date.DAY, 7);
            cmp.selected = cmp.refDate;
            me.buildCalendar(cmp.refDate);
            me.onWeekButtonClick(viewerBtn);

        } else if (viewerBtn.action === 'day') {

            cmp.refDate = Ext.Date.subtract(cmp.selected, Ext.Date.DAY, 1);
            cmp.selected = cmp.refDate;
            me.onDayButtonClick(viewerBtn);
        }


        cmp.down('panel[name=calend-title]').setTitle(Ext.Date.format(cmp.refDate, "F / Y"));

        //console.log('previous', cmp.refDate);

        me.getController('Diary').getStore('Schedules').load();
    },

    onNextButtonClick: function(button, e, eOpts) {
        var me = this,
            btn = button,
            cmp = btn.up('calendar');
            viewerBtn = cmp.down ('toolbar').down('button[pressed=true]');

        if (viewerBtn.action === 'month') {

            cmp.refDate = Ext.Date.add(cmp.refDate, Ext.Date.MONTH, 1);
            me.buildCalendar(cmp.refDate);

        } else if (viewerBtn.action === 'week') {

            cmp.refDate = Ext.Date.add(cmp.selected, Ext.Date.DAY, 7);
            cmp.selected = cmp.refDate;
            me.buildCalendar(cmp.refDate);
            me.onWeekButtonClick(viewerBtn);

        } else if (viewerBtn.action === 'day') {

            cmp.selected = Ext.Date.add(cmp.selected, Ext.Date.DAY, 1);
            cmp.refDate = cmp.selected;
            me.onDayButtonClick(viewerBtn);

        }


        //cmp.down('container[name=calend-title]').getEl().setHtml(Ext.Date.format(cmp.refDate, "F / Y"));
        cmp.down('panel[name=calend-title]').setTitle(Ext.Date.format(cmp.refDate, "F / Y"));


        //console.log('next', cmp.refDate);

        me.getController('Diary').getStore('Schedules').load();
    },

    onTodayButtonClick: function(button, e, eOpts) {
        var me = this,
            btn = button,
            cmp = btn.up('calendar'),
            viewerBtn = cmp.down ('toolbar').down('button[pressed=true]');

        cmp.refDate = new Date();
        cmp.selected = cmp.refDate;

        if (viewerBtn.action !== 'day')
            me.buildCalendar(cmp.refDate);


        if (viewerBtn.action === 'week') {
            me.onWeekButtonClick(viewerBtn);
        } else if (viewerBtn.action === 'day') {
            me.onDayButtonClick(viewerBtn);
        }

        //console.log('today', cmp.refDate);
        me.getController('Diary').getStore('Schedules').load();
    },

    onGotoButtonClick: function(button, e, eOpts) {
        var me = this,
            btn = button,
            gotoDate = btn.up().down('datefield[name=gotoDate]').getValue(),
            cmp = btn.up('calendar'),
            viewerBtn = cmp.down ('toolbar').down('button[pressed=true]');

        if (!Ext.isEmpty(gotoDate)) {
            cmp.refDate = gotoDate;
            cmp.selected = gotoDate;
            cmp.down('panel[name=calend-title]').setTitle(Ext.Date.format(cmp.refDate, "F / Y"));

            //cmp.down('container[name=calend-title]').getEl().setHtml(Ext.Date.format(cmp.refDate, "F / Y"));

            if (viewerBtn.action !== 'day')
                me.buildCalendar(cmp.refDate);
        }

        if (viewerBtn.action === 'week') {
            me.onWeekButtonClick(viewerBtn);

        } else if (viewerBtn.action === 'day') {
            me.onDayButtonClick(viewerBtn);
        }

        //console.log('goto', cmp.refDate);
        me.getController('Diary').getStore('Schedules').load();
    },

    onMonthButtonClick: function(button, e, eOpts) {
        var me = this,
            btn = button,
            cmp = btn.up('calendar'),
            date = new Date(1980, 0, 5);

        cmp.action = 'm';

        Ext.Array.each(cmp.query('container[calendHeader=true]'), function(header, idx) {
            header.setVisible(true);
        });

        Ext.Array.each(cmp.query('container[day=true]'), function(day, idx) {
            day.setVisible(true);
        });

        Ext.Array.each(cmp.query('container[week=true]'), function(week, idx) {
            week.setVisible(true);
        });

        cmp.down('container[name=time]').setVisible(false);
        cmp.down('container[name=scrollFill]').setVisible(false);

        cmp.down('panel[name=dayView]').setVisible(false);
        cmp.down('container[name=calendar]').setVisible(true);


        Ext.Array.each(cmp.query('container[calendHeader=true]'), function(header, idx) {
            //var d = header.el.dom.childNodes[0].childNodes[0].childNodes[0].data;
            date = Ext.Date.add(date, Ext.Date.DAY, 1);
            header.setVisible(true);
            header.getEl().dom.classList.remove('calend-today-header');
            header.el.dom.childNodes[0].childNodes[0].childNodes[0].data = Ext.Date.format(date, 'D');
        });

        me.buildCalendar(cmp.refDate);
        me.getController('Diary').getStore('Schedules').load();
    },

    onWeekButtonClick: function(button, e, eOpts) {
        var me = this,
            btn = button,
            cmp = btn.up('calendar'),
            today = new Date(),
            startWeekday = 0,
            varWeekday = 0,
            dateTxt = '';

        cmp.action = 'w';

        Ext.Array.each(cmp.query('container[day=true]'), function(day, idx) {
            day.setVisible(true);
        });

        Ext.Array.each(cmp.query('container[week=true]'), function(week, idx) {
            if (week.name !== cmp.week) {
                week.setVisible(false);
            } else {
                week.setVisible(true);
                startWeekday = week.items.items[0].date;
                me.mountTimeColumn(startWeekday, 7);
            }
        });

        cmp.down('container[name=time]').setVisible(true);
        cmp.down('container[name=scrollFill]').setVisible(true);

        varWeekday = startWeekday;

        Ext.Array.each(cmp.query('container[calendHeader=true]'), function(header, idx) {
            header.setVisible(true);

            header.getEl().dom.classList.remove('calend-today-header');
            if (Ext.Date.format(cmp.refDate, 'w') === Ext.Date.format(varWeekday, 'w')) {
                header.getEl().dom.classList.add('calend-today-header');
            }

            if (Ext.Date.format(startWeekday, 'm') === Ext.Date.format(varWeekday, 'm')) {
                dateTxt = Ext.Date.format(varWeekday, ' D (d)');
            } else {
                dateTxt = Ext.Date.format(varWeekday, ' D (d/M)');
            }

            header.el.dom.childNodes[0].childNodes[0].childNodes[0].data = dateTxt; // change
            varWeekday = Ext.Date.add(varWeekday, Ext.Date.DAY, 1);
        });

        me.getController('Diary').getStore('Schedules').load();
    },

    onDayButtonClick: function(button, e, eOpts) {
        var me = this,
            btn = button,
            cmp = btn.up('calendar'),
            today = new Date(),
            index = 0,
            viewDay = 0;

        cmp.action = 'd';

        Ext.Array.each(cmp.query('container[week=true]'), function(week, idx) {
            if (week.name === cmp.week) {
                week.setVisible(true);
            } else {
                week.setVisible(false);
            }
        });

        Ext.Array.each(cmp.query('container[week=true]'), function(week, idxW) {
            Ext.Array.each(week.query('container[day=true]'), function(day, idx) {
                if (Ext.Date.format(day.date, 'Ymd') === Ext.Date.format(cmp.selected, 'Ymd')) {
                    viewDay = day.date;
                    day.setVisible(true);
                    index = idx;
                    me.mountTimeColumn(day.date, 1);
                } else {
                    day.setVisible(false);
                }
            });
        });

        Ext.Array.each(cmp.query('container[calendHeader=true]'), function(header, idx) {
            header.getEl().dom.classList.remove('calend-today-header');
            if (idx === index) {
                header.el.dom.childNodes[0].childNodes[0].childNodes[0].data = Ext.Date.format(cmp.selected, ' l (d)');
                header.setVisible(true);
                //header.getEl().dom.classList.add('calend-today-header');
            } else {
                header.setVisible(false);
            }
        });

        cmp.down('container[name=time]').setVisible(true);
        cmp.down('container[name=scrollFill]').setVisible(true);

        me.getController('Diary').getStore('Schedules').load();
    },

    onPanelResize: function(component, width, height, oldWidth, oldHeight, eOpts) {
        var me = this,
            calendar = me.getMainRef();

        Ext.Array.each(calendar.query('container[name=marker]'), function(mark, mIdx) {
            mark.destroy();
        });

        me.buildMarkers(calendar.records);
    },

    onDayContainerClick: function(event, self, container) {
        var me = this,
            cmp = container,
            slf = self,
            data = [],
            calendar = {},
            dayBtn = {};


        if (slf.className === 'calend-marker-count') return true;


        if (Ext.isObject(container)) {
            calendar = cmp.up('calendar');
            dayBtn = calendar.down('toolbar button[action=day]');
        } else {
            return true;
        }

        Ext.select('.calend-date-selected').removeCls('calend-date-selected');
        cmp.addCls('calend-date-selected');

        me.getMainRef().selected = cmp.date;
        me.getMainRef().week = cmp.up().name;

        for (i = 0; i < 24; i++) {
            data.push(i + ':00');
        }

        nCmp = new Ext.Component({
            autoEl: 'table',
            data: data,
            tpl: [
                '<tpl for=".">',
                '<tr><td>{.}</td></tr>',
                '</tpl>'
            ]
        });

        //cmp.add(nCmp);
        //if (cmp.getHeight() < nCmp.getEl().dom.offsetHeight) cmp.setHeight(nCmp.getEl().dom.offsetHeight + 20);

        dayBtn.setPressed(true);
        me.onDayButtonClick(dayBtn);

    },

    onDayWeekViewClick: function(ev, el) {
        var me = this,
            event = ev,
            element = el,

            agendCtrl = me.getController('Diary'),
            main = agendCtrl.getMainRef(),

            myviewport = me.getController('BodyHeader').getMainRef().up('myviewport'),

            height = myviewport.getHeight() - 50,
            width = myviewport.getWidth() - 100,

            win = me.application.getView('WinAux').create({
                name:'addSchedule',
                bodyPadding:'0 0 0 10'
            }),

            form = {},
            date = '',
            hour = 0,
            min = 0,
            begin = '',
            end = '';

        //if ((event.pageX < main.up('myviewport').getWidth() - 30)) {
            if (element.className === 'calend-body-hour') {
                Ext.Array.each(Ext.query('.calend-body-hour'), function(myEl, idx) {
                    myEl.classList.remove('calend-date-selected');
                });


                win.add(me.application.getView('DiaryForm').create());
                win.setTitle('Agendamento: {profissional}');

                win.setHeight(height);
                win.setWidth(width);


                form = win.down('diaryform');

                date = el.attributes.date.firstChild.wholeText;
                hour = parseInt(el.attributes.hour.firstChild.wholeText, 10);
                min = parseInt(el.attributes.minute.firstChild.wholeText, 10);

                begin = new Date(
                    Ext.Date.format(new Date(date), 'm/d/Y ') +
                                 hour + ':' + min
                );

                if (hour === 23) {
                    date = Ext.Date.add(new Date(date), Ext.Date.DAY, 1).toString();
                    hour = -1;
                }

                form.down('datefield[name=dateSchedule]').setValue(begin);
                form.down('combo[name=timeSchedule]').setValue(Ext.Date.format(begin, 'H:i'));

                win.show();
                //win.maximize();

                main.win = win;

                element.classList.add('calend-date-selected');
            }
        //}
    },

    buildCalendar: function(dateStart) {
        var me = this,
            cmp = me.getMainRef(),
            today = new Date(),
            start = dateStart,
        //    month = parseInt(Ext.Date.format(start, "m"), 10),
        //    year = parseInt(Ext.Date.format(start, "Y"), 10),
        //    firstDate = new Date(year, (month - 1) , 1),
            firstDate = Ext.Date.getFirstDateOfMonth(start),
            firstDay = parseInt(Ext.Date.format(firstDate, "w"), 10),
            prevDays = 0,
            days = 0,
            body = cmp.query('container[day=true]'),
            span = '',
            item = {};

        cmp.down('panel[name=calend-title]').setTitle(Ext.Date.format(start, "F / Y"));

        Ext.Array.each(cmp.query('container[name=marker]'), function(mark, mIdx) {
            mark.destroy();
        });

        days = Ext.Date.subtract(firstDate, Ext.Date.DAY, firstDay+1);
        Ext.select('.calend-today').removeCls('calend-today');
        Ext.select('.calend-date-selected').removeCls('calend-date-selected');

        for (x = 0; x < body.length; x++) {
            days = Ext.Date.add(days, Ext.Date.DAY, 1);

            if (parseInt(Ext.Date.format(days, 'Ymd'), 10) === parseInt(Ext.Date.format(today, 'Ymd'), 10)) {
                body[x].getEl().addCls('calend-today');
            }

            if (!Ext.isEmpty(cmp.selected)) {
                if (parseInt(Ext.Date.format(days, 'Ymd'), 10) === parseInt(Ext.Date.format(cmp.selected, 'Ymd'), 10)) {
                    body[x].getEl().addCls('calend-date-selected');
                    me.getMainRef().week = body[x].up().name;
                }
            }

            span = "<span>";
            if (days.getMonth()+1 !== start.getMonth()+1) {
                span = "<span class='calend-outMonthDays'>";
            }

            item = body[x].down("component[name=numberDay]");
            if (!Ext.isEmpty(item)) {
                item.destroy();
            }
            item = body[x].add({
                xtype:"component",
                name:"numberDay"
            });
            item.getEl().setHtml(span + Ext.Date.format(days, "d") + "</span>");
            body[x].date = days;
        }
    },

    buildMarkers: function(records) {
        var me = this,
            recs = records,
            main = me.getMainRef(),
            maxWidth = main.getWidth() - 110,
            body = {},
            firstMark = true,
            firstMarkEl = {},
            cls = 'calend-marker-blue';

        main.records = records;

        Ext.Array.each(main.body.select('.calend-marker-orange').elements, function(el, idx) { el.remove(); });
        Ext.Array.each(main.body.select('.calend-marker-blue').elements, function(el, idx) { el.remove(); });
        Ext.Array.each(main.body.select('.calend-marker-count').elements, function(el, idx) { el.remove(); });

        Ext.Array.each(recs, function(record, idx) {

            var rec = record,
                data = rec.data,
                dateBegin = new Date(data.data_ini_age.replace('T', ' ')),
                dateEnd = new Date(data.data_fim_age.replace('T', ' ')),

                hourBegin = 0,
                minuteBegin = 0,

                hourEnd = 0,
                minuteEnd = 0,

                idReserva = data.id_reserva_age,
                fornecedor_cnpj = data.cnpj_fornecedor_saf,
                fornecedor_razao_social = data.razao_social_fornecedor_saf,
                markerText = '';

            if (Ext.isIE) {
                dateBegin = new Date(data.data_ini_age);
                dateEnd = new Date(data.data_fim_age);
            } else if (Ext.isGecko) {
                dateBegin = new Date(data.data_ini_age + 'Z');
                dateEnd = new Date(data.data_fim_age + 'Z');
            }

            hourBegin = parseInt(Ext.Date.format(dateBegin, 'H'), 10);
            minuteBegin = parseInt(Ext.Date.format(dateBegin, 'i'), 10);

            hourEnd = parseInt(Ext.Date.format(dateEnd, 'H'), 10);
            minuteEnd = parseInt(Ext.Date.format(dateEnd, 'i'), 10);

            if (data.flg_reserva_age.toLocaleLowerCase() === 's') {
                cls = 'calend-marker-orange';
            } else {
                cls = 'calend-marker-blue';
            }

            // --------------------------------------------------------------------------------------------------
            // --------------------------------------------------------------------------------------------------
            // month --------------------------------------------------------------------------------------------
            // --------------------------------------------------------------------------------------------------
            // --------------------------------------------------------------------------------------------------
            if (main.action === 'm') {

                body = main.query('container[day=true]');

                Ext.Array.each(body, function(container, cId) {

                    if (parseInt(Ext.Date.format(container.date, 'Ymd'), 10) === parseInt(
                        Ext.Date.format(new Date(
                            parseInt(data.data_ini_age.substr(0, 4)),
                            parseInt(data.data_ini_age.substr(5, 2))-1,
                            parseInt(data.data_ini_age.substr(8, 2))), 'Ymd'),10)
                       ) {
                        var marker = container.add({
                            xtype:'container',
                            name:'marker',
                            appointmentsId: data.id_reserva_age,
                            listeners: {
                                el: {
                                    mouseup: function () {
                                        me.onMarkerMouseUp(rec, marker, arguments[0], arguments[1]);
                                    }
                                }
                            },
                            record: rec
                        });

                        if (minuteBegin > 0) {
                            markerText = Ext.Date.format(dateBegin, 'H:i ');
                        } else {
                            markerText = Ext.Date.format(dateBegin, 'H ');
                        }
                        markerText = '<b>' + markerText + '</b>' + fornecedor_cnpj;
                        marker.getEl().setHtml('<span class="calend-marker" date="' + dateBegin + '" appointmentsId= ' + data.id_reserva_age + '>' + markerText + '</span>');
                        return false;
                    } else {
                        count = 0;
                    }
                });


                // --------------------------------------------------------------------------------------------------
                // --------------------------------------------------------------------------------------------------
                // week ---------------------------------------------------------------------------------------------
                // --------------------------------------------------------------------------------------------------
                // --------------------------------------------------------------------------------------------------
            } else if (main.action === 'w') {

                body = main.body.select('.calend-body-hour').elements;

                Ext.Array.each(body, function(el, cId) {
                    var markDate = parseInt(Ext.Date.format(dateBegin, 'Ymd')),
                        markHour = parseInt(Ext.Date.format(dateBegin, 'H')),
                        markMinute = parseInt(Ext.Date.format(dateBegin, 'i')),

                        elDate = parseInt(Ext.Date.format(new Date(el.attributes.date.value), 'Ymd')),
                        elHour = parseInt(el.attributes.hour.value),
                        elMinute = parseInt(el.attributes.minute.value),

                        height = Ext.Date.diff(dateBegin, dateEnd, Ext.Date.MINUTE) - 5,

                        style = 'height: ' + height +'px; ',
                        marker = '',
                        markerWidth = 0;

                    maxWidth = el.offsetWidth - 16;

                    style += 'width: ' + maxWidth + 'px; ';

                    if ((markDate === elDate) && (hourBegin === elHour)) {

                        if (elMinute === 0) {
                            if (minuteBegin >= 0 && minuteBegin < 30) {
                                style += 'top: ' + (el.offsetTop + 2 + minuteBegin) + 'px; ';
                                marker = new Ext.Component({
                                    renderTo: el,
                                    style: style,
                                    cls: cls,
                                    html: '<span class="calend-marker-text" date="' + dateBegin + '" appointmentsId= ' + data.id_reserva_age + '>&nbsp;' + fornecedor_cnpj + '</span>',
                                    appointmentsId: data.id_reserva_age,
                                    listeners: {
                                        el: {
                                            mouseup: function () {
                                                me.onMarkerMouseUp(rec, marker, arguments[0], arguments[1]);
                                            }
                                        }
                                    }
                                });


                                if (firstMark) {
                                    firstMark = false;
                                    firstMarkEl = el;
                                }
                            }
                        } else {
                            if (minuteBegin >= 30 && minuteBegin < 59) {
                                style += 'top: ' + (el.offsetTop + 2 + (minuteBegin - 30)) + 'px; ';
                                marker = new Ext.Component({
                                    renderTo: el,
                                    style: style,
                                    cls: cls,
                                    html: '<span class="calend-marker-text" date="' + dateBegin + '" appointmentsId= ' + data.id_reserva_age + '>&nbsp;' + fornecedor_cnpj + '</span>',
                                    appointmentsId: data.id_reserva_age,
                                    listeners: {
                                        el: {
                                            mouseup: function () {
                                                me.onMarkerMouseUp(rec, marker, arguments[0], arguments[1]);
                                            }
                                        }
                                    }
                                });
                                if (firstMark) {
                                    firstMark = false;
                                    firstMarkEl = el;
                                }
                            }
                        }

                        Ext.Array.each(body, function(div, divIdx) {
                            var len = div.children.length;
                            //if (len > 1) {
                            Ext.Array.each(div.children, function(divEl, divElIdx) {
                                divEl.style.width = ((maxWidth - (2 * len)) / len) + 'px';
                            });
                            //}
                        });
                    }

                });


                // --------------------------------------------------------------------------------------------------
                // --------------------------------------------------------------------------------------------------
                // day ---------------------------------------------------------------------------------------------
                // --------------------------------------------------------------------------------------------------
                // --------------------------------------------------------------------------------------------------
            } else if (main.action === 'd') {

                body = main.body.select('.calend-body-hour').elements;

                Ext.Array.each(body, function(el, cId) {
                    var markHour = parseInt(Ext.Date.format(dateBegin, 'H')),
                        markMinute = parseInt(Ext.Date.format(dateBegin, 'i')),
                        elHour = parseInt(el.attributes.hour.value),
                        elMinute = parseInt(el.attributes.minute.value),

                        height = Ext.Date.diff(dateBegin, dateEnd, Ext.Date.MINUTE) - 5,

                        style = 'height: ' + height +'px; ',
                        marker = '';

                    maxWidth = el.offsetWidth - 16;
                    style += 'width: ' + maxWidth + 'px; ';

                    if (hourBegin === elHour) {

                        if (elMinute === 0) {
                            if (minuteBegin >= 0 && minuteBegin < 30) {
                                style += 'top: ' + (el.offsetTop + 2 + minuteBegin) + 'px; ';
                                marker = new Ext.Component({
                                    renderTo: el,
                                    style: style,
                                    cls: cls,
                                    html: '<span class="calend-marker-text" appointmentsId= ' + data.id_reserva_age + '>&nbsp;' + fornecedor_cnpj + ': ' + fornecedor_razao_social + '</span>',
                                    appointmentsId: data.id_reserva_age,
                                    listeners: {
                                        el: {
                                            mouseup: function () {
                                                me.onMarkerMouseUp(rec, marker, arguments[0], arguments[1]);
                                            }
                                        }
                                    }
                                });

                                if (firstMark) {
                                    firstMark = false;
                                    firstMarkEl = el;
                                }
                            }
                        } else {
                            if (minuteBegin >= 30 && minuteBegin < 59) {
                                style += 'top: ' + (el.offsetTop + 2 + (minuteBegin - 30)) + 'px; ';
                                marker = new Ext.Component({
                                    renderTo: el,
                                    style: style,
                                    cls: cls,
                                    html: '<span class="calend-marker-text" appointmentsId= ' + data.id_reserva_age + '>&nbsp;' + fornecedor_cnpj + ': ' + fornecedor_razao_social + '</span>',
                                    appointmentsId: data.id_reserva_age,
                                    listeners: {
                                        el: {
                                            mouseup: function () {
                                                me.onMarkerMouseUp(rec, marker, arguments[0], arguments[1]);
                                            }
                                        }
                                    }
                                });


                                if (firstMark) {
                                    firstMark = false;
                                    firstMarkEl = el;
                                }
                            }
                        }

                        Ext.Array.each(body, function(div, divIdx) {
                            var len = div.children.length;

                            Ext.Array.each(div.children, function(divEl, divElIdx) {
                                divEl.style.width = ((maxWidth - (2 * len)) / len) + 'px';

                            });
                        });
                    }

                });
            }
        });





        if (main.action === 'm') {

            body = main.query('container[day=true]');

            Ext.Array.each(body, function(container, idx) {
                var buildWindow = false,
                    windowItems = [],
                    winBody = {};

                if (container.items.length > 1)  {
                    if (container.items.length > 3) {
                        buildWindow = true;
                    }
                    Ext.Array.each(container.items.items, function(item, itemId) {
                        if (item.name === 'marker') {
                            //console.log(item.name, item.getEl().dom.children[0].innerText);
                            //if (buildWindow && itemId > 1) {
                                windowItems.push(item);
                            //}
                        }
                    });
                    if (buildWindow && windowItems.length > 0) {
                        winBody = Ext.create('Ext.container.Container', {
                            layout: 'auto'
                        });

                        Ext.Array.each(windowItems, function(item, itemId) {

                            var markerItems = winBody.add({
                                xtype: 'container',
                                name: 'marker',
                                appointmentsId: item.record.data.id_reserva_age,
                                listeners: {
                                    el: {
                                        mouseup: function () {
                                            me.onMarkerMouseUp(item.record, marker, arguments[0], arguments[1]);
                                        }
                                    }
                                }
                            });

                            markerItems.setHtml('<span class="calend-marker" date="' + item.date + '" appointmentsId= ' + item.appointmentsId + '><b>' +
                                                item.getEl().dom.children[0].childNodes[0].innerHTML + '</b>' +
                                                item.getEl().dom.children[0].childNodes[1].data +
                                                '</span>'
                            );

                            if (itemId > 0) item.destroy();

                        });
                        var marker = container.add({
                            xtype:'container',
                            name:'marker-count',
                            listeners: {
                                el: {
                                    click: function () {
                                        me.onCountMarkerClick(winBody, container, arguments[0], arguments[1]);
                                    }
                                }
                            }
                        });
                        marker.getEl().setHtml('<span class="calend-marker-count"> +' + parseInt(windowItems.length, 10) + '</span>');
                    }
                }
            });






        } else if (main.action === 'd' || main.action === 'w') {
            var hourPrev = 0,
                minutePrev = 0,
                lineHeight = 0;

            if (!Ext.isEmpty(firstMarkEl.parentElement)) {
                main.firstMarkEl = firstMarkEl;
                firstMarkEl.parentElement.scrollIntoView();
            }

            Ext.Array.each(body, function(div, divIdx) {
                if (Ext.isEmpty(div.children)) return false;

                var len = div.children.length,
                    width = 0,
                    pos = 0;

                Ext.Array.each(div.children, function(divEl, divElIdx) {
                    if (len > 1) {
                        width = (divEl.parentElement.offsetWidth - 18 - (5 * (len - 1))) / len;
                        divEl.style.width = width + 'px';
                        divEl.style.left = (div.getBoundingClientRect().left - main.getEl().dom.getBoundingClientRect().left + 15) + ((width + 2) * pos)  + 'px';
                        pos++;

                    } else {
                        if (main.action === 'w') {
                            width = (divEl.parentElement.offsetWidth - 18 - (5 * (len - 1))) / len;
                            divEl.style.width = width + 'px';
                            divEl.style.left = (div.getBoundingClientRect().left - main.getEl().dom.getBoundingClientRect().left + 15) + 'px';
                        }
                        pos = 0;
                    }

                    hourPrev = div.attributes.hour.value;
                    minutePrev = div.attributes.minute.value;

                });
            });
        }
    },

    onMarkerMouseUp: function(record, marker, event, self) {
        var me = this,
            rec = record,
            mark = marker,
            ev = event,
            calend = me.getMainRef();


        if (ev.button === 2) return false;

        var tpl = [
            '<tpl for="data">',
            '<table>',
                '<tr>',
                    '<td>Período:</td>',
                    '<td>{hora_ini_age} às {hora_fim_age}</td>',
                '</tr>',

                '<tr>',
                    '<td>Endereço:</td>',
                    '<td>{endereco_age}</td>',
                '</tr>',

                '<tr>',
                    '<td>Fornecedor:</td>',
                    '<td>{cnpj_fornecedor_saf} - {razao_social_fornecedor_saf}</td>',
                '</tr>',

                '<tr>',
                    '<td>Transportadora:</td>',
                    '<td>{cnpj_transportadora_sat} - {razao_soc_transportadora_sat}</td>',
                '</tr>',

                '<tr>',
                    '<td>Caminhão:</td>',
                    '<td>{renavam_caminhao_sac} - {placa_caminhao_sac}</td>',
                '</tr>',

                '<tr>',
                    '<td>Motorista:</td>',
                    '<td>{cpf_motorista_sam} - {nom_motorista_sam}</td>',
                '</tr>',


            '</table></tpl>'
            ];

        var xtpl =  new Ext.XTemplate(tpl);

        var data = rec.data;
        data.hora_ini_age = Ext.Date.format(new Date(data.data_ini_age.replace('T', ' ')), 'H:i');
        data.hora_fim_age = Ext.Date.format(new Date(data.data_fim_age.replace('T', ' ')), 'H:i');

        if (Ext.isIE) {
            data.hora_ini_age = Ext.Date.format(new Date(data.data_ini_age), 'H:i');
            data.hora_fim_age = Ext.Date.format(new Date(data.data_fim_age), 'H:i');
        } else if (Ext.isGecko) {
            data.hora_ini_age = Ext.Date.format(new Date(data.data_ini_age + 'Z'), 'H:i');
            data.hora_fim_age = Ext.Date.format(new Date(data.data_fim_age + 'Z'), 'H:i');
        }

        var templateConfig = {
            data: data,
        };

        var tip = Ext.create('Ext.tip.ToolTip', {
            name: 'marker-tip',
            target: marker.getEl(),
            trackMouse: true,
            renderTo: Ext.getBody(),
            listeners: {
                beforeshow: function updateTipBody(tip) {
                    tip.update(xtpl.apply(templateConfig));
                }
            }
        });

        if (ev.pageX > calend.getWidth()) ev.pageX -= 300;
        if (ev.pageY > calend.getHeight()) ev.pageY -= 100;

        tip.showAt(ev.pageX, ev.pageY);
    },

    onMarketMouseDown: function() {
        var me = this;

    },

    onCountMarkerClick: function(wBody, parent, event, self) {
        var me = this,
            winBody = wBody,
            cmp = parent,
            ev = event,
            calend = me.getMainRef();

        win = undefined;

        Ext.Array.each(Ext.ComponentQuery.query('window'), function(window, idx) {
            var w = window;
            if (w.name === 'markerItems') {
                if (w.id === 'w' + Ext.Date.format(cmp.date, 'Ymd')) {
                    win = w;
                } else {
                    if (w.isVisible()) {
                        w.close();
                    }
                }
            }
        });


        //win = Ext.ComponentQuery.query('window[id=w' + Ext.Date.format(cmp.date, 'Ymd') + ']')[0];

        if (Ext.isEmpty(win)) {
            win = Ext.create('Ext.window.Window', {
                constrain: true,
                autoScroll: true,
                ui: 'defwin',
                layout: 'anchor',
                height: 200,
                width: 200,
                items: winBody,
                title: Ext.Date.format(cmp.date, 'd (D), F'),
                bodyBorder: true,
                bodyPadding: 10,
                closeAction: 'hide',
                id: 'w' + Ext.Date.format(cmp.date, 'Ymd'),
                name: 'markerItems'
            });
        }

        if (ev.pageX > calend.getWidth()) ev.pageX -= 300;
        if (ev.pageY > calend.getHeight()) ev.pageY -= 100;

        win.showAt(ev.pageX, ev.pageY);

        return false;
    },

    mountTimeColumn: function(date, days) {
        var me = this,
            calendarTitle = me.getMainRef().down('container[name=calend-title]'),
            cmp = me.getMainRef().down('panel[name=dayView]'),
            today = new Date(),
            selDate = date,  // first day (selected week)
            dayCount = days,
            i = 0,
            days = [],
            dt = Ext.Date.clone(selDate),
            times = [],
            times2 = [],
            start = 0,
            end = 24,
            mins = 60,
            dayHeight = 60 * (end - start),
            fmt = 'H', //G:i',
            templateConfig,
            xtpl =  {},
            tpl = ['<table class="ext-cal-bg-tbl" cellspacing="0" cellpadding="0" style="height:{dayHeight}px;">',
                       '<tbody>',
                           '<tr>',

                               '<td class="calend-time-column">',
                                   '<tpl for="times">',
                                       '<div class="calend-time-row" style="height:{parent.hourHeight}px;">',
                                           '<div class="" style="height:{parent.hourHeight}px;padding:5px 0 0 5px;">{.}</div>',
                                       '</div>',
                                    '</tpl>',
                               '</td>',

                               '<tpl for="days">',
                                   '<td class="calend-day-body" date="{date}">',

                                       '<tpl for="timesdate">',

                                           '<div class="calend-body-row" style="height:30px;">',
                                               '<div class="calend-body-hour" hour="{.}" minute=00 date="{parent.date}" style="height:30px;padding:5px 0 0 5px;">&nbsp;</div>',
                                           '</div>',

                                           '<div class="calend-body-row-30" style="height:30px;">',
                                               '<div class="calend-body-hour" hour="{.}" minute=30 date="{parent.date}" style="height:30px;padding:5px 0 0 5px;">&nbsp;</div>',
                                           '</div>',

                                       '</tpl>',
                                   '</td>',
                               '</tpl>',
                           '</tr>',
                   '</tbody>',
                   '</table>'],
            wDay = parseInt(Ext.Date.format(today, 'w')),
            elBegin = wDay*24,
            elEnd = elBegin+24,
            elCount = 0,
            fDay = Ext.Date.clone(selDate),
            wToday = false;

        //calendarTitle.getEl().setHtml(Ext.Date.format(selDate, "F / Y"));
        calendarTitle.setTitle(Ext.Date.format(selDate, "F / Y"));


        xtpl =  new Ext.XTemplate(tpl);
        //dt = new Date(2014, 9, 5);
        dt = new Date(selDate); //new Date(1980, 0, 6);

        // use a fixed DST-safe date so times don't get skipped on DST boundaries
        //dt = Extensible.Date.add(new Date('5/26/1972'), {hours: start});
        dt = Ext.Date.add(new Date('5/26/1972'), Ext.Date.HOUR, start);

        for (var i = start; i < end; i++){
            times.push(Ext.Date.format(dt, fmt));
            times2.push(Ext.Date.format(dt, fmt));
            dt = Ext.Date.add(dt, Ext.Date.MINUTE, mins);
        }

        dt = new Date(selDate); //new Date(1980, 0, 6);
        for (var i = 0; i < dayCount; i++){
            days[i] = {date: Ext.Date.add(dt, Ext.Date.DAY, i), timesdate: times};
        }

        templateConfig = {
            days: days,
            dayCount: days.length,
            times: times,
            hourHeight: 60,
            hourSeparatorCls: true ? '' : 'no-sep', // the class suppresses the default separator
            dayHeight: dayHeight,
            hourSeparatorHeight: (60 / 2)
        };

        cmp.up().down('container[name=calendar]').setVisible(false);
        cmp.setVisible(true);
        cmp.body.update(xtpl.apply(templateConfig));

        /*
        if (dayCount === 1) {
            if (Ext.Date.format(fDay, 'Ymd') === Ext.Date.format(today, 'Ymd'))
                wToday = true;
        } else {
            for (var i = 1; i <= 7; i++) {
                if (Ext.Date.format(fDay, 'Ymd') === Ext.Date.format(today, 'Ymd')) {
                    wToday = true;
                }
                fDay = Ext.Date.add(fDay, Ext.Date.DAY, 1);
            }
        }
        */
        Ext.Array.each(Ext.query('.calend-body-row'), function(myEl, idx) {
            var sel = Ext.Date.format(new Date(myEl.children[0].attributes.date.value), 'Ymd'),
                today = Ext.Date.format(new Date(), 'Ymd');

            if (sel === today) {
                myEl.classList.add('calend-today');
            } else  {
                myEl.classList.remove('calend-today');
            }
        });

        Ext.Array.each(Ext.query('.calend-body-row-30'), function(myEl, idx) {
            var sel = Ext.Date.format(new Date(myEl.children[0].attributes.date.value), 'Ymd'),
                today = Ext.Date.format(new Date(), 'Ymd');

            if (sel === today) {
                myEl.classList.add('calend-today');
            } else  {
                myEl.classList.remove('calend-today');
            }
        });






        /*



            tpl = new Ext.XTemplate('<table class="ext-cal-bg-tbl" cellspacing="0" cellpadding="0" style="height:{dayHeight}px;">',
                '<tbody>',
                    '<tr>',
                        '<td class="calend-time-column">',
                            '<tpl for="times">',
                                '<div class="calend-time-row" style="height:{parent.hourHeight}px;">',
                                    '<div class=""  style="height:{parent.hourHeight-1}px;padding:5px 0 0 5px;">{.}</div>',
                                '</div>',
                            '</tpl>',
                        '</td>',
                        '<tpl for="days">',
                            '<td class="calend-day-body">',
                                '<div class="calend-day-body">',
                                    '<div id="{[this.id]}-day-col-{.:date("Ymd")}" class="ext-cal-day-col-gutter" style="height:{parent.dayHeight}px;"><span>xpto</div>',
                                '</div>',
                            '</td>',
                        '</tpl>',
                    '</tr>',
                '</tbody>',
            '</table>');
        */
    },

    mountMonthView: function(date, days) {
        var me = this,
            calendarTitle = me.getMainRef().down('container[name=calend-title]'),
            cmp = me.getMainRef().down('panel[name=dayView]'),
            today = new Date(),
            selDate = date,  // first day (selected week)
            dayCount = days,
            i = 0,
            days = [],
            dt = Ext.Date.clone(selDate),
            times = [],
            times2 = [],
            start = 0,
            end = 24,
            mins = 60,
            dayHeight = 60 * (end - start),
            fmt = 'H', //G:i',
            templateConfig,
            xtpl =  {},
            tpl = ['<table class="ext-cal-bg-tbl" cellspacing="0" cellpadding="0" style="height:{dayHeight}px;">',
                       '<tbody>',
                           '<tr>',

                               '<td class="calend-time-column">',
                                   '<tpl for="times">',
                                       '<div class="calend-time-row" style="height:{parent.hourHeight}px;">',
                                           '<div class="" style="height:{parent.hourHeight}px;padding:5px 0 0 5px;">{.}</div>',
                                       '</div>',
                                    '</tpl>',
                               '</td>',

                               '<tpl for="days">',
                                   '<td class="calend-day-body" date="{date}">',

                                       '<tpl for="timesdate">',

                                           '<div class="calend-body-row" style="height:30px;">',
                                               '<div class="calend-body-hour" hour="{.}" minute=00 date="{parent.date}" style="height:30px;padding:5px 0 0 5px;">&nbsp;</div>',
                                           '</div>',

                                           '<div class="calend-body-row-30" style="height:30px;">',
                                               '<div class="calend-body-hour" hour="{.}" minute=30 date="{parent.date}" style="height:30px;padding:5px 0 0 5px;">&nbsp;</div>',
                                           '</div>',

                                       '</tpl>',
                                   '</td>',
                               '</tpl>',
                           '</tr>',
                   '</tbody>',
                   '</table>'],
            wDay = parseInt(Ext.Date.format(today, 'w')),
            elBegin = wDay*24,
            elEnd = elBegin+24,
            elCount = 0,
            fDay = Ext.Date.clone(selDate),
            wToday = false;

        //calendarTitle.getEl().setHtml(Ext.Date.format(selDate, "F / Y"));
        calendarTitle.setTitle(Ext.Date.format(selDate, "F / Y"));


        xtpl =  new Ext.XTemplate(tpl);
        //dt = new Date(2014, 9, 5);
        dt = new Date(selDate); //new Date(1980, 0, 6);

        // use a fixed DST-safe date so times don't get skipped on DST boundaries
        //dt = Extensible.Date.add(new Date('5/26/1972'), {hours: start});
        dt = Ext.Date.add(new Date('5/26/1972'), Ext.Date.HOUR, start);

        for (var i = start; i < end; i++){
            times.push(Ext.Date.format(dt, fmt));
            times2.push(Ext.Date.format(dt, fmt));
            dt = Ext.Date.add(dt, Ext.Date.MINUTE, mins);
        }

        dt = new Date(selDate); //new Date(1980, 0, 6);
        for (var i = 0; i < dayCount; i++){
            days[i] = {date: Ext.Date.add(dt, Ext.Date.DAY, i), timesdate: times};
        }

        templateConfig = {
            days: days,
            dayCount: days.length,
            times: times,
            hourHeight: 60,
            hourSeparatorCls: true ? '' : 'no-sep', // the class suppresses the default separator
            dayHeight: dayHeight,
            hourSeparatorHeight: (60 / 2)
        };

        cmp.up().down('container[name=calendar]').setVisible(false);
        cmp.setVisible(true);
        cmp.body.update(xtpl.apply(templateConfig));

        /*
        if (dayCount === 1) {
            if (Ext.Date.format(fDay, 'Ymd') === Ext.Date.format(today, 'Ymd'))
                wToday = true;
        } else {
            for (var i = 1; i <= 7; i++) {
                if (Ext.Date.format(fDay, 'Ymd') === Ext.Date.format(today, 'Ymd')) {
                    wToday = true;
                }
                fDay = Ext.Date.add(fDay, Ext.Date.DAY, 1);
            }
        }
        */
        Ext.Array.each(Ext.query('.calend-body-row'), function(myEl, idx) {
            var sel = Ext.Date.format(new Date(myEl.children[0].attributes.date.value), 'Ymd'),
                today = Ext.Date.format(new Date(), 'Ymd');

            if (sel === today) {
                myEl.classList.add('calend-today');
            } else  {
                myEl.classList.remove('calend-today');
            }
        });

        Ext.Array.each(Ext.query('.calend-body-row-30'), function(myEl, idx) {
            var sel = Ext.Date.format(new Date(myEl.children[0].attributes.date.value), 'Ymd'),
                today = Ext.Date.format(new Date(), 'Ymd');

            if (sel === today) {
                myEl.classList.add('calend-today');
            } else  {
                myEl.classList.remove('calend-today');
            }
        });






        /*



            tpl = new Ext.XTemplate('<table class="ext-cal-bg-tbl" cellspacing="0" cellpadding="0" style="height:{dayHeight}px;">',
                '<tbody>',
                    '<tr>',
                        '<td class="calend-time-column">',
                            '<tpl for="times">',
                                '<div class="calend-time-row" style="height:{parent.hourHeight}px;">',
                                    '<div class=""  style="height:{parent.hourHeight-1}px;padding:5px 0 0 5px;">{.}</div>',
                                '</div>',
                            '</tpl>',
                        '</td>',
                        '<tpl for="days">',
                            '<td class="calend-day-body">',
                                '<div class="calend-day-body">',
                                    '<div id="{[this.id]}-day-col-{.:date("Ymd")}" class="ext-cal-day-col-gutter" style="height:{parent.dayHeight}px;"><span>xpto</div>',
                                '</div>',
                            '</td>',
                        '</tpl>',
                    '</tr>',
                '</tbody>',
            '</table>');
        */
    },

    onRightClick: function(event, element) {
        var me = this,
            e = event,
            el = element,
            contextMenu = {},
            position = e.getXY(),
            id = 0,
            record = {},

            ctrlGlobal = me.getController('Global'),
            calend = me.getMainRef(),

            agCtrl = me.getController('Diary'),
            main = agCtrl.getMainRef(),
            store = agCtrl.getStore('Schedules'),

            callback = function() {
            },
            msg = '';

        if (calend.action === 'm') return false;

        e.stopEvent();

        //if (el.classList[0] === 'x-tip') {
        //if (el.className === 'calend-marker') {
        if (el.className.search('calend-marker') > -1) {

            if (el.tagName === 'DIV') {
                el = el.children[0];
            }

            id = parseInt(el.attributes.appointmentsid.value, 10);

            if (calend.action === 'd') {
                msg = '<p><b>' +
                    el.parentElement.parentElement.attributes.hour.value +
                    ':' +
                    el.parentElement.parentElement.attributes.minute.value +
                    '</b> ' +
                    el.childNodes[0].data +
                    '</p>';
            } else if (calend.action === 'm') {
                msg = '<p><b>' +
                    el.attributes.date.value.substring(4,16) +
                    '</b> ' +
                    el.innerHTML +
                    '</p>';
            } else if (calend.action === 'w') {
                msg = '<p><b>' +
                    el.attributes.date.value.substring(4,21) +
                    '</b> ' +
                    el.innerHTML +
                    '</p>';
            }

            contextMenu = new Ext.menu.Menu({
                items:
                [
                    {
                        text: 'Alterar', handler: function() {
                            var record = me.getController('Diary').getStore('Schedules').findRecord('id_reserva_age', id),
                                data = record.data,
                                win = me.getView('WinAux').create(),
                                form = {};

                            if (Ext.isEmpty(data.hora_ini_age)) {
                                data.hora_ini_age = data.data_ini_age.substr(11,5);
                            }
                            data.data_ini_age = data.data_ini_age.substr(0,10);

                            if (Ext.isEmpty(data.hora_fim_age)) {
                                data.hora_fim_age = data.data_fim_age.substr(11,5);
                            }
                            data.data_fim_age = data.data_fim_age.substr(0,10);

                            form = win.down('form[name=agendwinform]');
                            form.getForm().loadRecord(record);
                            form.down('button[action=save]').recordId = data.id_reserva_age;

                            form = win.down('agendamentosfornecedorform');
                            form.down('combo[name=search]').setValue(data.cnpj_fornecedor_saf + ': ' + data.nom_fantasia_fornecedor_saf);
                            form.down('form').getForm().loadRecord(record);

                            form = win.down('agendamentostransportadoraform');
                            form.down('combo[name=search]').setValue(data.cnpj_transportadora_sat + ': ' + data.nom_fant_transportadora_sat);
                            form.down('form').getForm().loadRecord(record);

                            form = win.down('agendamentoscaminhaoform');
                            form.down('combo[name=search]').setValue(data.fabricante_caminhao_sac + ': ' + data.placa_caminhao_sac);
                            form.down('form').getForm().loadRecord(record);

                            form = win.down('agendamentosmotoristaform');
                            form.down('combo[name=search]').setValue(data.cpf_motorista_sam + ': ' + data.nom_motorista_sam);
                            form.down('form').getForm().loadRecord(record);

                            form = win.down('agendamentosresumoform');
                            form.down('form[name=FornecedorForm]').getForm().loadRecord(record);
                            form.down('form[name=TransportadoraForm]').getForm().loadRecord(record);
                            form.down('form[name=CaminhaoForm]').getForm().loadRecord(record);
                            form.down('form[name=MotoristaForm]').getForm().loadRecord(record);

                            win.show();

                            win.maximize();

                            main.win = win;
                        }
                    },
                    {
                        text: 'Cancelar/Remover', handler: function() {

                            ctrlGlobal.deleteRecord(
                                me,
                                store,
                                calend,
                                id,
                                null,
                                null,
                                null,
                                callback,
                                'Tem certeza que deseja remover o agendamento?' + msg
                            );


                            //console.log("Cancelar " + id);
                        }
                    }
                ]
            });
            contextMenu.showAt(position);

        }


    },

    init: function(application) {
        var me = this;

        me.control({
            'container[day=true]': {
                afterrender: function(cmp) {
                    cmp.mon(cmp.el, 'click', me.onDayContainerClick, me, cmp);
                }
            },
            'container': {
                afterrender: function(cmp) {
                    cmp.mon(cmp.el, 'contextmenu', me.onRightClick, me, cmp);
                }
            }
        });

        Ext.onReady(function() {
            //me.getMainRef().body.on('click', me.onMainClick, this);
        });
    }

});
