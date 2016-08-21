/*
 * File: app/store/TimesEndCombo.js
 */

Ext.define('skyclinic.store.TimesEndCombo', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.TimeCombo',
        'Ext.data.proxy.Memory',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'TimesEndCombo',
            model: 'skyclinic.model.TimeCombo',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});