/*
 * File: app/store/ClientsWin.js
 */

Ext.define('skyclinic.store.ClientsWin', {
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
            storeId: 'ClientsWin',
            model: 'skyclinic.model.Clients',
            proxy: me.processMyAjaxProxy5({
                type: 'ajax',
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

        config.combo = [];
        config.combo.push('DiaryClientsCombo');

        return config;
    }

});