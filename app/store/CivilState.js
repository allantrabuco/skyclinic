/*
 * File: app/store/CivilState.js
 */

Ext.define('skyclinic.store.CivilState', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.CivilState',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.util.Sorter'
    ],

    config: {
        master: true
    },

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'CivilState',
            model: 'skyclinic.model.CivilState',
            proxy: me.processMyAjaxProxy11({
                type: 'ajax',
                url: './data/civilState.json',
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json'
                },
                reader: {
                    type: 'json'
                }
            }),
            sorters: {
                property: 'field'
            }
        }, cfg)]);
    },

    processMyAjaxProxy11: function(config) {
        config.msg = 'Estados Civil';
        config.msgDone = config.msg + ' carregados!';
        config.msgException = config.msg + ' não carregados!';

        return config;
    }

});