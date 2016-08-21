/*
 * File: app/store/Specialties.js
 */

Ext.define('skyclinic.store.Specialties', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.Specialty',
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
            storeId: 'Specialties',
            model: 'skyclinic.model.Specialty',
            proxy: me.processMyAjaxProxy17({
                type: 'ajax',
                extraParams: {
                    tbl: 'settSpecialties'
                },
                url: '/settings/grid',
                reader: {
                    type: 'json'
                }
            })
        }, cfg)]);
    },

    processMyAjaxProxy17: function(config) {
        config.msg = 'Especialidades';
        config.msgDone = config.msg + ' carregados!';
        config.msgException = config.msg + ' não carregados!';

        return config;
    }

});