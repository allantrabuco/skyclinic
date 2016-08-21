/*
 * File: app/store/Insurances.js
 */

Ext.define('skyclinic.store.Insurances', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.Insurance',
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
            storeId: 'Insurances',
            model: 'skyclinic.model.Insurance',
            proxy: me.processMyAjaxProxy18({
                type: 'ajax',
                extraParams: {
                    tbl: 'settInsurances'
                },
                url: '/settings/grid',
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

    processMyAjaxProxy18: function(config) {
        config.msg = 'Convênios';
        config.msgDone = config.msg + ' carregados!';
        config.msgException = config.msg + ' não carregados!';

        config.combos = [];
        config.combos.push('ClientInsurancesCombo');

        return config;
    }

});