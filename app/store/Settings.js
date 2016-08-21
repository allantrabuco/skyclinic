/*
 * File: app/store/Settings.js
 */

Ext.define('skyclinic.store.Settings', {
    extend: 'Ext.data.Store',
    alias: 'store.settings',

    requires: [
        'skyclinic.model.Settings',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'Settings',
            model: 'skyclinic.model.Settings',
            proxy: {
                type: 'ajax',
                url: './data/config.json',
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json'
                },
                reader: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});