/*
 * File: app/view/MenuPanel.js
 */

Ext.define('skyclinic.view.MenuPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.menupanel',

    requires: [
        'skyclinic.view.MenuPanelViewModel',
        'Ext.panel.Panel',
        'Ext.button.Button'
    ],

    config: {
        name: 'menu'
    },

    viewModel: {
        type: 'menupanel'
    },
    cls: 'menu-panel',
    margin: 0,
    padding: 0,
    scrollable: true,
    ui: 'menupanel',
    width: 261,
    defaults: {
        margin: 0,
        padding: 0,
        anchor: '0'
    },
    animCollapse: true,
    bodyPadding: 0,
    collapsed: false,
    collapsible: true,
    headerPosition: 'right',
    hideCollapseTool: true,
    title: 'Menu',
    titleCollapse: true,

    items: [
        {
            xtype: 'panel',
            mnuItem: true,
            funcController: 'Dashboard',
            funcView: 'Dashboard',
            funcXtype: 'dashboard',
            cls: 'menu-group-item',
            ui: 'menu',
            animCollapse: true,
            collapsed: true,
            collapsible: true,
            hideCollapseTool: true,
            title: '<i class="fa fa-dashboard"></i>&nbsp;&nbsp;Painel',
            titleCollapse: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            }
        },
        {
            xtype: 'panel',
            mnuItem: true,
            funcController: 'Diary',
            funcView: 'Diary',
            funcXtype: 'diary',
            cls: 'menu-group-item',
            ui: 'menu',
            animCollapse: true,
            collapsed: true,
            collapsible: true,
            hideCollapseTool: true,
            title: '<i class="fa fa-calendar"></i>&nbsp;&nbsp;Agenda',
            titleCollapse: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            }
        },
        {
            xtype: 'panel',
            mnuItem: true,
            funcController: 'Clients',
            funcView: 'Clients',
            funcXtype: 'clients',
            cls: 'menu-group-item',
            ui: 'menu',
            animCollapse: true,
            collapsed: true,
            collapsible: true,
            hideCollapseTool: true,
            title: '<i class="fa fa-users"></i>&nbsp;&nbsp;Pacientes',
            titleCollapse: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            }
        },
        {
            xtype: 'panel',
            mnuItem: true,
            funcController: 'Professionals',
            funcView: 'Professionals',
            funcXtype: 'professionals',
            cls: 'menu-group-item',
            ui: 'menu',
            animCollapse: true,
            collapsed: true,
            collapsible: true,
            hideCollapseTool: true,
            title: '<i class="fa fa-user-md"></i>&nbsp;&nbsp;Profissionais da Saúde',
            titleCollapse: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            }
        },
        {
            xtype: 'panel',
            mnuItem: true,
            funcController: 'Settings',
            funcView: 'Settings',
            funcXtype: 'settings',
            cls: 'menu-group-item',
            ui: 'menu',
            animCollapse: true,
            collapsed: true,
            collapsible: true,
            hideCollapseTool: true,
            title: '<i class="fa fa-cogs"></i>&nbsp;&nbsp;Configurações',
            titleCollapse: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            }
        },
        {
            xtype: 'panel',
            group: true,
            cls: 'menu-group-item',
            hidden: true,
            ui: 'menu',
            animCollapse: true,
            collapsed: true,
            collapsible: true,
            title: '<i class="fa fa-edit"></i>&nbsp;&nbsp;Cadastros',
            titleCollapse: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'button',
                    funcController: 'Clients',
                    funcView: 'Clients',
                    funcXtype: 'clients',
                    border: '0 0 1 0',
                    height: 39,
                    ui: 'menubtnitem-small',
                    allowDepress: false,
                    enableToggle: true,
                    text: 'Clientes',
                    textAlign: 'left',
                    toggleGroup: 'menu'
                }
            ]
        },
        {
            xtype: 'panel',
            group: true,
            cls: 'menu-group-item',
            hidden: true,
            ui: 'menu',
            animCollapse: true,
            collapsed: true,
            collapsible: true,
            title: '<i class="fa fa-asterisk"></i>&nbsp;&nbsp;Outros',
            titleCollapse: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'button',
                    funcView: 'UnderConstruction',
                    funcXtype: 'underconstruction',
                    border: '0 0 1 0',
                    height: 39,
                    ui: 'menubtnitem-small',
                    allowDepress: false,
                    enableToggle: true,
                    text: 'Item 1',
                    textAlign: 'left',
                    toggleGroup: 'menu'
                },
                {
                    xtype: 'button',
                    funcView: 'UnderConstruction',
                    funcXtype: 'underconstruction',
                    border: '0 0 1 0',
                    height: 39,
                    ui: 'menubtnitem-small',
                    allowDepress: false,
                    enableToggle: true,
                    text: 'Item 2',
                    textAlign: 'left',
                    toggleGroup: 'menu'
                }
            ]
        },
        {
            xtype: 'button',
            action: 'depress',
            border: '0 0 1 0',
            height: 38,
            hidden: true,
            ui: 'menubtnitem-small',
            allowDepress: false,
            enableToggle: true,
            text: 'depress hidden button',
            textAlign: 'left',
            toggleGroup: 'menu'
        }
    ]

});