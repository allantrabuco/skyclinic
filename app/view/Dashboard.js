/*
 * File: app/view/Dashboard.js
 */

Ext.define('skyclinic.view.Dashboard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dashboard',

    requires: [
        'skyclinic.view.DashboardViewModel',
        'skyclinic.view.ChartExamplesEx',
        'skyclinic.view.ChartExamples1',
        'Ext.panel.Panel'
    ],

    viewModel: {
        type: 'dashboard'
    },
    cls: 'item-body',
    scrollable: true,
    ui: 'itempanel',
    title: 'Painel',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'chartexamplesex'
        },
        {
            xtype: 'chartexamplesex1'
        }
    ]

});