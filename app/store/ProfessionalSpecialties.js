/*
 * File: app/store/ProfessionalSpecialties.js
 */

Ext.define('skyclinic.store.ProfessionalSpecialties', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.ProfSpecialties',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'ProfessionalSpecialties',
            model: 'skyclinic.model.ProfSpecialties',
            proxy: me.processMyAjaxProxy13({
                type: 'ajax',
                url: '/professionals/getSpecialties',
                reader: {
                    type: 'json'
                }
            })
        }, cfg)]);
    },

    processMyAjaxProxy13: function(config) {
        config.msg = 'Especialidades do profissional';
        config.msgDone = config.msg + ' carregados!';
        config.msgException = config.msg + ' não carregados!';

        return config;
    }

});