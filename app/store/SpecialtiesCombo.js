/*
 * File: app/store/SpecialtiesCombo.js
 */

Ext.define('skyclinic.store.SpecialtiesCombo', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.SpecialtiesCombo',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'SpecialtiesCombo',
            model: 'skyclinic.model.SpecialtiesCombo',
            proxy: me.processMyAjaxProxy14({
                type: 'ajax',
                extraParams: {
                    tbl: 'settSpecialties'
                },
                url: '/settings/comboBox',
                reader: {
                    type: 'json'
                }
            })
        }, cfg)]);
    },

    processMyAjaxProxy14: function(config) {
        config.msg = 'Especialidades';
        config.msgDone = config.msg + ' carregadas!';
        config.msgException = config.msg + ' não carregadas!';

        return config;
    }

});