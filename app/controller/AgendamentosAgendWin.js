/*
 * File: app/controller/AgendamentosAgendWin.js
 */

Ext.define('skyclinic.controller.AgendamentosAgendWin', {
    extend: 'Ext.app.Controller',

    stores: [
        'TimesBeginCombo',
        'TimesEndCombo'
    ],

    control: {
        "agendamentosagendwin": {
            afterrender: 'onWindowAfterRender'
        },
        "agendamentosagendwin combo[name=hora_ini_age]": {
            change: 'onHoraIniAgeComboboxChange'
        },
        "agendamentosagendwin datefield[name=data_fim_age]": {
            blur: 'onDataFinalChange'
        },
        "agendamentosagendwin textfield": {
            change: 'onTextfieldChange'
        },
        "agendamentosagendwin button[action=save]": {
            click: 'onSaveButtonClick'
        },
        "agendamentosagendwin button[action=cancel]": {
            click: 'onCancelButtonClick'
        },
        "agendamentosagendwin checkboxfield[name=flg_reserva_age]": {
            change: 'onReservaCheckboxChange'
        }
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this,
            cmp = component,
            beginStore = me.getStore('TimesBeginCombo'),
            endStore = me.getStore('TimesEndCombo'),
            data = [];

        beginStore.clearData();
        endStore.clearData();

        for (h=0;h<24;h++) {
            var interval = 15,
                intervalTimes = 60/interval;

            for (m=0;m<intervalTimes;m++) {
                var min = m * interval,
                    time = Ext.Date.format(new Date('01/01/1980 ' + h + ':' + min), 'H:i');
                data.push({'time': time});
            }
        }

        beginStore.loadData(data);
        endStore.loadData(data);

        cmp.down('combo[name=hora_ini_age]').setStore(beginStore);
        cmp.down('combo[name=hora_fim_age]').setStore(endStore);


    },

    onHoraIniAgeComboboxChange: function(field, newValue, oldValue, eOpts) {
        var me = this,
            cmp = field,

            dateBegin = cmp.up().down('datefield[name=' + cmp.startDateField + ']'),
            dateEnd = cmp.up().down('datefield[name=' + cmp.endDateField + ']'),

            end = cmp.up().down('combo[name=' + cmp.endTimeField + ']'),
            value = newValue.split(':'),
            H = parseInt(value[0]),
            i = parseInt(value[1]),
            endStore = end.getStore(),
            data = [],
            endTime = 0,
            lastHour = 24,
            endDateTime = Ext.Date.add(new Date(Ext.Date.format(dateBegin.getValue(), 'm/d/Y ') + H + ':' + i), Ext.Date.MINUTE, 30);

        if (Ext.isEmpty(dateEnd)) return false;

        dateEnd.setValue(endDateTime);

        if (parseInt(Ext.Date.format(dateEnd.getValue(), 'Ymd'), 10) > parseInt(Ext.Date.format(dateBegin.getValue(), 'Ymd'), 10)) {
            H = 0;
        }

        for (h = H; h < lastHour; h++) {
            var interval = 15,
                intervalTimes = 60/interval;

            for (m = 0; m < intervalTimes; m++) {
                var min = m * interval,
                    time = Ext.Date.format(new Date('01/01/1980 ' + h + ':' + min), 'H:i');

                if (Ext.Date.format(dateBegin.getValue(), 'Ymd') === Ext.Date.format(dateEnd.getValue(), 'Ymd')) {
                    if (min >= i) {
                        data.push({'time': time});
                    }
                } else {
                    data.push({'time': time});
                }
            }
        }

        endStore.clearData();
        endStore.loadData(data);

        end.setValue(Ext.Date.format(endDateTime, 'H:i'));





        dataX = [
            {
                id:1,
                name: 'Teste 1',
                master: null
            },
            {
                id:2,
                name: 'Teste 2',
                master: null
            },
            {
                id:3,
                name: 'Teste 1.3',
                master: 1
            },
            {
                id:5,
                name: 'Teste 2.5',
                master: 2
            },
            {
                id:4,
                name: 'Teste 4.3',
                master: 3
            }
        ];









    },

    onDataFinalChange: function(component, event, eOpts) {
        var me = this,
            cmp = component,
            start = cmp.up().down('combo[name=' + cmp.startTimeField + ']'),
            dateBegin = cmp.up().down('datefield[name=' + cmp.startDateField + ']'),
            dateEnd = cmp,

            end = cmp.up().down('combo[name=' + cmp.endTimeField + ']'),

            value = start.getValue().split(':'),
            H = parseInt(value[0]),
            i = parseInt(value[1]),

            endStore = end.getStore(),
            data = [],
            endTime = 0,
            lastHour = 24,
            endDateTime = Ext.Date.add(new Date(Ext.Date.format(cmp.getValue(), 'm/d/Y ') + H + ':' + i), Ext.Date.MINUTE, 30);

        if (parseInt(Ext.Date.format(dateEnd.getValue(), 'Ymd'), 10) > parseInt(Ext.Date.format(dateBegin.getValue(), 'Ymd'), 10)) {
            H = 0;
        }

        for (h = H; h < lastHour; h++) {
            var interval = 15,
                intervalTimes = 60/interval;

            for (m = 0; m < intervalTimes; m++) {
                var min = m * interval,
                    time = Ext.Date.format(new Date('01/01/1980 ' + h + ':' + min), 'H:i');

                if (Ext.Date.format(dateBegin.getValue(), 'Ymd') === Ext.Date.format(dateEnd.getValue(), 'Ymd')) {
                    if (min >= i) {
                        data.push({'time': time});
                    }
                } else {
                    data.push({'time': time});
                }
            }
        }

        endStore.clearData();
        endStore.loadData(data);

        end.setValue(Ext.Date.format(endDateTime, 'H:i'));

    },

    onTextfieldChange: function(field, newValue, oldValue, eOpts) {
        var me = this,
            cmp = field,
            value = newValue;

        me.getController('Agendamentos').isValid();
    },

    onSaveButtonClick: function(button, e, eOpts) {
        var me = this,
            btn = button,
            id = btn.recordId,

            win = btn.up('window'),
            winForm = win.down('form[name=agendwinform]'),
            resume = win.down('agendamentosresumoform'),
            ctrlGlobal = me.getController('Global'),
            fieldsOutForm = [],

            endereco_age = winForm.down('textfield[name=endereco_age]').getValue(),

            data_ini_age = Ext.Date.format(winForm.down('datefield[name=data_ini_age]').getValue(), 'd/m/Y ') + winForm.down('combo[name=hora_ini_age]').getValue(),
            num_nota_fiscal_age = winForm.down('textfield[name=num_nota_fiscal_age]').getValue(),
            flg_reserva_age = winForm.down('checkboxfield[name=flg_reserva_age]').getValue()?'S':'N',

            cnpj_fornecedor_saf = resume.down('textfield[name=cnpj_fornecedor_saf]').getValue(),
            cnpj_transportadora_sat = resume.down('textfield[name=cnpj_transportadora_sat]').getValue(),
            renavam_caminhao_sac = resume.down('textfield[name=renavam_caminhao_sac]').getValue(),
            cpf_motorista_sam = resume.down('textfield[name=cpf_motorista_sam]').getValue(),

            serie_nota_fiscal_age = winForm.down('textfield[name=serie_nota_fiscal_age]').getValue(),
            data_fim_age = Ext.Date.format(winForm.down('datefield[name=data_fim_age]').getValue(), 'd/m/Y ') + winForm.down('combo[name=hora_fim_age]').getValue(),
            calendar = me.getController('Calendar').getMainRef(),

            metodo = 'POST';


        win.setLoading('Gravando marcação...');

        ctrlGlobal.message('<img src="./resources/images/loading.gif" width="16px" height="16px" /> <span>Gravando Agendamento...</span>', 'i');


        cnpj_fornecedor_saf = cnpj_fornecedor_saf.replace('.','').replace('.','').replace('/','').replace('-','');
        cnpj_transportadora_sat = cnpj_transportadora_sat.replace('.','').replace('.','').replace('/','').replace('-','');
        cpf_motorista_sam = cpf_motorista_sam.replace('.','').replace('.','').replace('.','').replace('-','');

        fieldsOutForm.push({field:'endereco_age',value:endereco_age});
        fieldsOutForm.push({field:'data_ini_age',value:data_ini_age});
        fieldsOutForm.push({field:'num_nota_fiscal_age',value:num_nota_fiscal_age});
        fieldsOutForm.push({field:'flg_reserva_age',value:flg_reserva_age});
        fieldsOutForm.push({field:'cnpj_fornecedor_saf',value:cnpj_fornecedor_saf});
        fieldsOutForm.push({field:'cnpj_transportadora_sat',value:cnpj_transportadora_sat});
        fieldsOutForm.push({field:'renavam_caminhao_sac',value:renavam_caminhao_sac});
        fieldsOutForm.push({field:'cpf_motorista_sam',value:cpf_motorista_sam});
        fieldsOutForm.push({field:'serie_nota_fiscal_age',value:serie_nota_fiscal_age});
        fieldsOutForm.push({field:'data_fim_age',value:data_fim_age});

        if (btn.recordId > 0) {
            metodo = 'PUT';
        }

        Ext.Ajax.request({
            method: metodo,
            headers: {
                accept: 'application/json'
            },
            params: {
                id: id,
                info: Ext.JSON.encode(fieldsOutForm)
            },
            scope: me,
            url: ctrlGlobal.server + '/appointments',
            callback: function(options, success, response) {
                if (success) {
                    var decoded = Ext.decode(response.responseText);

                    if (decoded.rcode === '00000') {

                        me.getController('Agendamentos').getStore('Agendamentos').load();
                        ctrlGlobal.message('<b>Agendamento</b><p>Agendamento gravado com sucesso!</p>', 's');
                        win.setLoading(false);
                        win.close();

                    } else {
                        ctrlGlobal.message('<b>Agendamento</b><p>Erro ao tentar gravar o registro!</p><p>' + decoded.rcode + '</p>', 'e');
                        win.setLoading(false);
                    }

                } else {
                    ctrlGlobal.message('<b>Agendamento</b><p>A conexão ao servidor falhou!</p>', 'e');
                    win.setLoading(false);
                }
            }
        });
    },

    onCancelButtonClick: function(button, e, eOpts) {
        var me = this,
            btn = button,
            win = btn.up('window');

        Ext.MessageBox.show({
            title: 'Cancelar',
            msg: 'Tem certeza que deseja cancelar o agendamento?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.MessageBox.QUESTION,
            fn: function(btn) {
                if (btn == 'yes') {
                    win.close();
                }
            }
        });

    },

    onReservaCheckboxChange: function(field, newValue, oldValue, eOpts) {
        var me = this,
            cmp = field,
            winForm = cmp.up('form'),
            nnf = winForm.down('textfield[name=num_nota_fiscal_age]'),
            snf = winForm.down('textfield[name=serie_nota_fiscal_age]'),
            value = newValue;

        nnf.setDisabled(value);
        nnf.allowBlank = value;
        nnf.allowOnlyWhitespace = value;

        snf.setDisabled(value);
        snf.allowBlank = value;
        snf.allowOnlyWhitespace = value;

        me.getController('Agendamentos').isValid();
    }

});
