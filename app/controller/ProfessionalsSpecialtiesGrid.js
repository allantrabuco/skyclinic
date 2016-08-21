/*
 * File: app/controller/ProfessionalsSpecialtiesGrid.js
 */

Ext.define('skyclinic.controller.ProfessionalsSpecialtiesGrid', {
    extend: 'Ext.app.Controller',

    control: {
        "professionalsspecialtiesgrid": {
            afterrender: 'onGridAfterRender'
        },
        "professionalsspecialtiesgrid actioncolumn[name=edit]": {
            click: 'onEditColumnClick'
        },
        "professionalsspecialtiesgrid actioncolumn[name=delete]": {
            click: 'onDeleteColumnClick'
        }
    },

    onGridAfterRender: function(component, eOpts) {
        var me = this,
            cmp = component,
            items = cmp.query('pagingtoolbar')[0].items.items;

        Ext.Array.each(items, function(item, indx) {
            if (indx < 10) item.setVisible(false);
        });
    },

    onEditColumnClick: function(view, self, rowIndex, colIndex, event, record) {
        var me = this,
            grid = view.up('grid'),
            formPanel = grid.up('form'),
            form = formPanel.getForm(),
            row = rowIndex,
            rec = record,
            addBtn = formPanel.down('button[action=addSpecialty]'),
            cleanBtn = formPanel.down('button[action=cleanSpecialty]');

        form.loadRecord(rec);

        addBtn.setText('Salvar');
        addBtn.recordId = rec.data.id;

    },

    onDeleteColumnClick: function(view, self, rowIndex, colIndex, event, record) {
        //view, self, rowIndex, colIndex, event, record
        var me = this,
            grid = view.up('grid'),
            formPanel = grid.up('form'),
            form = formPanel.getForm(),
            row = rowIndex,
            data = record.data,
            store = grid.getStore(),
            ctrlGlobal = me.getController('Global');

        Ext.MessageBox.show({
            title: 'Remover?',
            msg: 'Tem certeza que deseja remover a especialidade?<br/><br/><b>' + data.description + '</b>',
            buttons: Ext.Msg.YESNO,
            icon: Ext.MessageBox.QUESTION,
            fn: function(btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        callback: function(options, success, response) {
                            if (success) {
                                if (response.responseText === '#920139') {
                                    Ext.MessageBox.show({
                                        title: 'Aviso',
                                        msg: 'A conexão ao servidor foi encerrada! (' + response.responseText + ')<br/><br/>Clique no botão "Refresh" do navegador para recarregar a aplicação.',
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.MessageBox.INFO
                                    });
                                } else {
                                    store.load({
                                        scope: me,
                                        callback: function(records, operation, success) {
                                            ctrlGlobal.message('Especialidade removida com sucesso!', 'i');
                                            me.getController('ProfessionalsSpecialtiesForm').onCleanProfessionalSpecialty(formPanel.down('button[action=cleanSpecialty]'));
                                        }
                                    });
                                }
                            } else {
                                Ext.MessageBox.alert('Warning', 'Lost connection to the server!');
                            }
                        },
                        params: {
                            profId: data.profId,
                            id: data.id,
                            tbl: 'clientInsurances'
                        },
                        scope: me,
                        url: ctrlGlobal.server + '/professionals/rmSpecialty'
                    });

                }
            }
        });

    },

    onProfessionalSpecialtiesStoreBeforeLoad: function(store, operation, eOpts) {
        var me = this,
            opr = operation,
            main = me.getController(me.$className.split('.')[2].replace('SpecialtiesGrid','')).getMainRef(),
            profId = main.down('professionalsinformationform').down('button[action=save]').recordId;

        if (Ext.isEmpty(opr._params)) {
            opr._params = {profId: profId};
        } else {
            opr._params.profId = profId;
        }

    },

    onProfessionalSpecialtiesStoreLoad: function(self, records, successful, eOpts) {
        var me = this,
            recs = records,
            height = 0,
            main = me.getController(me.$className.split('.')[2].replace('SpecialtiesGrid','')).getMainRef(),
            formPanel = main.down('professionalsspecialtiesform');

        height = (recs.length * 25) + 1 + 38 + 36 + 20; // 38 toolbar + 36 form title + 20 margin
        formPanel.setHeight(height);
        formPanel.doLayout();
    },

    init: function(application) {
        var me = this;
        me.getStore('ProfessionalSpecialties').addListener('beforeload', me.onProfessionalSpecialtiesStoreBeforeLoad, me);
        me.getStore('ProfessionalSpecialties').addListener('load', me.onProfessionalSpecialtiesStoreLoad, me);
    }

});
