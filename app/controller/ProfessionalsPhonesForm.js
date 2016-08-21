/*
 * File: app/controller/ProfessionalsPhonesForm.js
 */

Ext.define('skyclinic.controller.ProfessionalsPhonesForm', {
    extend: 'Ext.app.Controller',

    control: {
        "professionalsphonesform radiogroup[name=phoneTypeGroup]": {
            change: 'onPhoneTypeChange'
        },
        "professionalsphonesform [group=professionalPhones]": {
            change: 'onPhonesChange'
        },
        "professionalsphonesform button[action=cleanPhone]": {
            click: 'onCleanProfessionalPhone'
        },
        "professionalsphonesform button[action=addPhone]": {
            click: 'doAddProfessionalPhone'
        }
    },

    onPhoneTypeChange: function(field, newValue, oldValue, eOpts) {
        var me = this,
            cmp = field,
            phoneOperator = cmp.up('professionalsphonesform').down('combo[name=phoneOperator]'),
            value = parseInt(newValue.phoneType, 10);

        if (value === 1) {
            phoneOperator.setDisabled(true);
            phoneOperator.reset();
        } else if (value === 2) {
            phoneOperator.setDisabled(false);
        }

    },

    onPhonesChange: function(field, newValue, oldValue, eOpts) {
        var me = this,
            cmp = field,
            formPanel = cmp.up('professionalsphonesform'),
            radioGroup = formPanel.down('radiogroup'),
            phoneNumber = formPanel.down('textfield[name=phoneNumber]'),
            addBtn = formPanel.down('button[action=addPhone]'),
            cleanBtn = formPanel.down('button[action=cleanPhone]');

        if ((radioGroup.items.items[0].value || radioGroup.items.items[1].value) && (phoneNumber.getValue().length > 0)) {
            addBtn.setDisabled(false);
        } else {
            addBtn.setDisabled(true);

            if (radioGroup.items.items[0].value || radioGroup.items.items[1].value || phoneNumber.getValue().length > 0) {
                cleanBtn.setDisabled(false);
            }
        }

    },

    onCleanProfessionalPhone: function(button, e, eOpts) {
        var me = this,
            btn = button,
            addBtn = btn.up().down('button[action=addPhone]'),
            formPanel = btn.up('form'),
            form = formPanel.getForm();

        btn.setDisabled(false);
        addBtn.setText('Adicionar');
        addBtn.recordId = -1;

        form.reset();
        formPanel.down('combo').focus(true);

    },

    doAddProfessionalPhone: function(button, e, eOpts) {
        var me = this,
            btn = button,

            ctrlGlobal = me.getController('Global'),

            formPanel = btn.up('form'),
            form = formPanel.getForm(),
            grid = formPanel.down('professionalsphonesgrid'),
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
                                        ctrlGlobal.message('Telefone adicionado com sucesso!', 'i');
                                        form.reset();
                                    }
                                });
                            } else {
                                store.load({
                                    scope: me,
                                    callback: function(records, operation, success) {
                                        ctrlGlobal.message('Telefone alterado com sucesso!', 'i');
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
                    tbl: 'profPhones'
                },
                scope: me,
                url: ctrlGlobal.server + '/professionals/addPhone'
            });

        } else {
            ctrlGlobal.message('Não foram feitas alterações!', 'w');
        }
    }

});
