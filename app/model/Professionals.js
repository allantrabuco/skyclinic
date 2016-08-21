/*
 * File: app/model/Professionals.js
 */

Ext.define('skyclinic.model.Professionals', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Date'
    ],

    fields: [
        {
            type: 'int',
            name: 'profId'
        },
        {
            type: 'string',
            name: 'fullname'
        },
        {
            type: 'date',
            name: 'birthday'
        },
        {
            type: 'string',
            name: 'sex'
        },
        {
            type: 'string',
            name: 'credential'
        },
        {
            type: 'string',
            name: 'credType'
        },
        {
            type: 'string',
            name: 'email'
        },
        {
            type: 'string',
            name: 'skype'
        },
        {
            type: 'string',
            name: 'federation'
        },
        {
            type: 'string',
            name: 'town'
        },
        {
            type: 'string',
            name: 'zipCode'
        },
        {
            type: 'string',
            name: 'address'
        },
        {
            type: 'string',
            name: 'complement'
        },
        {
            type: 'string',
            name: 'neighborhood'
        },
        {
            type: 'string',
            name: 'facebook'
        },
        {
            type: 'string',
            name: 'linkedin'
        },
        {
            type: 'string',
            name: 'obs'
        },
        {
            type: 'string',
            name: 'civilState'
        },
        {
            type: 'string',
            name: 'cpf'
        },
        {
            type: 'string',
            name: 'rg'
        },
        {
            type: 'string',
            name: 'rgIssuing'
        },
        {
            type: 'string',
            name: 'country'
        },
        {
            type: 'string',
            name: 'passport'
        },
        {
            type: 'string',
            name: 'userAdd'
        },
        {
            type: 'string',
            name: 'registeredIn'
        },
        {
            type: 'string',
            name: 'userChange'
        },
        {
            type: 'string',
            name: 'updatedIn'
        },
        {
            type: 'int',
            name: 'groupRef'
        },
        {
            type: 'int',
            name: 'status'
        },
        {
            type: 'string',
            name: 'photo'
        }
    ],

    hasMany: [
        {
            model: 'skyclinic.model.ProfPhones',
            name: 'profPhones',
            foreignKey: 'profId'
        },
        {
            model: 'skyclinic.model.ProfSpecialties',
            name: 'profSpecialties',
            foreignKey: 'profId'
        }
    ]
});