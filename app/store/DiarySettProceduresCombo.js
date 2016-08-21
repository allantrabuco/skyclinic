/*
 * File: app/store/DiarySettProceduresCombo.js
 */

Ext.define('skyclinic.store.DiarySettProceduresCombo', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.Procedure',
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
            storeId: 'DiarySettProceduresCombo',
            model: 'skyclinic.model.Procedure',
            proxy: me.processMyAjaxProxy19({
                type: 'ajax',
                extraParams: {
                    tbl: 'settProcedures'
                },
                url: '/settings/grid',
                reader: {
                    type: 'json'
                }
            })
        }, cfg)]);
    },

    processMyAjaxProxy19: function(config) {
        config.msg = 'Procedimentos';
        config.msgDone = config.msg + ' carregados!';
        config.msgException = config.msg + ' não carregados!';

        return config;
    }

});