/*
 * File: app/model/Advice.js
 */

Ext.define('skyclinic.model.Advice', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.String'
    ],

    fields: [
        {
            type: 'string',
            name: 'field'
        }
    ]
});