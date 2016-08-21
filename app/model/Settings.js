/*
 * File: app/model/Settings.js
 */

Ext.define('skyclinic.model.Settings', {
    extend: 'Ext.data.Model',
    alias: 'model.settings',

    requires: [
        'Ext.data.field.Integer',
        'Ext.data.field.String'
    ],

    fields: [
        {
            type: 'int',
            name: 'environment'
        },
        {
            type: 'string',
            name: 'serverD'
        },
        {
            type: 'string',
            name: 'serverH'
        },
        {
            type: 'string',
            name: 'serverP'
        }
    ]
});