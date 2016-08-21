/*
 * File: app/view/DiaryForm.js
 */

Ext.define('skyclinic.view.DiaryForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.diaryform',

    requires: [
        'skyclinic.view.DiaryFormViewModel',
        'Ext.form.field.Date',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'diaryform'
    },
    cls: 'background',
    ui: 'defpanel',
    bodyPadding: 15,
    header: false,
    title: 'My Form',
    fieldDefaults: {
        labelAlign: 'top',
        labelSeparator: '',
        msgTarget: 'side'
    },

    items: [
        {
            xtype: 'container',
            margin: '0 0 10 0',
            defaults: {
                labelAlign: 'top',
                labelSeparator: '',
                targetMsg: 'side'
            },
            layout: 'hbox',
            items: [
                {
                    xtype: 'datefield',
                    flex: 1,
                    fieldLabel: 'Data',
                    name: 'dateSchedule',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    enableKeyEvents: true,
                    format: 'd/m/Y'
                },
                {
                    xtype: 'combobox',
                    endTimeField: 'hora_fim_age',
                    startDateField: 'data_ini_age',
                    endDateField: 'data_fim_age',
                    flex: 1,
                    margin: '0 0 0 10',
                    fieldLabel: 'Hora',
                    name: 'timeSchedule',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 5,
                    anyMatch: true,
                    displayField: 'time',
                    queryMode: 'local',
                    store: 'TimesBeginCombo',
                    valueField: 'time'
                }
            ]
        },
        {
            xtype: 'container',
            margin: '0 0 10 0',
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
                    tpl: '<tpl for="."><tpl if="state == \'0\'"><div class="x-boundlist-item k-inactive">{fullname}</div><tpl else><div class="x-boundlist-item">{fullname}</div></tpl></tpl>',
                    flex: 1,
                    cls: 'k-input',
                    fieldLabel: 'Paciente',
                    labelWidth: 105,
                    name: 'client',
                    enableKeyEvents: true,
                    anyMatch: true,
                    displayField: 'fullname',
                    forceSelection: true,
                    queryMode: 'local',
                    store: 'DiaryClientsCombo',
                    valueField: 'clientId'
                },
                {
                    xtype: 'button',
                    action: 'addMoreClient',
                    flex: 1,
                    height: 24,
                    margin: '27 0 0 5',
                    maxWidth: 30,
                    ui: 'graybutton-small',
                    width: 30,
                    text: '<i class=\'fa fa-plus\'></i>',
                    tooltip: 'Adicionar/Alterar pacientes'
                }
            ]
        },
        {
            xtype: 'container',
            margin: '0 0 10 0',
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
                    tpl: '<tpl for="."><tpl if="state == \'0\'"><div class="x-boundlist-item k-inactive">{description} : {insuranceNumber}</div><tpl else><div class="x-boundlist-item">{description} : {insuranceNumber}</div></tpl></tpl>',
                    flex: 1,
                    cls: 'k-input',
                    disabled: true,
                    fieldLabel: 'Convênio',
                    labelWidth: 105,
                    name: 'insuranceOperator',
                    enableKeyEvents: true,
                    anyMatch: true,
                    displayField: 'description',
                    forceSelection: true,
                    queryMode: 'local',
                    store: 'DiaryClientInsurancesCombo',
                    valueField: 'id'
                },
                {
                    xtype: 'textfield',
                    flex: 1,
                    cls: 'k-input',
                    margin: '0 0 0 10',
                    fieldLabel: 'Número',
                    labelWidth: 105,
                    name: 'insuranceNumber',
                    readOnly: true,
                    enforceMaxLength: true,
                    maxLength: 45
                }
            ]
        },
        {
            xtype: 'container',
            margin: '0 0 10 0',
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
                    tpl: '<tpl for="."><tpl if="state == \'0\'"><div class="x-boundlist-item k-inactive">{description} | {duration} minutos | {costFormatted}</div><tpl else><div class="x-boundlist-item">{description} | {duration} minutos | {costFormatted}</div></tpl></tpl>',
                    flex: 1,
                    cls: 'k-input',
                    fieldLabel: 'Procedimento',
                    labelWidth: 105,
                    name: 'procedure',
                    enableKeyEvents: true,
                    anyMatch: true,
                    displayField: 'description',
                    forceSelection: true,
                    queryMode: 'local',
                    store: 'DiarySettProceduresCombo',
                    valueField: 'reference'
                },
                {
                    xtype: 'textfield',
                    flex: 1,
                    cls: 'k-input',
                    margin: '0 0 0 10',
                    fieldLabel: 'Duração (minutos)',
                    labelWidth: 105,
                    name: 'duration',
                    readOnly: true,
                    enforceMaxLength: true,
                    maxLength: 45
                },
                {
                    xtype: 'textfield',
                    flex: 1,
                    cls: 'k-input',
                    margin: '0 0 0 10',
                    fieldLabel: 'Valor',
                    labelWidth: 105,
                    name: 'costFormatted',
                    readOnly: true,
                    enforceMaxLength: true,
                    maxLength: 45
                },
                {
                    xtype: 'textfield',
                    flex: 1,
                    cls: 'k-input',
                    hidden: true,
                    fieldLabel: 'Total de Sessões',
                    labelWidth: 105,
                    name: 'packTotal',
                    readOnly: true,
                    enforceMaxLength: true,
                    maxLength: 45
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'right',
            ui: 'bodytoolbar',
            items: [
                {
                    xtype: 'button',
                    action: 'save',
                    recordId: 0,
                    disabled: true,
                    height: 30,
                    ui: 'greenbutton-small',
                    width: 80,
                    text: 'Confirmar'
                },
                {
                    xtype: 'button',
                    action: 'cancel',
                    height: 30,
                    ui: 'redbutton-small',
                    width: 80,
                    text: 'Cancelar'
                }
            ]
        }
    ]

});