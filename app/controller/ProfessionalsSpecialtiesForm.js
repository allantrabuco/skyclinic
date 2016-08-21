/*
 * File: app/controller/ProfessionalsSpecialtiesForm.js
 */

Ext.define('skyclinic.controller.ProfessionalsSpecialtiesForm', {
    extend: 'Ext.app.Controller',

    control: {
        "professionalsspecialtiesform [group=professionalSpecialty]": {
            change: 'onSpecialtyChange'
        },
        "professionalsspecialtiesform button[action=cleanSpecialty]": {
            click: 'onCleanProfessionalSpecialty'
        },
        "professionalsspecialtiesform button[action=addSpecialty]": {
            click: 'doAddProfessionalSpecialty'
        },
        "professionalsspecialtiesform button[action=addMore]": {
            click: 'doAddSettSpecialty'
        }
    },

    onSpecialtyChange: function(field, newValue, oldValue, eOpts) {
        var me = this,
            cmp = field,
            formPanel = cmp.up('professionalsspecialtiesform'),
            container = formPanel.up().down('container'),
            addBtn = formPanel.down('button[action=addSpecialty]'),
            cleanBtn = formPanel.down('button[action=cleanSpecialty]'),
            value = newValue,
            out = false;

        if (Ext.isEmpty(cmp.getValue())) {
            addBtn.setDisabled(true);
            cleanBtn.setDisabled(true);
        } else {
            addBtn.setDisabled(false);
            cleanBtn.setDisabled(false);
        }

    },

    onCleanProfessionalSpecialty: function(button, e, eOpts) {
        var me = this,
            btn = button,
            addBtn = btn.up().down('button[action=addSpecialty]'),
            formPanel = btn.up('form'),
            form = formPanel.getForm();

        btn.setDisabled(false);
        addBtn.setText('Adicionar');
        addBtn.recordId = -1;

        form.reset();
        formPanel.down('combo').focus(true);

    },

    doAddProfessionalSpecialty: function(button, e, eOpts) {
        var me = this,
            btn = button,

            ctrlGlobal = me.getController('Global'),

            formPanel = btn.up('form'),
            form = formPanel.getForm(),
            grid = formPanel.down('professionalsspecialtiesgrid'),
            store = grid.getStore(),
            profId = formPanel.up('professionalsinformationform').down('button[action=save]').recordId,
            dirtyFields = {};

        if (form.isDirty()) {
            dirtyFields = ctrlGlobal.dirtyFields(form);

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
                            var decoded = Ext.decode(response.responseText),
                                index = 0;

                            if (btn.getText() === 'Adicionar') {
                                store.load({
                                    scope: me,
                                    callback: function(records, operation, success) {
                                        ctrlGlobal.message('Especialidade adicionada com sucesso!', 'i');
                                        form.reset();
                                    }
                                });
                            } else {
                                store.load({
                                    scope: me,
                                    callback: function(records, operation, success) {
                                        ctrlGlobal.message('Especialidade adicionada com sucesso!', 'i');
                                        btn.setText('Adicionar');
                                        form.reset();
                                    }
                                });
                            }
                        }
                    } else {
                        Ext.MessageBox.alert('Warning', 'Lost connection to the server!');
                    }
                },
                params: {
                    profId: profId,
                    action: btn.getText(),
                    id: btn.recordId,
                    info: Ext.JSON.encode(dirtyFields),
                    tbl: 'clientInsurances'
                },
                scope: me,
                url: ctrlGlobal.server + '/professionals/addSpecialty'
            });

        } else {
            ctrlGlobal.message('Não foram feitas alterações!', 'w');
        }
    },

    doAddSettSpecialty: function(button, e, eOpts) {
        var me = this,
            btn = button,

            myviewport = me.getController('BodyHeader').getMainRef().up('myviewport'),

            height = myviewport.getHeight() - 50,
            width = myviewport.getWidth() - 100,

            win = me.application.getView('WinAux').create({bodyPadding:'0 0 0 10'}),
            grid = {};

        win.add(me.application.getView('SettingsSpecialtiesList').create());
        win.setTitle('Configurações: Especialidades');
        win.down('settingsspecialtieslist').setTitle();
        grid = win.down('settingsspecialtiesgrid');
        grid.getStore().load();

        win.setHeight(height);
        win.setWidth(width);
        win.show();

        //grid.columns[5].setVisible(true);

        win.doLayout();
        //win.form = btn.up('dimhumansresourcesform');
        //win.field = 'rrt_resource_type_id';
    }

});
