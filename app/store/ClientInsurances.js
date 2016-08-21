/*
 * File: app/store/ClientInsurances.js
 */

Ext.define('skyclinic.store.ClientInsurances', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.ClientInsurances',
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
            storeId: 'ClientInsurances',
            model: 'skyclinic.model.ClientInsurances',
            proxy: me.processMyAjaxProxy6({
                type: 'ajax',
                url: '/clients/getInsurances',
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

    processMyAjaxProxy6: function(config) {
        config.msg = 'Convênios do paciente';
        config.msgDone = config.msg + ' carregados!';
        config.msgException = config.msg + ' não carregados!';

        config.combo = [];
        config.combo.push('DiaryClientInsurancesCombo');

        return config;
    }

});