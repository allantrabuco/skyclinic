/*
 * File: app/store/ProfessionalSpecialtiesCombo.js
 */

Ext.define('skyclinic.store.ProfessionalSpecialtiesCombo', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.SpecialtiesCombo',
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
            storeId: 'ProfessionalSpecialtiesCombo',
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