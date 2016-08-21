/*
 * File: app/model/ClientInsurances.js
 */

Ext.define('skyclinic.model.ClientInsurances', {
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
            type: 'int',
            name: 'insuranceOperator'
        },
        {
            type: 'string',
            name: 'insuranceNumber'
        },
        {
            type: 'string',
            name: 'description'
        },
        {
            type: 'string',
            name: 'insuranceNotes'
        },
        {
            type: 'int',
            name: 'state'
        }
    ]
});