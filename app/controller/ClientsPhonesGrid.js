/*
 * File: app/controller/ClientsPhonesGrid.js
 */

Ext.define('skyclinic.controller.ClientsPhonesGrid', {
    extend: 'Ext.app.Controller',

    control: {
        "clientsphonesgrid": {
            afterrender: 'onClientsPhonesGridAfterRender'
        },
        "clientsphonesgrid actioncolumn[name=edit]": {
            click: 'onEditColumnClick'
        },
        "clientsphonesgrid actioncolumn[name=delete]": {
            click: 'onDeleteColumnClick'
        }
    },

    onClientsPhonesGridAfterRender: function(component, eOpts) {
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
            addBtn = formPanel.down('button[action=addPhone]'),
            cleanBtn = formPanel.down('button[action=cleanPhone]');

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
            ctrlGlobal = me.getController('Global'),
            data = record.data,
            phoneType = (parseInt(data.phoneType, 10) === 1?'fixo':'celular');

        Ext.MessageBox.show({
            title: 'Remover?',
            msg: 'Tem certeza que deseja remover o telefone ' + phoneType + '?<br/><br/><b>' + data.phoneNumber + '</b>',
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
                                            ctrlGlobal.message('Telefone removido com sucesso!', 'i');
                                            me.getController('ClientsPhonesForm').onCleanClientPhone(formPanel.down('button[action=cleanPhone]'));
                                        }
                                    });
                                }
                            } else {
                                Ext.MessageBox.alert('Warning', 'Lost connection to the server!');
                            }
                        },
                        params: {
                            clientId: data.clientId,
                            id: data.id,
                            tbl: 'clientPhones'
                        },
                        scope: me,
                        url: ctrlGlobal.server + '/clients/rmPhone'
                    });

                }
            }
        });

    },

    onClientPhonesStoreBeforeLoad: function(store, operation, eOpts) {
        var me = this,
            opr = operation,
            main = me.getController(me.$className.split('.')[2].replace('PhonesGrid','')).getMainRef(),
            clientId = main.down('clientsinformationform').down('button[action=save]').recordId,
            win = Ext.ComponentQuery.query('winaux[name=ClientsWin]')[0];

        if (!Ext.isEmpty(win)) clientId = win.down('clientsinformationform').down('button[action=save]').recordId;

        if (Ext.isEmpty(opr._params)) {
            opr._params = {clientId: clientId};
        } else {
            opr._params.clientId = clientId;
        }

    },

    onClientPhonesStoreLoad: function(self, records, successful, eOpts) {
        var me = this,
            recs = records,
            height = 0,
            main = me.getController(me.$className.split('.')[2].replace('PhonesGrid','')).getMainRef(),
            formPanel = main.down('clientsphonesform');

        height = (recs.length * 25) + 1 + 38 + 36 + 20; // 38 toolbar + 36 form title + 20 margin
        formPanel.setHeight(height);
        formPanel.doLayout();
    },

    init: function(application) {
        var me = this;
        me.getStore('ClientPhones').addListener('beforeload', me.onClientPhonesStoreBeforeLoad, me);
        me.getStore('ClientPhones').addListener('load', me.onClientPhonesStoreLoad, me);
    }

});
