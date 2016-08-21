/*
 * File: app/store/DiaryClientsCombo.js
 */

Ext.define('skyclinic.store.DiaryClientsCombo', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.Clients',
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
            storeId: 'DiaryClientsCombo',
            model: 'skyclinic.model.Clients',
            proxy: me.processMyAjaxProxy5({
                type: 'ajax',
                extraParams: {
                    
                },
                url: './backend/index.php/clients/grid',
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

    processMyAjaxProxy5: function(config) {
        config.msg = 'Pacientes';
        config.msgDone = config.msg + ' carregados!';
        config.msgException = config.msg + ' não carregados!';

        return config;
    }

});