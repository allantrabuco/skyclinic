/*
 * File: app/model/MobileOperator.js
 */

Ext.define('skyclinic.model.MobileOperator', {
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