/*
 * File: app/view/BodyFooter.js
 */

Ext.define('skyclinic.view.BodyFooter', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bodyfooter',

    requires: [
        'skyclinic.view.BodyFooterViewModel',
        'Ext.form.Label',
        'Ext.container.Container',
        'Ext.form.field.ComboBox'
    ],

    viewModel: {
        type: 'bodyfooter'
    },
    cls: 'toolbar-border-top',
    height: 35,
    ui: 'containerbgcolor',
    bodyPadding: '0 10 0 10',

    layout: {
        type: 'hbox',
        align: 'middle'
    },
    items: [
        {
            xtype: 'label',
            cls: 'footer-copyright',
            text: '© 2015 SkyClinic Software'
        },
        {
            xtype: 'container',
            flex: 1
        },
        {
            xtype: 'combobox',
            flex: 1,
            focusOnToFront: false,
            cls: 'footer-combo',
            height: 16,
            margin: '0 5 0 0',
            maxHeight: 16,
            minHeight: 16,
            ui: 'footercombo',
            name: 'cmbMessages',
            fieldStyle: 'text-align:right;',
            anyMatch: true,
            displayField: 'msgText',
            queryMode: 'local',
            store: 'Messages',
            valueField: 'msgText'
        }
    ]

});