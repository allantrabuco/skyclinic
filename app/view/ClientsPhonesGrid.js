/*
 * File: app/view/ClientsPhonesGrid.js
 */

Ext.define('skyclinic.view.ClientsPhonesGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.clientsphonesgrid',

    requires: [
        'skyclinic.view.ClientsPhonesGridViewModel',
        'Ext.view.Table',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Action'
    ],

    viewModel: {
        type: 'clientsphonesgrid'
    },
    border: false,
    cls: 'k-grid-phones',
    hideHeaders: true,
    store: 'ClientPhones',

    viewConfig: {
        listeners: {
            render: function (view) {
                view.tip = Ext.create('Ext.tip.ToolTip', {
                    tpl: new Ext.XTemplate(
                        '<dl class="eventTip">',
                            '<tpl if="phoneType == 1">',
                                '<span class="phone-icon">&nbsp;&nbsp;&nbsp;&nbsp;</span>',
                            '</tpl>',
                            '<tpl if="phoneType == 2">',
                                '<span class="mobile-icon">&nbsp;&nbsp;&nbsp;&nbsp;</span>',
                            '</tpl>',
                            '<dt>Número</dt>',
                            '<dd>{phoneNumber}</dd>',
                            '<tpl if="this.hasValue(phoneOperator)">',
                                '<dt>Operadora</dt>',
                                '<dd>{phoneOperator}</dd>',
                            '</tpl>',
                            '<tpl if="this.hasValue(phoneNotes)">',
                                '<dt>Notas</dt>',
                                '<dd>{phoneNotes}</dd>',
                            '</tpl>',
                        '</dl>',
                        {
                            hasValue: function(field) {
                                if (field !== '')
                                    return true;
                                return false;
                            }
                        }
                    ).compile(),
                    target: view.el,
                    delegate: view.itemSelector,
                    trackMouse: true,
                    renderTo: Ext.getBody(),
                    listeners: {
                        beforeshow: function(tip) {
                            var record = view.getRecord(tip.triggerElement);
                            if (record) {
                                tip.update(record.data);
                            } else {
                                tip.on('show', function() {
                                    Ext.defer(tip.hide, 10, tip);
                                }, tip, {single: true});
                            }
                        }
                    }
                });
            }
        },
        loadMask: false
    },
    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            width: 360,
            displayInfo: true,
            displayMsg: '{2} registro(s)',
            store: 'ClientPhones'
        }
    ],
    columns: [
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'id',
            text: 'Id'
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'profId',
            text: 'ProfId'
        },
        {
            xtype: 'actioncolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                var me = this,
                    val = parseInt(value, 10),
                    meta = metaData,
                    data = record.data;

                if (val === 1) {
                    meta.tdCls = 'phone-icon';
                } else if (val === 2) {
                    meta.tdCls = 'mobile-icon';
                }
            },
            width: 20,
            dataIndex: 'phoneType'
        },
        {
            xtype: 'gridcolumn',
            flex: 2,
            dataIndex: 'phoneNumber',
            text: 'PhoneNumber'
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            width: 25,
            dataIndex: 'phoneType',
            text: 'PhoneType'
        },
        {
            xtype: 'gridcolumn',
            flex: 1,
            dataIndex: 'phoneOperator',
            text: 'PhoneOperator'
        },
        {
            xtype: 'gridcolumn',
            flex: 2,
            dataIndex: 'phoneNotes',
            text: 'PhoneNotes'
        },
        {
            xtype: 'actioncolumn',
            name: 'delete',
            draggable: false,
            resizable: false,
            width: 25,
            menuDisabled: true,
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
            name: 'edit',
            draggable: false,
            resizable: false,
            width: 25,
            menuDisabled: true,
            items: [
                {
                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                        skyclinic.getApplication().getController(view.up().$className.split('.')[2]).onEditColumnClick(view, rowIndex, colIndex, item, e, record, row);
                    },
                    iconCls: 'edit-icon',
                    tooltip: 'Editar'
                }
            ]
        }
    ]

});