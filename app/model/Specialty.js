/*
 * File: app/model/Specialty.js
 */

Ext.define('skyclinic.model.Specialty', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Integer',
        'Ext.data.field.String'
    ],

    fields: [
        {
            type: 'int',
            name: 'reference'
        },
        {
            type: 'string',
            name: 'description'
        },
        {
            type: 'int',
            name: 'state'
        }
    ]
});