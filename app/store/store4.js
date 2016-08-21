/*
 * File: app/store/store4.js
 */

Ext.define('skyclinic.store.store4', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.ChartExample',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store4',
            model: 'skyclinic.model.ChartExample',
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});