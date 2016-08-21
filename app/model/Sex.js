/*
 * File: app/model/Sex.js
 */

Ext.define('skyclinic.model.Sex', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.String'
    ],

    fields: [
        {
            type: 'string',
            name: 'id'
        },
        {
            type: 'string',
            name: 'field'
        }
    ]
});