/*
 * File: app/controller/TransportadorasGrid.js
 */

Ext.define('skyclinic.controller.TransportadorasGrid', {
    extend: 'Ext.app.Controller',

    control: {
        "transportadorasgrid actioncolumn[action=edit]": {
            click: 'onEditColumnClick'
        },
        "transportadorasgrid actioncolumn[action=delete]": {
            click: 'onDeleteColumnClick'
        }
    },

    onEditColumnClick: function(view, self, rowIndex, colIndex, event, record) {
        var me = this,
            rec = record,
            ctrlGlobal = me.getController('Global'),
            xtypeMain = me.$className.split('.')[2].replace('Grid','').toLowerCase(),
            grid = view,

            callback = function() {
                grid.up(xtypeMain).down(xtypeMain+'form').down('textfield[name=cnpj_transportadora_sat]').setReadOnly(true);
            };

        ctrlGlobal.editRecord(me, rec.data.cnpj_transportadora_sat, rec, grid, 'Formulário', xtypeMain+'tab', xtypeMain+'form', callback);
    },

    onDeleteColumnClick: function(view, self, rowIndex, colIndex, event, record) {
        var me = this,
            grid = view,
            data = record.data,
            ctrlGlobal = me.getController('Global'),
            xtypeMain = me.$className.split('.')[2].replace('Grid','').toLowerCase(),
            store = grid.getStore(),
            callback = function() {
            };

        msg = 'Tem certeza que deseja continuar a operação?' + '<br/><b>CNPJ:</b> ' + data.cnpj_transportadora_sat + '<br/><b>Nome Fantasia:</b> ' + data.nom_fant_transportadora_sat;
        ctrlGlobal.deleteRecord(me, store, grid, data.cnpj_transportadora_sat, 'Formulário', xtypeMain+'tab', xtypeMain+'form', null, msg);
    },

    onTransportadorasStoreBeforeLoad: function(store, operation, eOpts) {
        var me = this,
            opr = operation,
            main = me.getController(me.$className.split('.')[2].replace('Grid','')).getMainRef(),
            value = main.down(me.$className.split('.')[2].replace('Grid','').toLowerCase() + 'list').down('textfield[name=search]').getValue();

        if (value.length > 0) {
            if (Ext.isEmpty(opr._params)) {
                opr._params = {findValue: value};
            } else {
                opr._params.findValue = value;
            }
        }

    },

    onTransportadorasStoreLoad: function(store, operation, eOpts) {
        var me = this;
        me.getAgendamentosTransportadorasCmbStore().load();
    },

    init: function(application) {
        var me = this;
        me.getStore('Transportadoras').addListener('beforeload', me.onTransportadorasStoreBeforeLoad, me);
        me.getStore('Transportadoras').addListener('load', me.onTransportadorasStoreLoad, me);
    }

});
