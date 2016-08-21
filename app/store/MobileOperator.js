/*
 * File: app/store/MobileOperator.js
 */

Ext.define('skyclinic.store.MobileOperator', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.Federation',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.util.Sorter'
    ],

    config: {
        master: true
    },

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'MobileOperator',
            model: 'skyclinic.model.Federation',
            proxy: me.processMyAjaxProxy9({
                type: 'ajax',
                url: './data/mobileOperator.json',
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json'
                },
                reader: {
                    type: 'json'
                }
            }),
            sorters: {
                property: 'field'
            }
        }, cfg)]);
    },

    processMyAjaxProxy9: function(config) {
        config.msg = 'Operadoras móveis';
        config.msgDone = config.msg + ' carregados!';
        config.msgException = config.msg + ' não carregados!';

        return config;
    }

});