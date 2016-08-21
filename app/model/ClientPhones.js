/*
 * File: app/model/ClientPhones.js
 */

Ext.define('skyclinic.model.ClientPhones', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Integer',
        'Ext.data.field.String'
    ],

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'int',
            name: 'clientId'
        },
        {
            type: 'string',
            name: 'phoneNumber'
        },
        {
            type: 'int',
            name: 'phoneType'
        },
        {
            type: 'string',
            name: 'phoneOperator'
        },
        {
            type: 'string',
            name: 'phoneNotes'
        }
    ]
});