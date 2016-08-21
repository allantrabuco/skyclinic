/*
 * File: app/view/ClientsPhonesForm.js
 */

Ext.define('skyclinic.view.ClientsPhonesForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.clientsphonesform',

    requires: [
        'skyclinic.view.ClientsPhonesGrid',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.grid.Panel'
    ],

    border: false,
    height: 300,
    margin: '15 0 10 0',
    minHeight: 300,
    ui: 'defpanel',
    layout: 'border',
    bodyPadding: '10 0 10 0',
    title: 'Telefones',

    items: [
        {
            xtype: 'container',
            name: 'phones',
            flex: 1,
            region: 'west',
            itemId: 'mycontainer18',
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
                    xtype: 'textfield',
                    group: 'clientPhones',
                    cls: 'k-input',
                    fieldLabel: 'Número',
                    labelWidth: 105,
                    name: 'phoneNumber',
                    enforceMaxLength: true,
                    maxLength: 45
                },
                {
                    xtype: 'radiogroup',
                    name: 'phoneTypeGroup',
                    fieldLabel: 'Tipo',
                    labelWidth: 105,
                    combineErrors: true,
                    items: [
                        {
                            xtype: 'radiofield',
                            group: 'clientPhones',
                            width: 70,
                            name: 'phoneType',
                            boxLabel: 'Fixo',
                            inputValue: '1'
                        },
                        {
                            xtype: 'radiofield',
                            group: 'clientPhones',
                            width: 70,
                            name: 'phoneType',
                            boxLabel: 'Celular',
                            inputValue: '2'
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    cls: 'k-input',
                    disabled: true,
                    fieldLabel: 'Operadora',
                    labelWidth: 105,
                    name: 'phoneOperator',
                    emptyText: '(Operadora de celular)',
                    enableKeyEvents: true,
                    anyMatch: true,
                    displayField: 'field',
                    forceSelection: true,
                    queryMode: 'local',
                    store: 'MobileOperator',
                    valueField: 'field'
                },
                {
                    xtype: 'textfield',
                    cls: 'k-input',
                    fieldLabel: 'Notas',
                    labelWidth: 105,
                    name: 'phoneNotes',
                    enforceMaxLength: true,
                    maxLength: 100
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
                            action: 'cleanPhone',
                            disabled: true,
                            margin: '0 10 0 0',
                            ui: 'redbutton-small',
                            text: 'Limpar'
                        },
                        {
                            xtype: 'button',
                            action: 'addPhone',
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
            xtype: 'clientsphonesgrid',
            region: 'center'
        }
    ]

});