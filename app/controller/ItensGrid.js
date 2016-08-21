/*
 * File: app/controller/ItensGrid.js
 */

Ext.define('skyclinic.controller.ItensGrid', {
    extend: 'Ext.app.Controller',

    control: {
        "itensgrid actioncolumn[action=edit]": {
            click: 'onEditColumnClick'
        },
        "itensgrid actioncolumn[action=delete]": {
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
                grid.up(xtypeMain).down(xtypeMain+'form').down('textfield[name=cod_item_sai]').setReadOnly(true);
            };

        ctrlGlobal.editRecord(me, rec.data.cod_item_sai, rec, grid, 'Formulário', xtypeMain+'tab', xtypeMain+'form', callback);
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

        msg = 'Tem certeza que deseja continuar a operação?' + '<br/><b>Código:</b> ' + data.cod_item_sai + '<br/><b>Descrição:</b> ' + data.desc_item_sai;
        ctrlGlobal.deleteRecord(me, store, grid, data.cod_item_sai, 'Formulário', xtypeMain+'tab', xtypeMain+'form', null, msg);
    },

    onItensStoreBeforeLoad: function(store, operation, eOpts) {
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

    init: function(application) {
        var me = this;
        me.getStore('Itens').addListener('beforeload', me.onItensStoreBeforeLoad, me);
    }

});
