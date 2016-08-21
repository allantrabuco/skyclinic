/*
 * File: app/model/Insurance.js
 */

Ext.define('skyclinic.model.Insurance', {
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