/*
 * File: app/store/CliCombo.js
 */

Ext.define('skyclinic.store.CliCombo', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.Clients',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'CliCombo',
            model: 'skyclinic.model.Clients',
            proxy: me.processMyAjaxProxy2({
                type: 'ajax',
                url: '/clients/grid',
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

    processMyAjaxProxy2: function(config) {
        config.msg = 'Pacientes';
        config.msgDone = config.msg + ' carregados!';
        config.msgException = config.msg + ' não carregados!';

        return config;
    }

});