/*
 * File: app/controller/ClientsList.js
 */

Ext.define('skyclinic.controller.ClientsList', {
    extend: 'Ext.app.Controller',

    control: {
        "clientslist container[name=search] textfield[name=search]": {
            keyup: 'onSearchTextfieldKeyup'
        },
        "clientslist container[name=search] button[action=search]": {
            click: 'onSearchButtonClick'
        },
        "clientslist container[name=search] button[action=clean]": {
            click: 'onCleanButtonClick'
        }
    },

    onSearchTextfieldKeyup: function(textfield, e, eOpts) {
        var me = this,
            event = e,
            searchBtn = textfield.up().down('button[action=search]');

        if (event.keyCode === 13) {
            me.onSearchButtonClick(searchBtn);
        }
    },

    onSearchButtonClick: function(button, e, eOpts) {
        var me = this,
            ctrlGlobal = me.getController('Global'),
            xtypeMain = me.$className.split('.')[2].replace('List','').toLowerCase(),

            btn = button,
            textfield = btn.up().down('textfield[name=search]'),
            grid = btn.up(xtypeMain+'list').down(xtypeMain+'grid'),
            store = grid.getStore();

        ctrlGlobal.searchRecord(me, store, textfield, null);
    },

    onCleanButtonClick: function(button, e, eOpts) {
        var me = this,
            btn = button,

            xtypeMain = me.$className.split('.')[2].replace('List','').toLowerCase(),

            textfield = btn.up().down('textfield[name=search]'),
            searchBtn = btn.up().down('button[action=search]'),
            grid = btn.up(xtypeMain+'list').down(xtypeMain+'grid'),
            store = grid.getStore();

        textfield.reset();
        textfield.focus();

        if (store.search) {
            me.onSearchButtonClick(searchBtn);
        }


    }

});
