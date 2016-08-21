/*
 * File: app/store/store5.js
 */

Ext.define('skyclinic.store.store5', {
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
            storeId: 'store5',
            model: 'skyclinic.model.ChartExample',
            data: [
                {
                    name: 'metric one',
                    data1: 25
                },
                {
                    name: 'metric two',
                    data1: 75
                }
            ],
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});