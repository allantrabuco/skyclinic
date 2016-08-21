/*
 * File: app/store/Schedules.js
 */

Ext.define('skyclinic.store.Schedules', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.Scheduling',
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
            storeId: 'Diary',
            model: 'skyclinic.model.Scheduling',
            proxy: me.processMyAjaxProxy({
                type: 'ajax',
                url: '/appointments',
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

    processMyAjaxProxy: function(config) {
        config.msg = 'Agenda';
        config.msgDone = config.msg + ' carregada!';
        config.msgException = config.msg + ' não carregada!';

        return config;
    }

});