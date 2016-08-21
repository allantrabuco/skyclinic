/*
 * File: app/model/Message.js
 */

Ext.define('skyclinic.model.Message', {
    extend: 'Ext.data.Model',
    alias: 'model.message',

    requires: [
        'Ext.data.field.String'
    ],

    fields: [
        {
            type: 'string',
            name: 'msgText'
        }
    ]
});