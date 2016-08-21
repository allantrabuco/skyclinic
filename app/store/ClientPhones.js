/*
 * File: app/store/ClientPhones.js
 */

Ext.define('skyclinic.store.ClientPhones', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.ClientPhones',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    config: {
        master: true
    },

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'ClientPhones',
            model: 'skyclinic.model.ClientPhones',
            proxy: me.processMyAjaxProxy8({
                type: 'ajax',
                url: '/clients/getPhones',
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json'
                },
                reader: {
                    type: 'json'
                }
            })
        }, cfg)]);
    },

    processMyAjaxProxy8: function(config) {
        config.msg = 'Telefones do paciente';
        config.msgDone = config.msg + ' carregados!';
        config.msgException = config.msg + ' não carregados!';

        return config;
    }

});