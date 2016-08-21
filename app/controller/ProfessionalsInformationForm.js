/*
 * File: app/controller/ProfessionalsInformationForm.js
 */

Ext.define('skyclinic.controller.ProfessionalsInformationForm', {
    extend: 'Ext.app.Controller',

    control: {
        "professionalsinformationform textfield[name=fullname]": {
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
            fullname = formPanelAdditional.down('textfield[name=fullname]');

        if (value.length > 0) {
            mainPanel.setTitle('Profissionais da Saúde: <span class="header-title-part2">[' + value + ']</span>');
        } else {
            mainPanel.setTitle('Profissionais da Saúde');
        }
        fullname.setValue(value);
        fullname.originalValue = value;

    }

});
