/*
 * File: app/controller/SettingsProceduresGrid.js
 */

Ext.define('skyclinic.controller.SettingsProceduresGrid', {
    extend: 'Ext.app.Controller',

    control: {
        "settingsproceduresgrid": {
            canceledit: 'onRowEditingCanceledit',
            validateedit: 'onRowEditingValidateedit',
            afterrender: 'onSettingsProceduresGridAfterRender'
        }
    },

    onRowEditingCanceledit: function(editor, context, eOpts) {
        var me = this,
            ed = editor,
            ctxt = context;

        if (ctxt.record.data.demand_reason_id === 0) {
            ctxt.store.removeAt(ctxt.rowIdx);
        }
    },

    onRowEditingValidateedit: function(editor, context, eOpts) {
        var me = this,
            ed = editor,
            ctxt = context,
            view = ctxt.view,
            grid = view.up(),
            store = ctxt.store,
            data = ctxt.newValues,
            fieldsOutForm = [],
            parameters = [],
            state = null,
            ctrlGlobal = me.getController('Global'),

            username = me.getController('BodyHeader').getMainRef().down('button[action=username]'),

            callback = function() {
                store.load();
            };


        if (data.state === 'true' || data.state || data.state === 'Y' ) state = 1; else state = 0;

        if (ctxt.record.data.reference === 0 || ctxt.record.data.reference === -1) {
            parameters.push({acton:'insert'});
            fieldsOutForm.push({field:'userAdd', value:username.userId});
        } else {
            parameters.push({'action':'update'});
        }

        parameters.push({'tbl':'settProcedures'});

        fieldsOutForm.push({field:'description', value:data.description});
        fieldsOutForm.push({field:'duration', value:data.duration});
        fieldsOutForm.push({field:'cost', value:data.cost});
        fieldsOutForm.push({field:'state', value:state});
        fieldsOutForm.push({field:'userChange', value:username.userId});

        ctrlGlobal.saveRecord(me, grid, store, 'reference', ctxt.record.data.reference, null, null, null, null, callback, fieldsOutForm, parameters);
    },

    onSettingsProceduresGridAfterRender: function(component, eOpts) {
        var me = this,
            cmp = component,
            items = cmp.query('pagingtoolbar')[0].items.items;

        Ext.Array.each(items, function(item, indx) {
            if (indx < 10) item.setVisible(false);
        });
    }

});
