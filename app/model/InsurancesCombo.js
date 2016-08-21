/*
 * File: app/model/InsurancesCombo.js
 */

Ext.define('skyclinic.model.InsurancesCombo', {
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
            type: 'string',
            name: 'dispDescription'
        },
        {
            type: 'int',
            name: 'state'
        }
    ]
});