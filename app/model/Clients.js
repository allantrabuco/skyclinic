/*
 * File: app/model/Clients.js
 */

Ext.define('skyclinic.model.Clients', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Date'
    ],

    fields: [
        {
            type: 'int',
            name: 'clientId'
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
            name: 'occupation'
        },
        {
            type: 'string',
            name: 'schooling'
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
            name: 'mother'
        },
        {
            type: 'string',
            name: 'motherEmail'
        },
        {
            type: 'string',
            name: 'father'
        },
        {
            type: 'string',
            name: 'fatherEmail'
        },
        {
            type: 'string',
            name: 'guardian'
        },
        {
            type: 'string',
            name: 'guardianEmail'
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
            name: 'indicated'
        },
        {
            type: 'date',
            name: 'firstConsultation'
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
            name: 'profAssigned'
        },
        {
            type: 'int',
            name: 'state'
        },
        {
            type: 'string',
            name: 'photo'
        }
    ],

    hasMany: [
        {
            model: 'skyclinic.model.ClientPhones',
            name: 'clientPhones',
            foreignKey: 'clientId'
        },
        {
            model: 'skyclinic.model.ClientInsurances',
            name: 'clientInsurances',
            foreignKey: 'clientId'
        }
    ]
});