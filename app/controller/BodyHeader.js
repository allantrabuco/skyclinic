/*
 * File: app/controller/BodyHeader.js
 */

Ext.define('skyclinic.controller.BodyHeader', {
    extend: 'Ext.app.Controller',

    refs: {
        mainRef: 'bodyheader'
    },

    control: {
        "menuitem[action=logout]": {
            click: 'onLogoutMenuitemClick'
        }
    },

    /* Sair da aplicacao */
    onLogoutMenuitemClick: function(item, e, eOpts) {
        var me = this,
            viewport = item.up('myviewport'),
            login = Ext.ComponentQuery.query('login')[0];


        Ext.MessageBox.show({
            title: 'Sair',
            msg: 'Tem certeza que deseja sair da aplicação?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.MessageBox.QUESTION,
            fn: function(btn) {
                if (btn == 'yes') {
                    viewport.destroy();
                    location.reload();
                }
            }
        });

    }

});
