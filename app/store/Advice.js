/*
 * File: app/store/Advice.js
 */

Ext.define('skyclinic.store.Advice', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.Federation',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.util.Sorter'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply(me.processAdvice({
            storeId: 'Advice',
            model: 'skyclinic.model.Federation',
            proxy: {
                type: 'ajax',
                url: './data/advice.json',
                reader: {
                    type: 'json'
                }
            },
            sorters: {
                property: 'field'
            }
        }), cfg)]);
    },

    processAdvice: function(config) {
        config.msg = 'Convênios';
        config.msgDone = config.msg + ' carregados!';
        config.msgException = config.msg + ' não carregados!';

        return config;
    }

});