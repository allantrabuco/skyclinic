/*
 * File: app/view/BodyHeader.js
 */

Ext.define('skyclinic.view.BodyHeader', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bodyheader',

    requires: [
        'skyclinic.view.BodyHeaderViewModel',
        'Ext.Img',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.menu.Menu',
        'Ext.menu.Item'
    ],

    viewModel: {
        type: 'bodyheader'
    },
    height: 45,
    ui: 'containerbgcolor',
    bodyPadding: '0 10 0 10',

    layout: {
        type: 'hbox',
        align: 'middle'
    },
    items: [
        {
            xtype: 'image',
            flex: 1,
            height: 15,
            hidden: true,
            margin: '0 10 0 0',
            maxWidth: 20,
            width: 20
        },
        {
            xtype: 'label',
            cls: 'header-title',
            html: '<i class="fa fa-cloud"></i> SkyClinic'
        },
        {
            xtype: 'container',
            flex: 1
        },
        {
            xtype: 'container',
            flex: 1,
            height: 16,
            hidden: true,
            html: '<i class="fa fa-envelope"></i>',
            margin: '0 20 0 0',
            maxWidth: 16
        },
        {
            xtype: 'container',
            flex: 1,
            height: 16,
            hidden: true,
            html: '<i class="fa fa-bell"></i>',
            margin: '0 20 0 0',
            maxWidth: 16
        },
        {
            xtype: 'button',
            action: 'username',
            cls: 'header-username',
            width: 200,
            text: 'username',
            textAlign: 'left',
            menu: {
                xtype: 'menu',
                width: 120,
                items: [
                    {
                        xtype: 'menuitem',
                        hidden: true,
                        iconCls: 'fa-user',
                        text: 'Perfil',
                        focusable: true
                    },
                    {
                        xtype: 'menuitem',
                        hidden: true,
                        iconCls: 'fa-cog',
                        text: 'Configurações',
                        focusable: true
                    },
                    {
                        xtype: 'menuitem',
                        action: 'logout',
                        iconCls: 'fa-power-off',
                        text: 'Sair',
                        focusable: true
                    }
                ]
            }
        }
    ]

});