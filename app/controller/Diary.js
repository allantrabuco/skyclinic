/*
 * File: app/controller/Diary.js
 */

Ext.define('skyclinic.controller.Diary', {
    extend: 'Ext.app.Controller',

    stores: [
        'Schedules',
        'DiaryClientsCombo',
        'DiarySettProceduresCombo'
    ],

    refs: {
        mainRef: 'diary'
    },

    isValid: function() {
        var me = this,
            main = me.getMainRef(),
            win = Ext.isEmpty(main.win)?null:main.win,
            winForm = {},
            resume = {},
            forms = {},
            validTabs = true;

        win = Ext.isEmpty(main.win)?null:main.win;

        if (Ext.isEmpty(main.win)) return false;

        if (win.items.items.length > 0) {
            winForm = Ext.isEmpty(main.win)?null:win.down('form[name=agendwinform]');
            resume = Ext.isEmpty(main.win)?null:win.down('agendamentosresumoform');
            forms = Ext.isEmpty(main.win)?null:resume.query('form');
        } else {
            return false;
        }

        Ext.Object.each(forms, function(idx, obj) {
            if (!obj.isValid()) validTabs = false;
        });

        if (validTabs) {
            if (winForm.isValid()) {
                winForm.down('button[action=save]').setDisabled(false);
            } else {
                winForm.down('button[action=save]').setDisabled(true);
            }
        }

        if (validTabs) {
            Ext.Object.each(forms, function(idx, obj) {
                obj.isValid();
            });
            resume.tab.removeCls('tab-disable');
            resume.tab.addCls('tab-enable');
            win.down('tabpanel').setActiveTab(4);
        } else {
            resume.tab.removeCls('tab-enable');
            resume.tab.addCls('tab-disable');
        }
    },

    onAgendamentosStoreBeforeLoad: function(store, operation, eOpts) {
        var me = this,
            calendar = me.getMainRef().down('calendar'),
            firstDayWeek = parseInt(Ext.Date.format(calendar.refDate, 'w'), 10),
            firstCalendarDate = Ext.Date.subtract(Ext.Date.getFirstDateOfMonth(calendar.refDate), Ext.Date.DAY, firstDayWeek+1);

        calendar.setLoading('Carregando agendamentos...');

        if (calendar.action === 'm') {
            operation._params = {data_ini_busca: Ext.Date.format(firstCalendarDate, 'd/m/Y')};
            operation._params.data_fim_busca = Ext.Date.format(Ext.Date.getLastDateOfMonth(calendar.refDate), 'd/m/Y');
        } else if (calendar.action === 'w') {
            firstDayWeek = parseInt(Ext.Date.format(calendar.selected, 'w'), 10);
            operation._params = {data_ini_busca: Ext.Date.format(Ext.Date.subtract(calendar.selected, Ext.Date.DAY, firstDayWeek), 'd/m/Y 00:00:00')};
            operation._params.data_fim_busca = Ext.Date.format(Ext.Date.add(calendar.selected, Ext.Date.DAY, 6-firstDayWeek), 'd/m/Y 23:59:59');
        } else if (calendar.action === 'd') {
            operation._params = {data_ini_busca: Ext.Date.format(calendar.selected, 'd/m/Y 00:00:00')};
            operation._params.data_fim_busca = Ext.Date.format(calendar.selected, 'd/m/Y 23:59:59');
        }
    },

    onAgendamentosStoreLoad: function(store, records, successful, eOpts) {
        var me = this,
            ctrl = me.getController('Calendar'),
            calendar = ctrl.getMainRef();

        calendar.setLoading(false);
        ctrl.buildMarkers(records);
    },

    init: function(application) {
        var me = this;
        //Ext.getStore('Agendamentos').addListener('beforeload', me.onAgendamentosStoreBeforeLoad, me);
        //Ext.getStore('Agendamentos').addListener('load', me.onAgendamentosStoreLoad, me);
    }

});
