/*
 * File: app/view/ClientsGrid.js
 */

Ext.define('skyclinic.view.ClientsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.clientsgrid',

    requires: [
        'Ext.view.Table',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Action',
        'Ext.Img',
        'Ext.form.field.TextArea'
    ],

    store: 'Clients',

    viewConfig: {
        getRowClass: function(record, rowIndex, rowParams, store) {
            return record.data.state === 0 ? 'grid-row-inactive' : '';
        },
        enableTextSelection: true
    },
    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            width: 360,
            displayInfo: true,
            store: 'Clients'
        },
        {
            xtype: 'container',
            dock: 'bottom',
            height: 170,
            scrollable: true,
            layout: {
                type: 'hbox',
                align: 'stretch',
                padding: '10 0 0 0'
            },
            items: [
                {
                    xtype: 'image',
                    name: 'clientPhoto',
                    cls: 'k-photo',
                    height: 150,
                    maxHeight: 150,
                    width: 130,
                    src: './resources/images/camera.png'
                },
                {
                    xtype: 'container',
                    flex: 1,
                    html: '<br/><b>&nbsp;Detalhes</b>',
                    itemId: 'clientsGridDetails',
                    margin: '0 0 0 10',
                    maxHeight: 150,
                    scrollable: true,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    }
                },
                {
                    xtype: 'textareafield',
                    flex: 1,
                    cls: 'k-input',
                    hidden: true,
                    itemId: 'clientsGridDetailsX',
                    fieldLabel: 'Detalhes',
                    readOnly: true
                }
            ]
        }
    ],
    columns: [
        {
            xtype: 'gridcolumn',
            flex: 2,
            dataIndex: 'fullname',
            text: 'Nome'
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return value === 1?'Ativo':'Não Ativo';
            },
            flex: 1,
            maxWidth: 100,
            align: 'center',
            dataIndex: 'state',
            text: 'Situação'
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
            hidden: true,
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
        },
        {
            xtype: 'actioncolumn',
            action: 'select',
            draggable: false,
            hidden: true,
            resizable: false,
            width: 25,
            enableColumnHide: false,
            hideable: false,
            menuDisabled: true,
            tooltip: 'Selecionar',
            items: [
                {
                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                        skyclinic.getApplication().getController(view.up().$className.split('.')[2]).onSelectColumnClick(view, rowIndex, colIndex, item, e, record, row);
                    },
                    iconCls: 'select-icon',
                    tooltip: 'Selecionar'
                }
            ]
        }
    ]

});