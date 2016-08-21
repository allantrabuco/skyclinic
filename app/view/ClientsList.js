/*
 * File: app/view/ClientsList.js
 */

Ext.define('skyclinic.view.ClientsList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.clientslist',

    requires: [
        'skyclinic.view.ClientsGrid',
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.toolbar.Toolbar',
        'Ext.grid.Panel'
    ],

    border: false,
    ui: 'defpanel',
    layout: 'border',
    bodyPadding: '0 10 0 0',
    title: 'Listagem',

    dockedItems: [
        {
            xtype: 'container',
            name: 'search',
            dock: 'top',
            margin: 10,
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'textfield',
                    flex: 1,
                    margin: '0 5 0 0',
                    fieldLabel: 'Pesquisa',
                    labelWidth: 60,
                    name: 'search',
                    emptyText: 'digite o texto que deseja pesquisar e clique na lupa ao lado, ou pressione ENTER',
                    enableKeyEvents: true
                },
                {
                    xtype: 'button',
                    action: 'search',
                    cls: 'searchIcon',
                    height: 25,
                    margin: '0 5 0 0',
                    ui: 'graybutton-small',
                    width: 30,
                    text: '<i class=\'fa fa-search\'></i>'
                },
                {
                    xtype: 'button',
                    action: 'clean',
                    cls: 'cleanIcon',
                    height: 25,
                    ui: 'graybutton-small',
                    width: 30,
                    text: '<i class=\'fa fa-eraser\'></i>'
                }
            ]
        },
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
                    text: 'Novo'
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'clientsgrid',
            region: 'center'
        }
    ]

});