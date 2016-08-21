/*
 * File: app/store/Sex.js
 */

Ext.define('skyclinic.store.Sex', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.Sex',
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
            storeId: 'Sex',
            model: 'skyclinic.model.Sex',
            proxy: me.processMyAjaxProxy11({
                type: 'ajax',
                url: './data/sex.json',
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

    processMyAjaxProxy11: function(config) {
        //config.msg = 'Estados Civil';
        //config.msgDone = config.msg + ' carregados!';
        //config.msgException = config.msg + ' não carregados!';

        return config;
    }

});