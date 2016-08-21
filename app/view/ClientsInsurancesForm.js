/*
 * File: app/view/ClientsInsurancesForm.js
 */

Ext.define('skyclinic.view.ClientsInsurancesForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.clientsinsurancesform',

    requires: [
        'skyclinic.view.ClientsInsurancesGrid',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.grid.Panel'
    ],

    border: false,
    height: 185,
    margin: '15 0 10 0',
    minHeight: 185,
    ui: 'defpanel',
    layout: 'border',
    bodyPadding: '10 0 10 0',
    title: 'Categorias/Convênios',

    items: [
        {
            xtype: 'container',
            name: 'clientInsurance',
            flex: 1,
            region: 'west',
            itemId: 'mycontainer3',
            margin: '0 10 0 0',
            width: 150,
            defaults: {
                anchor: '0',
                labelAlign: 'top',
                labelSeparator: ''
            },
            layout: 'anchor',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        anchor: '0',
                        labelAlign: 'top',
                        labelSeparator: ''
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            group: 'clientInsurances',
                            tpl: '<tpl for="."><tpl if="state == \'0\'"><div class="x-boundlist-item k-inactive">{description}</div><tpl else><div class="x-boundlist-item">{description}</div></tpl></tpl>',
                            flex: 1,
                            cls: 'k-input',
                            fieldLabel: 'Operadora',
                            labelWidth: 105,
                            name: 'insuranceOperator',
                            enableKeyEvents: true,
                            anyMatch: true,
                            displayField: 'description',
                            forceSelection: true,
                            queryMode: 'local',
                            store: 'ClientInsurancesCombo',
                            valueField: 'reference'
                        },
                        {
                            xtype: 'button',
                            action: 'addMore',
                            flex: 1,
                            height: 24,
                            margin: '26 0 0 5',
                            maxWidth: 30,
                            ui: 'graybutton-small',
                            width: 30,
                            text: '<i class=\'fa fa-plus\'></i>',
                            tooltip: 'Adicionar/Alterar convênios'
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    group: 'clientInsurances',
                    cls: 'k-input',
                    fieldLabel: 'Número',
                    labelWidth: 105,
                    name: 'insuranceNumber',
                    enforceMaxLength: true,
                    maxLength: 45
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            action: 'cleanInsurance',
                            disabled: true,
                            margin: '0 10 0 0',
                            ui: 'redbutton-small',
                            text: 'Limpar'
                        },
                        {
                            xtype: 'button',
                            action: 'addInsurance',
                            recordId: 0,
                            disabled: true,
                            ui: 'bluebutton-small',
                            text: 'Adicionar',
                            tooltip: 'Adicionar novo registro'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'clientsinsurancesgrid',
            region: 'center'
        }
    ]

});