/*
 * File: app/store/store3.js
 */

Ext.define('skyclinic.store.store3', {
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
            storeId: 'store3',
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