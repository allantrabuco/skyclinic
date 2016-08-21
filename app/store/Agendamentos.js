/*
 * File: app/store/Agendamentos.js
 */

Ext.define('skyclinic.store.Agendamentos', {
    extend: 'Ext.data.Store',

    requires: [
        'skyclinic.model.Agendamento'
    ],

    config: {
        master: true
    },

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            remoteSort: true,
            storeId: 'Agendamentos',
            model: 'skyclinic.model.Agendamento'
        }, cfg)]);
    }
});