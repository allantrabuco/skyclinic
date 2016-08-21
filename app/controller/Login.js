/*
 * File: app/controller/Login.js
 */

Ext.define('skyclinic.controller.Login', {
    extend: 'Ext.app.Controller',

    refs: {
        mainRef: 'login'
    },

    control: {
        "login": {
            afterrender: 'onFormAfterRender'
        },
        "login textfield": {
            afterrender: 'onTextfieldAfterRender',
            keyup: 'onTextfieldKeyup'
        },
        "login checkbox[name=staySignedIn]": {
            afterrender: 'onStaySignedInAfterRender'
        },
        "login button[action=entry]": {
            click: 'onEntryButtonClick'
        }
    },

    onFormAfterRender: function(component, eOpts) {
        var me = this,
            cmp = component,
            ls = {};

        if (Ext.supports.LocalStorage) {
        //    Ext.state.Manager.setProvider(
        //        Ext.create('Ext.state.LocalStorageProvider')
        //    );
            ls = Ext.state.LocalStorageProvider.create(me.application.name);

        } else {
            Ext.state.Manager.setProvider(
                Ext.create('Ext.state.CookieProvider')
            );
        }

        if (cmp.name === 'username') {
            if (Ext.isDefined(ls.getItem(me.application._name + 'usr'))) {
                if (!Ext.isEmpty(ls.getItem(me.application._name + 'usr')))
                    cmp.setValue(sjcl.decrypt('the9big8blue', ls.getItem(me.application._name + 'usr')));
            }
        } else if (cmp.name === 'password') {
            if (Ext.isDefined(ls.getItem(me.application._name + 'usrw'))) {
                if (!Ext.isEmpty(ls.getItem(me.application._name + 'usrw')))
                    cmp.setValue(sjcl.decrypt('the9big8blue', ls.getItem(me.application._name + 'usrw')));
            }
        }

    },

    onTextfieldAfterRender: function(component, eOpts) {
        var me = this,
            cmp = component,
            ls = {};

        if (Ext.supports.LocalStorage) {
            ls = Ext.util.LocalStorage.get(me.application._name);

            if (Ext.isEmpty(ls))
                ls = Ext.state.LocalStorageProvider.create(me.application._name);

        } else {
            Ext.state.Manager.setProvider(
                Ext.create('Ext.state.CookieProvider')
            );
        }

        cmp.inputEl.set({
            autocomplete:'on'
        });

        if (cmp.name === 'username') {
            if (Ext.isDefined(ls.getItem(me.application._name + 'usr'))) {
                if (!Ext.isEmpty(ls.getItem(me.application._name + 'usr')))
                    cmp.setValue(sjcl.decrypt('the9big8blue', ls.getItem(me.application._name + 'usr')));
            }
        } else if (cmp.name === 'password') {
            if (Ext.isDefined(ls.getItem(me.application._name + 'usrw'))) {
                if (!Ext.isEmpty(ls.getItem(me.application._name + 'usrw')))
                    cmp.setValue(sjcl.decrypt('the9big8blue', ls.getItem(me.application._name + 'usrw')));
            }
        }

    },

    onStaySignedInAfterRender: function(component, eOpts) {
        var me = this,
            cmp = component,
            ls = {};


        if (Ext.supports.LocalStorage) {
            ls = Ext.util.LocalStorage.get(me.application._name);

            if (Ext.isEmpty(ls))
                ls = Ext.state.LocalStorageProvider.create(me.application._name);

        } else {
            Ext.state.Manager.setProvider(
                Ext.create('Ext.state.CookieProvider')
            );
        }


        if (Ext.isDefined(ls.getItem(me.application._name))) {
            cmp.setValue(ls.getItem(me.application._name));
        }

    },

    onTextfieldKeyup: function(textfield, e, eOpts) {
        var me = this,
            meTextfield = textfield,
            meE = e,
            form = meTextfield.up('login');

        if (meE.getCharCode() === 13) {

            if (form.isValid()) {
                me.onEntryButtonClick(form.down('button[action=entry]'));
            }
        }

    },

    onEntryButtonClick: function(button, e, eOpts) {
        var me = this,
            btn = button,
            login = btn.up('login'),

            user = login.down('textfield[name=username]').getValue(),
            pwd = login.down('textfield[name=password]').getValue(),

            userBtn = {},
            staySignedIn = login.down('checkboxfield').getValue(),
            ctrlGlobal = me.getController('Global'),
            loading = Ext.get('loading');

        //if (!Ext.isEmpty(loading)) loading.setVisible(true);

        login.setLoading('Validando acesso. Por favor, aguarde...');

        Ext.Ajax.request({
            method: 'GET',
            headers: {
                accept: 'application/json'
            },
            params: {
                user: user,
                password: pwd
            },
            scope: me,
            url: ctrlGlobal.server + '/login',
            callback: function(options, success, response) {
                if (success) {

                    var decoded = Ext.decode(response.responseText),
                        ls = Ext.util.LocalStorage.get(me.application._name),
                        access = true;

                    if (decoded.success) {
                        if (Ext.isEmpty(ls))
                            ls = Ext.state.LocalStorageProvider.create(me.application._name);

                        login.setLoading(false);

                        login.destroy();

                        viewport = me.application.getView('MyViewport').create();
                        userBtn = viewport.down('bodyheader').down('button[action=username]');
                        userBtn.setText(user);
                        userBtn.username = decoded.username;
                        userBtn.userId = decoded.user;
                        userBtn.name = decoded.name;
                        userBtn.master = decoded.master;
                        userBtn.groupRef = decoded.groupRef;
                        userBtn.type = decoded.type;

                        ctrlGlobal.message('Bem Vindo ' + user, 'n');

                        ls.setItem(me.application._name, staySignedIn);

                        if (staySignedIn) {
                            ls.setItem(me.application._name + 'usr', sjcl.encrypt('the9big8blue', user));
                            ls.setItem(me.application._name + 'usrw', sjcl.encrypt('the9big8blue', pwd));
                        } else {
                            if (Ext.isDefined(ls.getItem(me.application._name + 'usr'))) ls.removeItem(me.application._name + 'usr');
                            if (Ext.isDefined(ls.getItem(me.application._name + 'usrw'))) ls.removeItem(me.application._name + 'usrw');
                        }


                    } else {
                        ctrlGlobal.message(decoded.errorMsg, 'e');
                        login.setLoading(false);
                    }
                } else {
                    ctrlGlobal.message('A conexão ao servidor falhou!', 'e');
                    login.setLoading(false);
                }
            }
        });
    }

});
