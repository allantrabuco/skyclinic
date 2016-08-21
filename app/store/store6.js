/*
 * File: app/store/store6.js
 */

Ext.define('skyclinic.store.store6', {
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
            storeId: 'store6',
            model: 'skyclinic.model.ChartExample',
            data: [
                {
                    name: 'Jan',
                    data1: 20,
                    data2: 37,
                    data3: 35,
                    data4: 4
                },
                {
                    name: 'Feb',
                    data1: 20,
                    data2: 37,
                    data3: 36,
                    data4: 5
                },
                {
                    name: 'Mar',
                    data1: 19,
                    data2: 36,
                    data3: 37,
                    data4: 4
                },
                {
                    name: 'Apr',
                    data1: 18,
                    data2: 36,
                    data3: 38,
                    data4: 5
                },
                {
                    name: 'May',
                    data1: 18,
                    data2: 35,
                    data3: 39,
                    data4: 4
                },
                {
                    name: 'Jun',
                    data1: 17,
                    data2: 34,
                    data3: 42,
                    data4: 4
                },
                {
                    name: 'Jul',
                    data1: 16,
                    data2: 34,
                    data3: 43,
                    data4: 4
                },
                {
                    name: 'Aug',
                    data1: 16,
                    data2: 33,
                    data3: 44,
                    data4: 4
                },
                {
                    name: 'Sep',
                    data1: 16,
                    data2: 32,
                    data3: 44,
                    data4: 4
                },
                {
                    name: 'Oct',
                    data1: 16,
                    data2: 32,
                    data3: 45,
                    data4: 4
                },
                {
                    name: 'Nov',
                    data1: 15,
                    data2: 31,
                    data3: 46,
                    data4: 4
                },
                {
                    name: 'Dec',
                    data1: 15,
                    data2: 31,
                    data3: 47,
                    data4: 4
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