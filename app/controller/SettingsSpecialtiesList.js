/*
 * File: app/controller/SettingsSpecialtiesList.js
 */

Ext.define('skyclinic.controller.SettingsSpecialtiesList', {
    extend: 'Ext.app.Controller',

    control: {
        "settingsspecialtieslist button[action=add]": {
            click: 'onAddButtonClick'
        }
    },

    onAddButtonClick: function(button, e, eOpts) {
        var me = this,
            btn = button,
            grid = btn.up('settingsspecialtieslist').down('settingsspecialtiesgrid'),
            store = grid.getStore(),
            rowEdit = grid.getPlugin('SettingsSpecialtiesGridEditingPlugin'),
            newRec = Ext.create('skyclinic.model.Specialty', {
                description: '',
                state: 1
            });

        rowEdit.cancelEdit();
        store.insert(0, newRec);
        rowEdit.startEdit(0, 0);
    }

});
