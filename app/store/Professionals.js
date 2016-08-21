/*
 * File: app/store/Professionals.js
 */

Ext.define('skyclinic.store.Professionals', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.Professionals',
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
            storeId: 'Professionals',
            model: 'skyclinic.model.Professionals',
            proxy: me.processMyAjaxProxy12({
                type: 'ajax',
                url: '/professionals/grid',
                reader: {
                    type: 'json'
                }
            })
        }, cfg)]);
    },

    processMyAjaxProxy12: function(config) {
        config.msg = 'Profissionais de Saúde';
        config.msgDone = config.msg + ' carregados!';
        config.msgException = config.msg + ' não carregados!';

        return config;
    }

});