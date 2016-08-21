/*
 * File: app/model/ProfSpecialties.js
 */

Ext.define('skyclinic.model.ProfSpecialties', {
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
            name: 'description'
        },
        {
            type: 'int',
            name: 'state'
        }
    ]
});