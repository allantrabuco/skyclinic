/*
 * File: app/view/ItensGrid.js
 */

Ext.define('skyclinic.view.ItensGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.itensgrid',

    requires: [
        'Ext.view.Table',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Action'
    ],

    config: {
        name: 'ItensGrid'
    },

    viewConfig: {
        getRowClass: function(record, rowIndex, rowParams, store) {
            return record.data.flg_ativo_item_sai === '0' ? 'grid-row-inactive' : '';
        },
        enableTextSelection: true
    },
    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            width: 360,
            displayInfo: true
        }
    ],
    columns: [
        {
            xtype: 'gridcolumn',
            flex: 1,
            dataIndex: 'cod_item_sai',
            text: 'Código'
        },
        {
            xtype: 'gridcolumn',
            flex: 2,
            dataIndex: 'desc_item_sai',
            text: 'Descrição'
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return Ext.util.Format.brMoney(value, "R$ ", 2);
            },
            flex: 1,
            dataIndex: 'valor_item_sai',
            text: 'Valor'
        },
        {
            xtype: 'gridcolumn',
            flex: 2,
            dataIndex: 'fornecedor_item_sai',
            text: 'Fornecedor'
        },
        {
            xtype: 'gridcolumn',
            flex: 1,
            dataIndex: 'temp_armazenagem_item_sai',
            text: 'Tempo<br/>Armazenagem'
        },
        {
            xtype: 'actioncolumn',
            draggable: false,
            resizable: false,
            width: 25,
            enableColumnHide: false,
            hideable: false,
            menuDisabled: true,
            tooltip: 'Editar',
            items: [
                {
                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                        skyclinic.getApplication().getController(view.up().$className.split('.')[2]).onEditColumnClick(view, rowIndex, colIndex, item, e, record, row);
                    },
                    action: 'edit',
                    iconCls: 'edit-icon',
                    tooltip: 'Editar'
                }
            ]
        },
        {
            xtype: 'actioncolumn',
            action: 'delete',
            draggable: false,
            resizable: false,
            width: 25,
            enableColumnHide: false,
            hideable: false,
            menuDisabled: true,
            tooltip: 'Remover',
            items: [
                {
                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                        skyclinic.getApplication().getController(view.up().$className.split('.')[2]).onDeleteColumnClick(view, rowIndex, colIndex, item, e, record, row);
                    },
                    iconCls: 'delete-icon',
                    tooltip: 'Remover'
                }
            ]
        }
    ]

});