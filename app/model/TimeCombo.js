/*
 * File: app/model/TimeCombo.js
 */

Ext.define('skyclinic.model.TimeCombo', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.String'
    ],

    fields: [
        {
            type: 'string',
            name: 'time'
        }
    ]
});