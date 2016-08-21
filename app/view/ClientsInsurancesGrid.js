/*
 * File: app/view/ClientsInsurancesGrid.js
 */

Ext.define('skyclinic.view.ClientsInsurancesGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.clientsinsurancesgrid',

    requires: [
        'skyclinic.view.ClientsInsurancesGridViewModel',
        'Ext.view.Table',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Action'
    ],

    viewModel: {
        type: 'clientsinsurancesgrid'
    },
    border: false,
    cls: 'k-grid-phones',
    hideHeaders: true,
    store: 'ClientInsurances',

    viewConfig: {
        getRowClass: function(record, rowIndex, rowParams, store) {
            return record.data.state === 0 ? 'grid-row-inactive' : '';
        },
        listeners: {
            render: function (view) {
                view.tip = Ext.create('Ext.tip.ToolTip', {
                    tpl: new Ext.XTemplate(
                        '<dl class="eventTip">',
                            '<dt>Operadora</dt>',
                            '<dd>{description}</dd>',
                            '<dt>Número</dt>',
                            '<dd>{insuranceNumber}</dd>',
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
            store: 'ClientInsurances'
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
            dataIndex: 'insuranceOperator',
            text: 'insuranceRef'
        },
        {
            xtype: 'gridcolumn',
            flex: 2,
            dataIndex: 'description',
            text: 'InsuranceDescription'
        },
        {
            xtype: 'gridcolumn',
            flex: 2,
            dataIndex: 'insuranceNumber',
            text: 'insuranceNumber'
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