/*
 * File: app/model/Agendamento.js
 */

Ext.define('skyclinic.model.Agendamento', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.String',
        'Ext.data.field.Integer'
    ],

    fields: [
        {
            type: 'string',
            name: 'data_ini_age'
        },
        {
            type: 'string',
            name: 'num_nota_fiscal_age'
        },
        {
            type: 'string',
            name: 'flg_reserva_age'
        },
        {
            type: 'string',
            name: 'cnpj_fornecedor_saf'
        },
        {
            type: 'string',
            name: 'cnpj_transportadora_sat'
        },
        {
            type: 'string',
            name: 'renavam_caminhao_sac'
        },
        {
            type: 'string',
            name: 'cpf_motorista_sam'
        },
        {
            type: 'string',
            name: 'serie_nota_fiscal_age'
        },
        {
            type: 'string',
            name: 'data_fim_age'
        },
        {
            type: 'int',
            name: 'id_reserva_age'
        },
        {
            type: 'string',
            name: 'endereco_age'
        }
    ]
});