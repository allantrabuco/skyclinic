/*
 * File: app/controller/Professionals.js
 */

Ext.define('skyclinic.controller.Professionals', {
    extend: 'Ext.app.Controller',

    stores: [
        'Professionals',
        'MobileOperator',
        'ProfessionalSpecialtiesCombo',
        'Sex'
    ],

    refs: {
        mainRef: 'professionals'
    },

    control: {
        "professionals button[action=add]": {
            click: 'onAddButtonClick'
        },
        "professionals button[action=cancel]": {
            click: 'onCancelButtonClick'
        },
        "professionals button[action=save]": {
            click: 'onSaveButtonClick'
        }
    },

    onAddButtonClick: function(button, e, eOpts) {
        var me = this,
            addBtn = button,

            ctrlGlobal = me.getController('Global'),
            xtypeMain = me.$className.split('.')[2].replace('Form','').toLowerCase(),

            tabPanel = addBtn.up(xtypeMain+'tab'),

            formPanelInformation = tabPanel.down(xtypeMain+'informationform'),
            formPanelAdditional = tabPanel.down(xtypeMain+'additionalform'),

            ciPhoto = formPanelInformation.down('image[name=professionalPhotoCI]'),
            caPhoto = formPanelAdditional.down('image[name=professionalPhotoCA]'),

            grid = tabPanel.down(xtypeMain+'grid'),

            savInfoBtn = formPanelInformation.down('button[action=save]'),
            canInfoBtn = formPanelInformation.down('button[action=cancel]'),

            savAddBtn = formPanelAdditional.down('button[action=save]'),
            canAddBtn = formPanelAdditional.down('button[action=cancel]'),

            store = grid.getStore(),

            callback = function() {

                formPanelAdditional.setDisabled(false);
                ctrlGlobal.doResetForm(formPanelAdditional.getForm(), savAddBtn);
                formPanelAdditional.isValid();

                formPanelInformation.down('professionalsspecialtiesgrid').getStore().load();
                formPanelInformation.down('professionalsphonesgrid').getStore().load();

                ciPhoto.setSrc('./resources/images/camera.png');
                caPhoto.setSrc('./resources/images/camera.png');

        //        formPanel.down('checkbox[name=flg_ativo_item_sai]').setValue(1);
        //        formPanel.down('textfield[name=cod_item_sai]').setReadOnly(false);

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

                                savInfoBtn.recordId = parseInt(decoded.profId, 10);
                                store.load();
                            }
                        } else {
                            Ext.MessageBox.alert('Warning', 'Lost connection to the server!');
                        }
                    },
                    params: {
                        profId: 0,
                        id: 0,
                        info: null
                    },
                    scope: me,
                    url: ctrlGlobal.server + '/professionals/newRecord'
                });
            };

        ctrlGlobal.addRecord(me, addBtn, store, 'Informações Principais', xtypeMain+'tab', xtypeMain+'informationform', callback);
    },

    onCancelButtonClick: function(button, e, eOpts) {
        var me = this,
            canBtn = button,

            ctrlGlobal = me.getController('Global'),
            xtypeMain = me.$className.split('.')[2].replace('Form','').toLowerCase(),

            tabPanel = canBtn.up(xtypeMain+'tab'),

            formPanelInformation = tabPanel.down(xtypeMain+'informationform'),
            formPanelAdditional = tabPanel.down(xtypeMain+'additionalform'),

            grid = tabPanel.down(xtypeMain+'grid'),

            addInfoBtn = formPanelInformation.down('button[action=add]'),
            savInfoBtn = formPanelInformation.down('button[action=save]'),

            addAddBtn = formPanelAdditional.down('button[action=add]'),
            savAddBtn = formPanelAdditional.down('button[action=save]'),

            store = grid.getStore(),

            callback = function() {
                ctrlGlobal.doResetForm(formPanelAdditional.getForm(), savAddBtn);
                Ext.each(tabPanel.getTabBar().items.items, function(tb, idx) {
                    if (idx > 0) tb.setDisabled(true);
                });
                //formPanel.down('checkbox').setValue('Y');
                //formPanel.down('textfield[name=cod_item_sai]').setReadOnly(false);
            };

        ctrlGlobal.cancelOperation(me, addInfoBtn, store, 'Listagem', xtypeMain+'tab', xtypeMain+'informationform', callback);
    },

    onSaveButtonClick: function(button, e, eOpts) {
        var me = this,
            savBtn = button,

            ctrlGlobal = me.getController('Global'),
            xtypeMain = me.$className.split('.')[2].replace('Form','').toLowerCase(),

            tabPanel = savBtn.up(xtypeMain+'tab'),

            formPanelInformation = tabPanel.down(xtypeMain+'informationform'),
            formPanelAdditional = tabPanel.down(xtypeMain+'additionalform'),

            insurancesGrid = formPanelInformation.down('professionalsspecialtiesform').down('grid'),
            insurancesCount = insurancesGrid.getStore().count(),
            phonesGrid = formPanelInformation.down('professionalsphonesform').down('grid'),
            phonesCount = phonesGrid.getStore().count(),
            message = '',

            grid = tabPanel.down(xtypeMain+'grid'),

            savInfoBtn = formPanelInformation.down('button[action=save]'),
            canInfoBtn = formPanelInformation.down('button[action=cancel]'),

            savAddBtn = formPanelAdditional.down('button[action=save]'),
            canAddBtn = formPanelAdditional.down('button[action=cancel]'),

            fieldsOutForm = [],
            //username = savBtn.up('myviewport').down('bodyheader').down('button[action=username]').username,

            store = grid.getStore(),

            callback = function() {
                ctrlGlobal.doResetForm(formPanelAdditional.getForm(), savAddBtn);
                Ext.each(tabPanel.getTabBar().items.items, function(tb, idx) {
                    if (idx > 0) tb.setDisabled(true);
                });
            },
            valid = false;

        //fieldsOutForm.push({field:'system_user', value:username});


        if (formPanelInformation.getForm().isValid()) {

            valid = true;
            if (insurancesCount === 0 && phonesCount === 0) {
                message = 'É obrigatório pelo menos uma especialidade e um telefone de contato!';
                valid = false;
            } else if (insurancesCount === 0 && phonesCount > 0) {
                message = 'É obrigatório pelo menos uma especialidade!';
                valid = false;
            } else if (insurancesCount > 0 && phonesCount === 0) {
                message = 'É obrigatório pelo menos um telefone de contato!';
                valid = false;
            }

        }

        if (valid) {

            fieldsOutForm = ctrlGlobal.dirtyFields(formPanelAdditional.getForm());
            ctrlGlobal.saveRecord(me, savInfoBtn, store, 'professionalId', savInfoBtn.recordId, 'Listagem', xtypeMain+'tab', xtypeMain+'grid', xtypeMain+'informationform', callback, fieldsOutForm);

        } else {
            Ext.MessageBox.show({
                title: 'Gravar',
                msg: message,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });

        }

    }

});
