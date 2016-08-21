/*
 * File: app/store/ProfessionalPhones.js
 */

Ext.define('skyclinic.store.ProfessionalPhones', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.ProfPhones',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'ProfessionalPhones',
            model: 'skyclinic.model.ProfPhones',
            proxy: me.processMyAjaxProxy15({
                type: 'ajax',
                url: '/professionals/getPhones',
                reader: {
                    type: 'json'
                }
            })
        }, cfg)]);
    },

    processMyAjaxProxy15: function(config) {
        config.msg = 'Telefones do profissional';
        config.msgDone = config.msg + ' carregados!';
        config.msgException = config.msg + ' não carregados!';

        return config;
    }

});