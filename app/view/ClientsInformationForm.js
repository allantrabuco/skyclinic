/*
 * File: app/view/ClientsInformationForm.js
 */

Ext.define('skyclinic.view.ClientsInformationForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.clientsinformationform',

    requires: [
        'skyclinic.view.ClientsInsurancesForm',
        'skyclinic.view.ClientsPhonesForm',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.form.Panel',
        'Ext.form.field.Number',
        'Ext.form.field.Date',
        'Ext.form.field.ComboBox',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.Img',
        'Ext.form.field.File',
        'Ext.form.field.FileButton',
        'Ext.form.field.HtmlEditor'
    ],

    cls: 'background',
    scrollable: true,
    ui: 'defpanel',
    defaults: {
        anchor: '0',
        labelAlign: 'right'
    },
    bodyPadding: 15,
    title: 'Informações Principais',
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
                    recordId: -1,
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
            height: 235,
            minHeight: 155,
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
                    height: 197,
                    margin: '0 10 0 0 ',
                    defaults: {
                        anchor: '0',
                        labelAlign: 'top',
                        labelSeparator: ''
                    },
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 75
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            cls: 'k-input',
                            disabled: true,
                            hidden: true,
                            fieldLabel: 'Reference',
                            labelWidth: 105,
                            name: 'clientId',
                            readOnly: true,
                            hideTrigger: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Nome completo',
                            name: 'fullname',
                            allowBlank: false,
                            allowOnlyWhitespace: false,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 100
                        },
                        {
                            xtype: 'container',
                            height: 60,
                            margin: '0 0 5 0',
                            defaults: {
                                anchor: '0',
                                labelAlign: 'top',
                                labelSeparator: ''
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    flex: 2,
                                    padding: '0 5 0 0',
                                    fieldLabel: 'Dt. Nasc.',
                                    labelWidth: 105,
                                    name: 'birthday',
                                    format: 'd/m/Y',
                                    submitFormat: 'Y/m/d'
                                },
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    cls: 'k-input',
                                    fieldLabel: 'Sexo',
                                    labelWidth: 105,
                                    name: 'sex',
                                    allowBlank: false,
                                    allowOnlyWhitespace: false,
                                    enableKeyEvents: true,
                                    anyMatch: true,
                                    displayField: 'field',
                                    forceSelection: true,
                                    queryMode: 'local',
                                    store: 'Sex',
                                    valueField: 'id'
                                },
                                {
                                    xtype: 'radiogroup',
                                    flex: 3,
                                    hidden: true,
                                    padding: '0 0 0 5',
                                    fieldLabel: 'Sexo',
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            name: 'sex',
                                            boxLabel: 'Masculino',
                                            inputValue: 'M'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            name: 'sex',
                                            boxLabel: 'Feminino',
                                            inputValue: 'F'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'E-mail',
                            name: 'email',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 100,
                            vtype: 'email'
                        },
                        {
                            xtype: 'textfield',
                            width: 150,
                            fieldLabel: 'Skype',
                            labelWidth: 105,
                            name: 'skype',
                            enforceMaxLength: true,
                            maxLength: 45
                        }
                    ]
                },
                {
                    xtype: 'form',
                    name: 'clientPhotoCIForm',
                    itemId: 'myform13',
                    maxWidth: 130,
                    minWidth: 130,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'image',
                            name: 'clientPhotoCI',
                            cls: 'k-photo-click',
                            height: 150,
                            itemId: 'myimg',
                            minWidth: 130,
                            width: 130,
                            src: './resources/images/camera.png'
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            hidden: true,
                            margin: 10,
                            defaults: {
                                labelAlign: 'top',
                                labelSeparator: ''
                            },
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    name: 'state',
                                    boxLabel: 'Ativo',
                                    checked: true,
                                    inputValue: '1',
                                    uncheckedValue: '1'
                                }
                            ]
                        },
                        {
                            xtype: 'filefield',
                            cls: 'k-camera-button',
                            margin: '2 0 0 0',
                            name: 'image',
                            regex: /^.*(\.jpg)|(\.jpeg)|(\.gif)|(\.jpe)|(\.png)$/i,
                            buttonOnly: true,
                            buttonText: '',
                            buttonConfig: {
                                xtype: 'filebutton',
                                hidden: true,
                                minWidth: 110,
                                width: 130,
                                text: 'Escolher imagem',
                                tooltip: 'Escolher imagem'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'clientsinsurancesform'
        },
        {
            xtype: 'clientsphonesform'
        },
        {
            xtype: 'form',
            border: false,
            height: 390,
            margin: '15 0 10 0',
            ui: 'defpanel',
            defaults: {
                anchor: '0',
                labelAlign: 'top',
                labelSeparator: ''
            },
            bodyPadding: '10 0 10 0',
            title: 'Endereço',
            items: [
                {
                    xtype: 'combobox',
                    cls: 'k-input',
                    fieldLabel: 'Estado',
                    labelWidth: 105,
                    name: 'federation',
                    enableKeyEvents: true,
                    anyMatch: true,
                    displayField: 'field',
                    forceSelection: true,
                    queryMode: 'local',
                    store: 'Federation',
                    valueField: 'field'
                },
                {
                    xtype: 'textfield',
                    cls: 'k-input',
                    fieldLabel: 'Cidade',
                    labelWidth: 105,
                    name: 'town',
                    enforceMaxLength: true,
                    maxLength: 45
                },
                {
                    xtype: 'textfield',
                    cls: 'k-input',
                    fieldLabel: 'CEP',
                    labelWidth: 105,
                    name: 'zipCode',
                    enforceMaxLength: true,
                    maxLength: 10
                },
                {
                    xtype: 'textfield',
                    cls: 'k-input',
                    fieldLabel: 'Endereço',
                    labelWidth: 105,
                    name: 'address',
                    enforceMaxLength: true,
                    maxLength: 100
                },
                {
                    xtype: 'textfield',
                    cls: 'k-input',
                    fieldLabel: 'Complemento',
                    labelWidth: 105,
                    name: 'complement',
                    enforceMaxLength: true,
                    maxLength: 45
                },
                {
                    xtype: 'textfield',
                    cls: 'k-input',
                    fieldLabel: 'Bairro',
                    labelWidth: 105,
                    name: 'neighborhood',
                    enforceMaxLength: true,
                    maxLength: 45
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
            title: 'Social Network',
            items: [
                {
                    xtype: 'textfield',
                    cls: 'k-input',
                    fieldLabel: 'Facebook',
                    labelWidth: 105,
                    name: 'facebook',
                    enforceMaxLength: true,
                    maxLength: 100
                },
                {
                    xtype: 'textfield',
                    cls: 'k-input',
                    fieldLabel: 'LinkedIn',
                    labelWidth: 105,
                    name: 'linkedin',
                    enforceMaxLength: true,
                    maxLength: 100
                }
            ]
        },
        {
            xtype: 'form',
            border: false,
            height: 200,
            margin: '15 0 10 0',
            ui: 'defpanel',
            defaults: {
                labelAlign: 'right',
                anchor: '0'
            },
            layout: 'fit',
            bodyPadding: '10 0 10 0',
            title: 'Observações',
            items: [
                {
                    xtype: 'htmleditor',
                    cls: 'k-input',
                    labelWidth: 105,
                    name: 'obs'
                }
            ]
        }
    ]

});