/*
 * File: app/controller/MotoristasGrid.js
 */

Ext.define('skyclinic.controller.MotoristasGrid', {
    extend: 'Ext.app.Controller',

    control: {
        "motoristasgrid actioncolumn[action=editX]": {
            click: 'onEditColumnClick'
        },
        "motoristasgrid actioncolumn[action=delete]": {
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
                grid.up(xtypeMain).down(xtypeMain+'form').down('textfield[name=cpf_motorista_sam]').setReadOnly(true);
            };

        ctrlGlobal.editRecord(me, rec.data.cpf_motorista_sam, rec, grid, 'Formulário', xtypeMain+'tab', xtypeMain+'form', callback);
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

        msg = 'Tem certeza que deseja continuar a operação?' + '<br/><b>CPF:</b> ' + data.cpf_motorista_sam + '<br/><b>Nome:</b> ' + data.nom_motorista_sam;
        ctrlGlobal.deleteRecord(me, store, grid, data.cpf_motorista_sam, 'Formulário', xtypeMain+'tab', xtypeMain+'form', null, msg);
    },

    onMotoristasStoreBeforeLoad: function(store, operation, eOpts) {
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

    onMotoristasStoreLoad: function(store, operation, eOpts) {
        var me = this;
        me.getAgendamentosMotoristasCmbStore().load();
    },

    init: function(application) {
        var me = this;
        me.getStore('Motoristas').addListener('beforeload', me.onMotoristasStoreBeforeLoad, me);
        me.getStore('Motoristas').addListener('load', me.onMotoristasStoreLoad, me);
    }

});
