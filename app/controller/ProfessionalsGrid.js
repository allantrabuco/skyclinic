/*
 * File: app/controller/ProfessionalsGrid.js
 */

Ext.define('skyclinic.controller.ProfessionalsGrid', {
    extend: 'Ext.app.Controller',

    stores: [
        'Professionals'
    ],

    control: {
        "professionalsgrid actioncolumn[action=edit]": {
            click: 'onEditColumnClick'
        },
        "professionalsgrid actioncolumn[action=delete]": {
            click: 'onDeleteColumnClick'
        },
        "professionalsgridX": {
            select: 'onRowModelSelectX'
        },
        "professionalsgrid": {
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
            ciPhoto = formPanelInformation.down('image[name=professionalPhotoCI]'),
            caPhoto = formPanelAdditional.down('image[name=professionalPhotoCA]'),

            callback = function() {
                formPanelInformation.setDisabled(false);
                formPanelAdditional.setDisabled(false);
                formPanelInformation.getForm().getFields().items[1].focus(true);
                formPanelAdditional.getForm().loadRecord(rec);

                formPanelInformation.down('professionalsspecialtiesgrid').getStore().load();
                formPanelInformation.down('professionalsphonesgrid').getStore().load();

                if (rec.data.photo.length > 0) {
                    ciPhoto.setSrc(rec.data.photo);
                    caPhoto.setSrc(rec.data.photo);
                } else {
                    ciPhoto.setSrc('./resources/images/camera.png');
                    caPhoto.setSrc('./resources/images/camera.png');
                }
                //grid.up(xtypeMain).down(xtypeMain+'form').down('textfield[name=cnpj_fornecedor_saf]').setReadOnly(true);
            };
        ctrlGlobal.editRecord(me, rec.data.profId, rec, grid, 'Informações Principais', xtypeMain+'tab', xtypeMain+'informationform', callback);
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

    onRowModelSelectX: function(rowmodel, record, index, eOpts) {
        //rowmodel, record, index. eOpts
        var me = this,
            rec = record,
            data = rec.data,
            specialies = rec.getAssociatedData().professionalSpecialties,
            phones = rec.getAssociatedData().professionalPhones,
            details = rowmodel.view.up().down('container[itemId=professionalsGridDetails]'),

            professionalDetails = '',
            allSpecialties = '<span class="detailsTitle">Especialidades: </span><p class="details">',
            allPhones = '</p><span class="detailsTitle">Telefones: </span><p class="details">',
            address = '</p><span class="detailsTitle">Endereço: </span><p class="details">';

        me.doResetForms();

        Ext.Array.each(specialies, function(oInsurance, ix) {
            var specialtyInfo = oInsurance,
                specialtyOperator = specialtyInfo.description;
            allSpecialties = allSpecialties + specialtyOperator + '<br/>';
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
        professionalDetails = '<h2>' + data.fullname.toUpperCase() + '</h2>' + allSpecialties + allPhones + address + '</p>';
        details.getEl().setHtml(professionalDetails);

        //me.getClientInformationRef().setDisabled(false);
        //me.getClientAdditionalRef().setDisabled(false);

        me.fillData(rec);
    },

    onRowModelSelect: function(rowmodel, record, index, eOpts) {
        //rowmodel, record, index. eOpts
        var me = this,
            rec = record,
            data = rec.data,
            specialies = rec.getAssociatedData().profSpecialties,
            phones = rec.getAssociatedData().profPhones,
            details = rowmodel.view.up().down('container[itemId=professionalsGridDetails]'),

            professionalDetails = '',
            allSpecialties = '<span class="detailsTitle">Especialidades: </span><p class="details">',
            allPhones = '</p><span class="detailsTitle">Telefones: </span><p class="details">',
            address = '</p><span class="detailsTitle">Endereço: </span><p class="details">';

        me.doResetForms();

        Ext.Array.each(specialies, function(oInsurance, ix) {
            var specialtyInfo = oInsurance,
                specialtyOperator = specialtyInfo.description;
            allSpecialties = allSpecialties + specialtyOperator + '<br/>';
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
        professionalDetails = '<h2>' + data.fullname.toUpperCase() + '</h2>' + allSpecialties + allPhones + address + '</p>';
        details.getEl().setHtml(professionalDetails);

        //me.getClientInformationRef().setDisabled(false);
        //me.getClientAdditionalRef().setDisabled(false);

        me.fillData(rec);
    },

    doResetForms: function() {
        var me = this,
            main = me.getController(me.$className.split('.')[2].replace('Grid','')).getMainRef(),

            detailsPhoto = main.down('professionalsgrid').down('image[name=professionalPhoto]'),

            ci = main.down('professionalsinformationform'),
            ca = main.down('professionalsadditionalform'),

            ciPhoto = ci.down('image[name=professionalPhotoCI]'),
            caPhoto = ca.down('image[name=professionalPhotoCA]');


        //Ext.Array.each(ci.getForm().getFields().items, function(obj, ix) {
        //    obj.setValue();
        //});

        //ci.down('professionalsinsurancesgrid').getStore().removeAll();
        //ci.down('professionalsphonesgrid').getStore().removeAll();


        //Ext.Array.each(ca.getForm().getFields().items, function(obj, ix) {
        //    obj.setValue();
        //});

        //me.getClientInformationRef().newClient = false;
        //me.getClientInformationRef().professionalId = 0;

        detailsPhoto.setSrc('./resources/images/camera.png');
        //ciPhoto.setSrc('./resources/images/camera.png');
        //caPhoto.setSrc('./resources/images/camera.png');
    },

    fillData: function(record) {
        var me = this,
            rec = record,

            main = me.getController(me.$className.split('.')[2].replace('Grid','')).getMainRef(),

            detailsPhoto = main.down('professionalsgrid').down('image[name=professionalPhoto]'),

            ci = main.down('professionalsinformationform'),
            ca = main.down('professionalsadditionalform'),

            ciPhoto = ci.down('image[name=professionalPhotoCI]'),
            caPhoto = ca.down('image[name=professionalPhotoCA]');

        //ci.getForm().loadRecord(rec);
        //ci.newClient = true;
        ////ci.professionalId = rec.data.professionalId;


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

    onProfessionalsStoreBeforeLoad: function(store, operation, eOpts) {
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

    onProfessionalsStoreLoad: function(store, operation, eOpts) {
        var me = this,
            main = me.getController(me.$className.split('.')[2].replace('Grid','')).getMainRef(),
            detailsPhoto = main.down('professionalsgrid').down('image[name=professionalPhoto]'),
            details = main.down('professionalsgrid').down('container[itemId=professionalsGridDetails]'),
            professionalDetails = '<h2>Detalhes</h2>';

        details.getEl().setHtml(professionalDetails);
        detailsPhoto.setSrc('./resources/images/camera.png');
    },

    init: function(application) {
        var me = this;
        me.getStore('Professionals').addListener('beforeload', me.onProfessionalsStoreBeforeLoad, me);
        me.getStore('Professionals').addListener('load', me.onProfessionalsStoreLoad, me);
    }

});
