/*
 * File: app/view/Login.js
 */

Ext.define('skyclinic.view.Login', {
    extend: 'Ext.form.Panel',
    alias: 'widget.login',

    requires: [
        'skyclinic.view.LoginViewModel',
        'Ext.toolbar.Toolbar',
        'Ext.Img',
        'Ext.form.field.Text',
        'Ext.form.FieldContainer',
        'Ext.button.Button',
        'Ext.form.field.Checkbox'
    ],

    viewModel: {
        type: 'login'
    },
    cls: 'login-center',
    height: 450,
    ui: 'loginform',
    width: 600,
    bodyPadding: '30 50 0 50',
    fieldDefaults: {
        labelAlign: 'top',
        labelSeparator: '',
        msgTarget: 'under'
    },

    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'center'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'top'
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            height: 117,
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'image',
                            height: 68,
                            width: 214,
                            src: './resources/images/skyclinic_green.png'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'bottom'
        }
    ],
    items: [
        {
            xtype: 'textfield',
            id: 'username',
            margin: '0 0 20 0',
            fieldLabel: 'Usuário',
            name: 'username',
            allowBlank: false,
            allowOnlyWhitespace: false,
            enableKeyEvents: true
        },
        {
            xtype: 'textfield',
            id: 'password',
            fieldLabel: 'Senha',
            name: 'password',
            inputType: 'password',
            allowBlank: false,
            allowOnlyWhitespace: false,
            enableKeyEvents: true
        },
        {
            xtype: 'fieldcontainer',
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'button',
                    action: 'entry',
                    formBind: true,
                    focusOnToFront: false,
                    height: 30,
                    margin: '0 10 0 0',
                    ui: 'greenbutton-small',
                    width: 100,
                    text: 'Entrar'
                },
                {
                    xtype: 'checkboxfield',
                    name: 'staySignedIn',
                    boxLabel: 'Lembrar-me'
                }
            ]
        }
    ]

});