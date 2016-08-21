/*
 * File: app/controller/SettingsProceduresList.js
 */

Ext.define('skyclinic.controller.SettingsProceduresList', {
    extend: 'Ext.app.Controller',

    control: {
        "settingsprocedureslist button[action=add]": {
            click: 'onAddButtonClick'
        }
    },

    onAddButtonClick: function(button, e, eOpts) {
        var me = this,
            btn = button,
            grid = btn.up('settingsprocedureslist').down('settingsproceduresgrid'),
            store = grid.getStore(),
            rowEdit = grid.getPlugin('SettingsProceduresGridEditingPlugin'),
            newRec = Ext.create('skyclinic.model.Procedure', {
                description: '',
                duration:0,
                cost:0,
                state: 1
            });

        rowEdit.cancelEdit();
        store.insert(0, newRec);
        rowEdit.startEdit(0, 0);
    }

});
