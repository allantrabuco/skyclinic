/*
 * File: app/model/Procedure.js
 */

Ext.define('skyclinic.model.Procedure', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.String',
        'Ext.data.field.Number'
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
        },
        {
            type: 'int',
            name: 'duration'
        },
        {
            type: 'float',
            convert: function(v, rec) {
                rec.data.costFormatted = Ext.util.Format.brMoney(v, 'R$ ', 2);
                return v;
            },
            name: 'cost'
        },
        {
            type: 'string',
            name: 'costFormatted'
        }
    ]
});