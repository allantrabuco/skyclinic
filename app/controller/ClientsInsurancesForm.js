/*
 * File: app/controller/ClientsInsurancesForm.js
 */

Ext.define('skyclinic.controller.ClientsInsurancesForm', {
    extend: 'Ext.app.Controller',

    control: {
        "clientsinsurancesform [group=clientInsurances]": {
            change: 'onInsuranceChange'
        },
        "clientsinsurancesform button[action=cleanInsurance]": {
            click: 'onCleanClientInsurance'
        },
        "clientsinsurancesform button[action=addInsurance]": {
            click: 'doAddClientInsurance'
        },
        "clientsinsurancesform button[action=addMore]": {
            click: 'doAddSettInsurance'
        }
    },

    onInsuranceChange: function(field, newValue, oldValue, eOpts) {
        var me = this,
            cmp = field,
            formPanel = cmp.up('clientsinsurancesform'),
            container = formPanel.up().down('container[name=clientInsurance]'),
            addBtn = formPanel.down('button[action=addInsurance]'),
            cleanBtn = formPanel.down('button[action=cleanInsurance]'),
            value = newValue,
            out = false;

        Ext.Array.each(container.items.items, function(obj, id) {
            if (obj.xtype === 'container') {
                Ext.Array.each(obj.items.items, function(objC, idC) {
                    if (objC.xtype === 'combobox') {
                        if (Ext.isEmpty(objC.getValue())) {
                            addBtn.setDisabled(true);
                            out = true;
                            return false;
                        } else {
                            addBtn.setDisabled(false);
                            cleanBtn.setDisabled(false);
                        }
                    }
                });
            } else if (obj.xtype === 'combobox' || obj.xtype === 'textfield') {
                if (Ext.isEmpty(obj.getValue())) {
                    addBtn.setDisabled(true);
                    out = true;
                    return false;
                } else {
                    addBtn.setDisabled(false);
                    cleanBtn.setDisabled(false);
                }
            }
            if (out) return false;
        });

    },

    onCleanClientInsurance: function(button, e, eOpts) {
        var me = this,
            btn = button,
            addBtn = btn.up().down('button[action=addInsurance]'),
            formPanel = btn.up('form'),
            form = formPanel.getForm();

        btn.setDisabled(false);
        addBtn.setText('Adicionar');
        addBtn.recordId = -1;

        form.reset();
        formPanel.down('combo').focus(true);

    },

    doAddClientInsurance: function(button, e, eOpts) {
        var me = this,
            btn = button,

            ctrlGlobal = me.getController('Global'),

            formPanel = btn.up('form'),
            form = formPanel.getForm(),
            grid = formPanel.down('clientsinsurancesgrid'),
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
                                        ctrlGlobal.message('Convênio adicionado com sucesso!', 'i');
                                        form.reset();
                                    }
                                });
                            } else {
                                store.load({
                                    scope: me,
                                    callback: function(records, operation, success) {
                                        ctrlGlobal.message('Convênio alterado com sucesso!', 'i');
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
                    tbl: 'clientInsurances'
                },
                scope: me,
                url: ctrlGlobal.server + '/clients/addInsurance'
            });

        } else {
            ctrlGlobal.message('Não foram feitas alterações!', 'w');
        }
    },

    doAddSettInsurance: function(button, e, eOpts) {
        var me = this,
            btn = button,

            myviewport = me.getController('BodyHeader').getMainRef().up('myviewport'),

            height = myviewport.getHeight() - 50,
            width = myviewport.getWidth() - 100,

            win = me.application.getView('WinAux').create({bodyPadding:'0 0 0 10'}),
            grid = {};

        win.add(me.application.getView('SettingsInsurancesList').create());
        win.setTitle('Configurações: Convênios');
        win.down('settingsinsuranceslist').setTitle();
        grid = win.down('settingsinsurancesgrid');
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
