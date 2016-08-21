/*
 * File: app/store/Federation.js
 */

Ext.define('skyclinic.store.Federation', {
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
        me.callParent([Ext.apply({
            storeId: 'Federation',
            autoLoad: true,
            model: 'skyclinic.model.Federation',
            proxy: me.processMyAjaxProxy10({
                type: 'ajax',
                url: './data/federation.json',
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

    processMyAjaxProxy10: function(config) {
        config.msg = 'Estados (UF)';
        config.msgDone = config.msg + ' carregados!';
        config.msgException = config.msg + ' não carregados!';

        return config;
    }

});