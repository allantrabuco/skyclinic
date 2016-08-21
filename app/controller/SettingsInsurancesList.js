/*
 * File: app/controller/SettingsInsurancesList.js
 */

Ext.define('skyclinic.controller.SettingsInsurancesList', {
    extend: 'Ext.app.Controller',

    control: {
        "settingsinsuranceslist button[action=add]": {
            click: 'onAddButtonClick'
        }
    },

    onAddButtonClick: function(button, e, eOpts) {
        var me = this,
            btn = button,
            grid = btn.up('settingsinsuranceslist').down('settingsinsurancesgrid'),
            store = grid.getStore(),
            rowEdit = grid.getPlugin('SettingsInsurancesGridEditingPlugin'),
            newRec = Ext.create('skyclinic.model.Insurance', {
                description: '',
                state: 1
            });

        rowEdit.cancelEdit();
        store.insert(0, newRec);
        rowEdit.startEdit(0, 0);
    }

});
