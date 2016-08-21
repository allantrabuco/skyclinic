/*
 * File: app/controller/ClientsGrid.js
 */

Ext.define('skyclinic.controller.ClientsGrid', {
    extend: 'Ext.app.Controller',

    stores: [
        'Clients'
    ],

    control: {
        "clientsgrid actioncolumn[action=edit]": {
            click: 'onEditColumnClick'
        },
        "clientsgrid actioncolumn[action=select]": {
            click: 'onSelectColumnClick'
        },
        "clientsgrid actioncolumn[action=delete]": {
            click: 'onDeleteColumnClick'
        },
        "clientsgrid": {
            select: 'onRowModelSelect'
        }
    },

    onEditColumnClick: function(view, self, rowIndex, colIndex, event, record) {
        var me = this,
            rec = record,
            ctrlGlobal = me.getController('Global'),
            xtypeMain = me.$className.split('.')[2].replace('Grid','').toLowerCase(),
            grid = view,
            tabPanel = view.up(xtypeMain+'tab'),
            formPanelInformation = tabPanel.down(xtypeMain+'informationform'),
            formPanelAdditional = tabPanel.down(xtypeMain+'additionalform'),
            ciPhoto = formPanelInformation.down('image[name=clientPhotoCI]'),
            caPhoto = formPanelAdditional.down('image[name=clientPhotoCA]'),

            callback = function() {
                formPanelInformation.setDisabled(false);
                formPanelAdditional.setDisabled(false);
                formPanelInformation.getForm().getFields().items[1].focus(true);
                formPanelAdditional.getForm().loadRecord(rec);

                formPanelInformation.down('clientsinsurancesgrid').getStore().load();
                formPanelInformation.down('clientsphonesgrid').getStore().load();

                if (rec.data.photo.length > 0) {
                    ciPhoto.setSrc(rec.data.photo);
                    caPhoto.setSrc(rec.data.photo);
                } else {
                    ciPhoto.setSrc('./resources/images/camera.png');
                    caPhoto.setSrc('./resources/images/camera.png');
                }
                //grid.up(xtypeMain).down(xtypeMain+'form').down('textfield[name=cnpj_fornecedor_saf]').setReadOnly(true);
            };
        ctrlGlobal.editRecord(me, rec.data.clientId, rec, grid, 'Informações Principais', xtypeMain+'tab', xtypeMain+'informationform', callback);
    },

    onSelectColumnClick: function(view, self, rowIndex, colIndex, event, record) {
        var me = this,
            rec = record,
            grid = view.up(),
            win = grid.win,
            field = win.form.down('combobox[name=' + win.field + ']');

        field.setValue(rec.data.clientId);
        me.getController('DiaryForm').onClientsComboboxSelect(field, [rec]);

        win.close();

    },

    onDeleteColumnClick: function(view, self, rowIndex, colIndex, event, record) {
        var me = this,
            grid = view,
            data = record.data,
            ctrlGlobal = me.getController('Global'),
            xtypeMain = me.$className.split('.')[2].replace('Grid','').toLowerCase(),
            store = grid.getStore(),
            callback = function() {
            };

        msg = 'Tem certeza que deseja continuar a operação?' + '<br/><b>CNPJ:</b> ' + data.cnpj_fornecedor_saf + '<br/><b>Nome Fantasia:</b> ' + data.nom_fantasia_fornecedor_saf;
        ctrlGlobal.deleteRecord(me, store, grid, data.cnpj_fornecedor_saf, 'Formulário', xtypeMain+'tab', xtypeMain+'form', null, msg);







    },

    onRowModelSelect: function(rowmodel, record, index, eOpts) {
        var me = this,
            rec = record,
            data = rec.data,
            insurances = rec.getAssociatedData().clientInsurances,
            phones = rec.getAssociatedData().clientPhones,
            //details = me.getClientsGridDetailsRef(),
            details = rowmodel.view.up().down('container[itemId=clientsGridDetails]'),

            clientDetails = '',
            allInsurances = '<span class="detailsTitle">Convênios: </span><p class="details">',
            allPhones = '</p><span class="detailsTitle">Telefones: </span><p class="details">',
            address = '</p><span class="detailsTitle">Endereço: </span><p class="details">';

        me.doResetForms();

        Ext.Array.each(insurances, function(oInsurance, ix) {
            var insuranceInfo = oInsurance,
                insuranceNumber = insuranceInfo.insuranceNumber,
                insuranceOperator = insuranceInfo.description;
            allInsurances = allInsurances + insuranceOperator + ': ' + insuranceNumber + '<br/>';
        });

        Ext.Array.each(phones, function(oPhone, ix) {
            var phoneInfo = oPhone,
                phoneNumber = phoneInfo.phoneNumber,
                phoneType = parseInt(phoneInfo.phoneType, 10) === 1 ? ' (Fixo)' : ' (Celular)',
                phoneOperator = phoneInfo.phoneOperator.length > 0 ? ' (' + phoneInfo.phoneOperator + ') ' : ' ',
                phoneNotes = phoneInfo.phoneNotes.length > 0 ? ' (' + phoneInfo.phoneNotes + ') ' : ' ';

            allPhones = allPhones + phoneNumber + phoneType + phoneOperator + phoneNotes + '<br/>';
        });

        address = address + data.address + ' - ' + data.complement + ' - ' + data.neighborhood + ' - ' + data.zipCode + ' - ' + data.town + ' - ' + data.federation + '</p>';
        clientDetails = '<h2>' + data.fullname.toUpperCase() + '</h2>' + allInsurances + allPhones + address + '</p>';
        details.getEl().setHtml(clientDetails);

        //me.getClientInformationRef().setDisabled(false);
        //me.getClientAdditionalRef().setDisabled(false);

        me.fillData(rec);
    },

    doResetForms: function() {
        var me = this,
            main = me.getController(me.$className.split('.')[2].replace('Grid','')).getMainRef(),

            detailsPhoto = main.down('clientsgrid').down('image[name=clientPhoto]'),

            ci = main.down('clientsinformationform'),
            ca = main.down('clientsadditionalform'),

            ciPhoto = ci.down('image[name=clientPhotoCI]'),
            caPhoto = ca.down('image[name=clientPhotoCA]');


        //Ext.Array.each(ci.getForm().getFields().items, function(obj, ix) {
        //    obj.setValue();
        //});

        //ci.down('clientsinsurancesgrid').getStore().removeAll();
        //ci.down('clientsphonesgrid').getStore().removeAll();


        //Ext.Array.each(ca.getForm().getFields().items, function(obj, ix) {
        //    obj.setValue();
        //});

        //me.getClientInformationRef().newClient = false;
        //me.getClientInformationRef().clientId = 0;

        detailsPhoto.setSrc('./resources/images/camera.png');
        //ciPhoto.setSrc('./resources/images/camera.png');
        //caPhoto.setSrc('./resources/images/camera.png');
    },

    fillData: function(record) {
        var me = this,
            rec = record,

            main = me.getController(me.$className.split('.')[2].replace('Grid','')).getMainRef(),

            detailsPhoto = main.down('clientsgrid').down('image[name=clientPhoto]'),

            ci = main.down('clientsinformationform'),
            ca = main.down('clientsadditionalform'),

            ciPhoto = ci.down('image[name=clientPhotoCI]'),
            caPhoto = ca.down('image[name=clientPhotoCA]');

        //ci.getForm().loadRecord(rec);
        //ci.newClient = true;
        ////ci.clientId = rec.data.clientId;


        if (rec.data.photo.length > 0) {
            detailsPhoto.setSrc(rec.data.photo);
            //ciPhoto.setSrc(rec.data.photo);
            //caPhoto.setSrc(rec.data.photo);
        } else {
            detailsPhoto.setSrc('./resources/images/camera.png');
            //ciPhoto.setSrc('./resources/images/camera.png');
            //caPhoto.setSrc('./resources/images/camera.png');
        }

        //ca.getForm().loadRecord(rec);
    },

    onClientsStoreBeforeLoad: function(store, operation, eOpts) {
        var me = this,
            opr = operation,
            main = me.getController(me.$className.split('.')[2].replace('Grid','')).getMainRef(),
            value = main.down(me.$className.split('.')[2].replace('Grid','').toLowerCase() + 'list').down('textfield[name=search]').getValue();

        if (value.length > 0) {
            if (Ext.isEmpty(opr._params)) {
                opr._params = {findValue: value};
            } else {
                opr._params.findValue = value;
            }
        }

    },

    onClientsStoreLoad: function(store, operation, eOpts) {
        var me = this,
            main = me.getController(me.$className.split('.')[2].replace('Grid','')).getMainRef(),
            details = main.down('clientsgrid').down('container[itemId=clientsGridDetails]'),
            detailsPhoto = main.down('clientsgrid').down('image[name=clientPhoto]'),
            clientDetails = '<h2>Detalhes</h2>';

        details.getEl().setHtml(clientDetails);
        detailsPhoto.setSrc('./resources/images/camera.png');

    },

    init: function(application) {
        var me = this;
        me.getStore('Clients').addListener('beforeload', me.onClientsStoreBeforeLoad, me);
        me.getStore('Clients').addListener('load', me.onClientsStoreLoad, me);
    }

});
