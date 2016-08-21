/*
 * File: app/controller/MenuPanel.js
 */

Ext.define('skyclinic.controller.MenuPanel', {
    extend: 'Ext.app.Controller',

    control: {
        "menupanel panel": {
            collapse: 'onPanelCollapse',
            expand: 'onPanelExpand',
            beforeexpand: 'onPanelBeforeExpand'
        },
        "menupanel panel[mnuItem=true]": {
            afterrender: 'onMnuItemPanelAfterRender'
        },
        "menupanel button": {
            click: 'onMenuButtonClick'
        },
        "menupanelX button[func=true]": {
            click: 'callFunc'
        }
    },

    onPanelCollapse: function(p, eOpts) {
        var me = this,
            cmp = p;
        cmp.getHeader().removeCls('expand');
        cmp.doLayout();
    },

    onPanelExpand: function(p, eOpts) {
        var me = this,
            cmp = p;
        cmp.getHeader().addCls('expand');
        cmp.doLayout();
    },

    onPanelBeforeExpand: function(p, animate, eOpts) {
        var me = this,
            cmp = p,
            menupanel = cmp.up('menupanel'),
            actual = cmp.funcView;

        Ext.Array.each(menupanel.query('panel[mnuItem=true]'), function(cmpE, idx) {
            cmpE.getHeader().removeCls('expand');
        });

        Ext.Array.each(cmp.query('panel'), function(sub, idx) {
            sub.expand();
        });
    },

    onMnuItemPanelAfterRender: function(component, eOpts) {
        var me = this,
            cmp = component;

        cmp.getHeader().addListener('click', function() {
            me.onMnuItemPanelClick(cmp, me);
            cmp.getHeader().addCls('expand');
        }, me);

    },

    onMenuButtonClick: function(button, e, eOpts) {
        var me = this,
            btn = button,
            menupanel = btn.up('menupanel'),
            body = menupanel.up('myviewport').down('viewportbody'),
            items = body.items.items,
            exist = false,
            funcCtrl = '';

        Ext.Array.each(menupanel.query('panel[mnuItem=true]'), function(cmp, idx) {
            cmp.getHeader().removeCls('expand');
        });

        Ext.Array.each(menupanel.query('panel[group=true]'), function(panel, idx) {
            if (panel.id !== btn.up().id) panel.collapse();
        });

        me.callProcess(btn);
    },

    callFunc: function(button, e, eOpts) {
        var me = this,
            btn = button,
            vpBody = me.getVpBodyRef(),
            panel = {},
            ctrl = {};

        Ext.Array.each(vpBody.query('panel[func=true]'), function(obj, ix) {
            //    console.log(btn.appName);
            obj.setVisible(false);
        });

        vpBody.down('panel').setVisible(false);

        panel = vpBody.down('panel[name=' + btn.funcView + ']');
        if (Ext.isEmpty(panel)) {
            vpBody.add(me.application.getView(btn.funcView).create());
            vpBody.doLayout();
            panel = vpBody.down('panel[name=' + btn.funcView + ']');
        }

        panel.setVisible(true);
        if (!Ext.isEmpty(panel.down('form'))) panel.down('form').down('textfield').focus(true);

        ctrl = me.getController(btn.funcController);

        Ext.Array.each(ctrl.stores, function(str, idx) {
            var store = ctrl.getStore(str);
            if (store.master && store.count() === 0) store.load();
        });

        btn.up('panel[name=menu]').collapse();

        //    fields = me.getFormRef().getForm().getFields().items;
        //fields[0].focus(true);

    },

    onMnuItemPanelClick: function(component, scope) {
        var me = this,
            cmp = component,
            menupanel = cmp.up('menupanel');

        menupanel.down('button[action=depress]').setPressed(true);

        Ext.Array.each(menupanel.query('panel'), function(panel, idx) {
            if (!Ext.isEmpty(panel.group)) {
                if (panel.group) panel.collapse();
            } else {
                if (!Ext.isEmpty(panel.mnuItem)) {
                    if (panel.mnuItem) panel.getHeader().removeCls('expand');
                }
            }

        });

        if (!Ext.isEmpty(component.funcXtype)) me.callProcess(component);
    },

    callProcess: function(component) {
        var me = this,
            cmp = component,
            body = cmp.up('myviewport').down('viewportbody'),
            items = body.items.items,
            exist = false,
            funcCtrl = '';

        Ext.Array.each(items, function(panel, idx) {
            panel.setVisible(false);

            if (cmp.funcXtype === panel.xtype) {
                panel.setVisible(true);
                exist = true;
            }
        });

        if (!exist) {
            body.add(me.getView(cmp.funcView).create());
            body.doLayout();
        }

        if (!Ext.isEmpty(cmp.funcController)) {
            funcCtrl = me.getController(cmp.funcController);
            if (!Ext.isEmpty(funcCtrl)) {
                Ext.Array.each(funcCtrl.stores, function(str, idx) {
                    var store = funcCtrl.getStore(str);
                    if (store.master && store.count() === 0) store.load();
                });
            }
        }
    }

});
