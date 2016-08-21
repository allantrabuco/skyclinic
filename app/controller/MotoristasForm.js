/*
 * File: app/controller/MotoristasForm.js
 */

Ext.define('skyclinic.controller.MotoristasForm', {
    extend: 'Ext.app.Controller',

    control: {
        "motoristas button[action=add]": {
            click: 'onAddButtonClick'
        },
        "motoristasform button[action=cancel]": {
            click: 'onCancelButtonClick'
        },
        "motoristasform button[action=save]": {
            click: 'onSaveButtonClick'
        }
    },

    onAddButtonClick: function(button, e, eOpts) {
        var me = this,
            addBtn = button,

            ctrlGlobal = me.getController('Global'),
            xtypeMain = me.$className.split('.')[2].replace('Form','').toLowerCase(),


            tabPanel = addBtn.up(xtypeMain+'tab'),
            formPanel = tabPanel.down(xtypeMain+'form'),

            grid = tabPanel.down(xtypeMain+'grid'),

            savBtn = formPanel.down('button[action=save]'),
            canBtn = formPanel.down('button[action=cancel]'),

            store = grid.getStore(),

            callback = function() {
                formPanel.down('checkbox[name=flg_ativo_motorista_sam]').setValue(1);
                formPanel.down('textfield[name=cpf_motorista_sam]').setReadOnly(false);
            };

        ctrlGlobal.addRecord(me, addBtn, store, 'Formulário', xtypeMain+'tab', xtypeMain+'form', callback);
    },

    onCancelButtonClick: function(button, e, eOpts) {
        var me = this,
            canBtn = button,

            ctrlGlobal = me.getController('Global'),
            xtypeMain = me.$className.split('.')[2].replace('Form','').toLowerCase(),

            tabPanel = canBtn.up(xtypeMain+'tab'),
            formPanel = tabPanel.down(xtypeMain+'form'),

            grid = tabPanel.down(xtypeMain+'grid'),

            addBtn = formPanel.down('button[action=add]'),
            savBtn = formPanel.down('button[action=save]'),

            store = grid.getStore(),

            callback = function() {
                formPanel.down('textfield[name=cpf_motorista_sam]').setReadOnly(false);
            };

        ctrlGlobal.cancelOperation(me, addBtn, store, 'Listagem', xtypeMain+'tab', xtypeMain+'form', callback);
    },

    onSaveButtonClick: function(button, e, eOpts) {
        var me = this,
            savBtn = button,

            ctrlGlobal = me.getController('Global'),
            xtypeMain = me.$className.split('.')[2].replace('Form','').toLowerCase(),

            tabPanel = savBtn.up(xtypeMain+'tab'),
            formPanel = tabPanel.down(xtypeMain+'form'),

            grid = tabPanel.down(xtypeMain+'grid'),

            addBtn = formPanel.down('button[action=add]'),
            canBtn = formPanel.down('button[action=cancel]'),

            fieldsOutForm = [],
            //username = savBtn.up('myviewport').down('bodyheader').down('button[action=username]').username,

            store = grid.getStore(),

            callback = function() {
            };

        //fieldsOutForm.push({field:'system_user', value:username});
        ctrlGlobal.saveRecord(me, savBtn, store, 'demand_phase_id', savBtn.recordId, 'Listagem', xtypeMain+'tab', xtypeMain+'grid', xtypeMain+'form', callback, fieldsOutForm);

    }

});
