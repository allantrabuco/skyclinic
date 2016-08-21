/*
 * File: app/controller/ClientsInsurancesGrid.js
 */

Ext.define('skyclinic.controller.ClientsInsurancesGrid', {
    extend: 'Ext.app.Controller',

    control: {
        "clientsinsurancesgrid": {
            afterrender: 'onClientsInsurancesGridAfterRender'
        },
        "clientsinsurancesgrid actioncolumn[name=edit]": {
            click: 'onEditColumnClick'
        },
        "clientsinsurancesgrid actioncolumn[name=delete]": {
            click: 'onDeleteColumnClick'
        }
    },

    onClientsInsurancesGridAfterRender: function(component, eOpts) {
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
            addBtn = formPanel.down('button[action=addInsurance]'),
            cleanBtn = formPanel.down('button[action=cleanInsurance]');

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
            msg: 'Tem certeza que deseja remover o convênio?<br/><br/><b>' + data.description + ': ' + data.insuranceNumber + '</b>',
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
                                            ctrlGlobal.message('Convênio removido com sucesso!', 'i');
                                            me.getController('ClientsInsurancesForm').onCleanClientInsurance(formPanel.down('button[action=cleanInsurance]'));
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
                            tbl: 'clientInsurances'
                        },
                        scope: me,
                        url: ctrlGlobal.server + '/clients/rmInsurance'
                    });

                }
            }
        });

    },

    onClientInsurancesStoreBeforeLoad: function(store, operation, eOpts) {
        var me = this,
            opr = operation,
            main = me.getController(me.$className.split('.')[2].replace('InsurancesGrid','')).getMainRef(),
            clientId = main.down('clientsinformationform').down('button[action=save]').recordId,
            win = Ext.ComponentQuery.query('winaux[name=ClientsWin]')[0];

        if (!Ext.isEmpty(win)) clientId = win.down('clientsinformationform').down('button[action=save]').recordId;

        if (Ext.isEmpty(opr._params)) {
            opr._params = {clientId: clientId};
        } else {
            opr._params.clientId = clientId;
        }

    },

    onClientInsurancesStoreLoad: function(self, records, successful, eOpts) {
        var me = this,
            recs = records,
            height = 0,
            main = me.getController(me.$className.split('.')[2].replace('InsurancesGrid','')).getMainRef(),
            formPanel = main.down('clientsinsurancesform');

        height = (recs.length * 25) + 1 + 38 + 36 + 20; // 38 toolbar + 36 form title + 20 margin
        formPanel.setHeight(height);
        formPanel.doLayout();
    },

    init: function(application) {
        var me = this;
        me.getStore('ClientInsurances').addListener('beforeload', me.onClientInsurancesStoreBeforeLoad, me);
        me.getStore('ClientInsurances').addListener('load', me.onClientInsurancesStoreLoad, me);
    }

});
