/*
 * File: app/view/ClientsTab.js
 */

Ext.define('skyclinic.view.ClientsTab', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.clientstab',

    requires: [
        'skyclinic.view.ClientsTabViewModel',
        'skyclinic.view.ClientsList',
        'skyclinic.view.ClientsInformationForm',
        'skyclinic.view.ClientsAdditionalForm',
        'Ext.tab.Tab',
        'Ext.form.Panel'
    ],

    viewModel: {
        type: 'clientstab'
    },
    cls: 'item-body-tab',
    activeTab: 0,

    items: [
        {
            xtype: 'clientslist'
        },
        {
            xtype: 'clientsinformationform',
            disabled: true
        },
        {
            xtype: 'clientsadditionalform',
            disabled: true
        }
    ]

});