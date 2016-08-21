/*
 * File: app/store/ClientInsurancesCombo.js
 */

Ext.define('skyclinic.store.ClientInsurancesCombo', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.InsurancesCombo',
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
            storeId: 'ClientInsurancesCombo',
            model: 'skyclinic.model.InsurancesCombo',
            proxy: me.processMyAjaxProxy7({
                type: 'ajax',
                extraParams: {
                    tbl: 'settInsurances'
                },
                url: '/settings/comboBox',
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

    processMyAjaxProxy7: function(config) {
        config.msg = 'Convênios';
        config.msgDone = config.msg + ' carregados!';
        config.msgException = config.msg + ' não carregados!';

        return config;
    }

});