/*
 * File: app/controller/ClientsInformationForm.js
 */

Ext.define('skyclinic.controller.ClientsInformationForm', {
    extend: 'Ext.app.Controller',

    control: {
        "clientsinformationform textfield[name=fullname]": {
            change: 'onFullnameChange'
        }
    },

    onFullnameChange: function(field, newValue, oldValue, eOpts) {
        var me = this,
            cmp = field,
            value = newValue,

            xtypeMain = me.$className.split('.')[2].replace('InformationForm','').toLowerCase(),

            tabPanel = cmp.up(xtypeMain+'tab'),

            mainPanel = tabPanel.up(xtypeMain),
            formPanelAdditional = tabPanel.down(xtypeMain+'additionalform'),
            fullname = formPanelAdditional.down('textfield[name=fullname]'),
            span = '<span class="header-title-part2">[' + value + ']</span>',

            win = cmp.up('winaux');

        if (!Ext.isEmpty(win)) {
            mainPanel = win;
            span = '[' + value + ']';
        }

        if (value.length > 0) {
            mainPanel.setTitle('Pacientes ' + span);
        } else {
            mainPanel.setTitle('Pacientes');
        }


        fullname.setValue(value);
        fullname.originalValue = value;

    }

});
