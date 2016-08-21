/*
 * File: app/model/CivilState.js
 */

Ext.define('skyclinic.model.CivilState', {
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