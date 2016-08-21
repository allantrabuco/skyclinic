/*
 * File: app/view/Clients.js
 */

Ext.define('skyclinic.view.Clients', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.clients',

    requires: [
        'skyclinic.view.ClientsTab',
        'Ext.tab.Panel'
    ],

    cls: 'item-body',
    ui: 'itempanel',
    layout: 'fit',
    bodyPadding: '0 10 0 40',
    title: 'Pacientes',

    items: [
        {
            xtype: 'clientstab'
        }
    ]

});