/*
 * File: app/view/Diary.js
 */

Ext.define('skyclinic.view.Diary', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.diary',

    requires: [
        'skyclinic.view.DiaryViewModel',
        'skyclinic.view.Calendar',
        'Ext.panel.Panel'
    ],

    viewModel: {
        type: 'diary'
    },
    cls: 'item-body',
    ui: 'itempanel',
    layout: 'fit',
    bodyPadding: '0 10 5 40',
    title: 'Agenda',

    items: [
        {
            xtype: 'calendar',
            header: false
        }
    ]

});