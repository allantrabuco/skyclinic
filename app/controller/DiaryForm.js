/*
 * File: app/controller/DiaryForm.js
 */

Ext.define('skyclinic.controller.DiaryForm', {
    extend: 'Ext.app.Controller',

    control: {
        "diaryform button[action=addMoreClient]": {
            click: 'doAddClients'
        },
        "diaryform combobox[name=client]": {
            select: 'onClientsComboboxSelect'
        },
        "diaryform combobox[name=insuranceOperator]": {
            select: 'onInsuranceComboboxSelect'
        }
    },

    doAddClients: function(button, e, eOpts) {
        var me = this,
            btn = button,

            myviewport = me.getController('BodyHeader').getMainRef().up('myviewport'),

            height = myviewport.getHeight() - 50,
            width = myviewport.getWidth() - 100,

            win = me.application.getView('WinAux').create({bodyPadding:'0 0 0 10', name:'ClientsWin'}),
            grid = {},

            ctrl = me.getController('Clients'),
            newStore = me.application.getStore('ClientsWin');

        Ext.Array.each(me.getController('Clients').stores, function(str, idx) {
            if (str !== 'Clients') {
                var store = ctrl.getStore(str);
                if (store.master && store.count() === 0) store.load();
            }
        });

        win.add(me.application.getView('Clients').create({bodyPadding:'0 10 0 10'}));
        win.setTitle('Pacientes');
        win.down('clients').setTitle();


        grid = win.down('clientsgrid');

        grid.reconfigure(newStore);
        grid.getStore().load();


        Ext.each(grid.columns, function(col, idx) {
            if (!Ext.isEmpty(col.action)) {
                if (col.action === 'select') {
                    col.setVisible(true);
                }
            }
        });

        win.setHeight(height);
        win.setWidth(width);
        win.show();

        //grid.columns[5].setVisible(true);

        win.doLayout();
        grid.win = win;

        win.form = btn.up('diaryform');
        win.field = 'client';
        win.insuranceField = 'insuranceOperator';
    },

    onClientsComboboxSelect: function(combo, record, eOpts) {
        var me = this,
            cmp = combo,
            rec = records[0],
            insuranceField = cmp.up('diaryform').down('combobox[name=insuranceOperator]'),
            insuranceNumber = cmp.up('diaryform').down('textfield[name=insuranceNumber]');

        insuranceNumber.setValue();

        insuranceField.getStore().load({
            params: {
                clientId: rec.data.clientId
            },
            callback: function() {
                insuranceField.setDisabled(false);
            }
        });

    },

    onInsuranceComboboxSelect: function(combo, record, eOpts) {
        var me = this,
            cmp = combo,
            rec = records[0],
            insuranceNumber = cmp.up('diaryform').down('textfield[name=insuranceNumber]');

        insuranceNumber.setValue(rec.data.insuranceNumber);

    }

});
