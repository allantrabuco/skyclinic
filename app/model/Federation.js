/*
 * File: app/model/Federation.js
 */

Ext.define('skyclinic.model.Federation', {
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