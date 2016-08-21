/*
 * File: app/view/ClientsAdditionalForm.js
 */

Ext.define('skyclinic.view.ClientsAdditionalForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.clientsadditionalform',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'Ext.form.Panel',
        'Ext.form.field.Number',
        'Ext.form.field.ComboBox',
        'Ext.Img',
        'Ext.form.field.Date'
    ],

    cls: 'background',
    scrollable: true,
    ui: 'defpanel',
    defaults: {
        anchor: '0',
        labelAlign: 'right'
    },
    bodyPadding: 15,
    title: 'Informações Adicionais',
    fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 75
    },
    trackResetOnLoad: true,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'right',
            ui: 'bodytoolbar',
            items: [
                {
                    xtype: 'button',
                    action: 'add',
                    height: 30,
                    ui: 'bluebutton-small',
                    width: 80,
                    text: 'Novo',
                    tooltip: 'Adicionar novo registro'
                },
                {
                    xtype: 'button',
                    action: 'save',
                    formBind: true,
                    height: 30,
                    ui: 'greenbutton-small',
                    width: 80,
                    text: 'Salvar',
                    tooltip: 'Salvar'
                },
                {
                    xtype: 'button',
                    action: 'save',
                    formBind: true,
                    height: 30,
                    hidden: true,
                    ui: 'greenbutton-small',
                    text: 'Salvar +',
                    tooltip: 'Salvar e adicionar'
                },
                {
                    xtype: 'button',
                    action: 'cancel',
                    height: 30,
                    ui: 'redbutton-small',
                    width: 80,
                    text: 'Cancel',
                    tooltip: 'Cancelar'
                },
                {
                    xtype: 'tbfill'
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'container',
            height: 340,
            defaults: {
                anchor: '0',
                labelAlign: 'top',
                labelSeparator: ''
            },
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'form',
                    flex: 1,
                    height: 340,
                    margin: '0 10 0 0 ',
                    defaults: {
                        anchor: '0',
                        labelAlign: 'top',
                        labelSeparator: ''
                    },
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 75,
                        labelAlign: 'top',
                        labelSeparator: ''
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            cls: 'k-input',
                            disabled: true,
                            hidden: true,
                            fieldLabel: 'Reference',
                            labelWidth: 105,
                            name: 'reference',
                            readOnly: true,
                            hideTrigger: true,
                            allowDecimals: false,
                            allowExponential: false
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Nome completo',
                            name: 'fullname',
                            readOnly: true,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 100
                        },
                        {
                            xtype: 'combobox',
                            cls: 'k-input',
                            fieldLabel: 'Estado Civil',
                            labelWidth: 105,
                            name: 'civilState',
                            displayField: 'field',
                            store: 'CivilState',
                            valueField: 'field'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Profissão',
                            labelWidth: 105,
                            name: 'occupation',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 100
                        },
                        {
                            xtype: 'textfield',
                            cls: 'k-input',
                            width: 150,
                            fieldLabel: 'Escolaridade',
                            labelWidth: 105,
                            name: 'schooling',
                            enforceMaxLength: true,
                            maxLength: 45
                        },
                        {
                            xtype: 'textfield',
                            cls: 'k-input',
                            fieldLabel: 'CPF',
                            labelWidth: 105,
                            name: 'cpf',
                            emptyText: 'formato: 999.999.999-99',
                            enforceMaxLength: true,
                            maxLength: 20
                        },
                        {
                            xtype: 'container',
                            defaults: {
                                labelAlign: 'top',
                                labelSeparator: '',
                                anchor: '0'
                            },
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    padding: '0 5 0 0',
                                    fieldLabel: 'RG',
                                    labelWidth: 105,
                                    name: 'rg',
                                    emptyText: 'formato: 999.999.999-99',
                                    enforceMaxLength: true,
                                    maxLength: 20
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    cls: 'k-input',
                                    padding: '0 0 0 5',
                                    fieldLabel: 'Emissor',
                                    labelWidth: 105,
                                    name: 'rgIssuing',
                                    emptyText: 'exemplo: SSP/SP',
                                    enforceMaxLength: true,
                                    maxLength: 20
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    height: 230,
                    maxHeight: 230,
                    maxWidth: 210,
                    minWidth: 210,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'image',
                            name: 'clientPhotoCA',
                            cls: 'k-photo-click',
                            height: 230,
                            itemId: 'myimg',
                            width: 210,
                            src: './resources/images/camera.png'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            border: false,
            height: 133,
            hidden: true,
            margin: '15 0 10 0',
            ui: 'kpanel',
            defaults: {
                labelAlign: 'right',
                anchor: '0'
            },
            bodyPadding: '10 0 10 0',
            title: 'Identificação'
        },
        {
            xtype: 'form',
            border: false,
            height: 380,
            margin: '15 0 10 0',
            ui: 'defpanel',
            defaults: {
                anchor: '0',
                labelAlign: 'top',
                labelSeparator: ''
            },
            bodyPadding: '10 0 10 0',
            title: 'Responsáveis',
            items: [
                {
                    xtype: 'textfield',
                    cls: 'k-input',
                    fieldLabel: 'Mãe',
                    labelWidth: 105,
                    name: 'mother',
                    enforceMaxLength: true,
                    maxLength: 45
                },
                {
                    xtype: 'textfield',
                    cls: 'k-input',
                    fieldLabel: 'E-mail',
                    name: 'motherEmail',
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 100,
                    vtype: 'email'
                },
                {
                    xtype: 'textfield',
                    cls: 'k-input',
                    fieldLabel: 'Pai',
                    labelWidth: 105,
                    name: 'father'
                },
                {
                    xtype: 'textfield',
                    cls: 'k-input',
                    fieldLabel: 'E-mail',
                    name: 'fatherEmail',
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 100,
                    vtype: 'email'
                },
                {
                    xtype: 'textfield',
                    cls: 'k-input',
                    fieldLabel: 'Responsável',
                    labelWidth: 105,
                    name: 'guardian',
                    enforceMaxLength: true,
                    maxLength: 100
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'E-mail',
                    name: 'guardianEmail',
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 100,
                    vtype: 'email'
                }
            ]
        },
        {
            xtype: 'form',
            border: false,
            height: 170,
            margin: '15 0 10 0',
            ui: 'defpanel',
            defaults: {
                anchor: '0',
                labelAlign: 'top',
                labelSeparator: ''
            },
            bodyPadding: '10 0 10 0',
            title: 'Identificação de Estrangeiros',
            items: [
                {
                    xtype: 'textfield',
                    cls: 'k-input',
                    fieldLabel: 'País',
                    labelWidth: 105,
                    name: 'country',
                    enforceMaxLength: true,
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    cls: 'k-input',
                    fieldLabel: 'Passaporte',
                    labelWidth: 105,
                    name: 'passport',
                    enforceMaxLength: true,
                    maxLength: 20
                }
            ]
        },
        {
            xtype: 'form',
            border: false,
            height: 170,
            margin: '15 0 10 0',
            ui: 'defpanel',
            defaults: {
                anchor: '0',
                labelAlign: 'top',
                labelSeparator: ''
            },
            bodyPadding: '10 0 10 0',
            title: 'Outras informações adicionais',
            items: [
                {
                    xtype: 'textfield',
                    cls: 'k-input',
                    fieldLabel: 'Indicado por',
                    labelWidth: 105,
                    name: 'indicated',
                    enforceMaxLength: true,
                    maxLength: 100
                },
                {
                    xtype: 'datefield',
                    cls: 'k-input',
                    fieldLabel: 'Primeira consulta',
                    labelWidth: 105,
                    name: 'firstConsultation',
                    format: 'd/m/Y',
                    submitFormat: 'Y/m/d'
                }
            ]
        }
    ]

});