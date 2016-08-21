/*
 * File: app/controller/ClientsPhonesForm.js
 */

Ext.define('skyclinic.controller.ClientsPhonesForm', {
    extend: 'Ext.app.Controller',

    control: {
        "clientsphonesform radiogroup[name=phoneTypeGroup]": {
            change: 'onPhoneTypeChange'
        },
        "clientsphonesform [group=clientPhones]": {
            change: 'onPhonesChange'
        },
        "clientsphonesform button[action=cleanPhone]": {
            click: 'onCleanClientPhone'
        },
        "clientsphonesform button[action=addPhone]": {
            click: 'doAddClientPhone'
        }
    },

    onPhoneTypeChange: function(field, newValue, oldValue, eOpts) {
        var me = this,
            cmp = field,
            phoneOperator = cmp.up('clientsphonesform').down('combo[name=phoneOperator]'),
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
            formPanel = cmp.up('clientsphonesform'),
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

    onCleanClientPhone: function(button, e, eOpts) {
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

    doAddClientPhone: function(button, e, eOpts) {
        var me = this,
            btn = button,

            ctrlGlobal = me.getController('Global'),

            formPanel = btn.up('form'),
            form = formPanel.getForm(),
            grid = formPanel.down('clientsphonesgrid'),
            store = grid.getStore(),
            clientId = formPanel.up('clientsinformationform').down('button[action=save]').recordId,
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
                    clientId: clientId,
                    action: btn.getText(),
                    id: btn.recordId,
                    info: Ext.JSON.encode(dirtyFields),
                    tbl: 'clientPhones'
                },
                scope: me,
                url: ctrlGlobal.server + '/clients/addPhone'
            });

        } else {
            ctrlGlobal.message('Não foram feitas alterações!', 'w');
        }
    }

});
