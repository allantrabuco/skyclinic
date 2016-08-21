/*
 * File: app/store/Messages.js
 */

Ext.define('skyclinic.store.Messages', {
    extend: 'Ext.data.Store',
    alias: 'store.messages',

    requires: [
        'skyclinic.model.Message',
        'Ext.data.proxy.Memory',
        'Ext.data.reader.Array',
        'Ext.util.Sorter'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            groupDir: 'DESC',
            storeId: 'Messages',
            model: 'skyclinic.model.Message',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'array'
                }
            },
            sorters: {
                direction: 'DESC',
                property: 'msgText'
            }
        }, cfg)]);
    }
});