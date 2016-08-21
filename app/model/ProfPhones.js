/*
 * File: app/model/ProfPhones.js
 */

Ext.define('skyclinic.model.ProfPhones', {
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
            name: 'profId'
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