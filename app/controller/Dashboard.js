/*
 * File: app/controller/Dashboard.js
 */

Ext.define('skyclinic.controller.Dashboard', {
    extend: 'Ext.app.Controller',

    stores: [
        'store1',
        'store2',
        'store3',
        'store4',
        'store5',
        'store6'
    ],

    init: function(application) {
        var me = this,
            app = application,
            ctrlGlobal = me.getController('Global');

        app.getStore1Store().loadData(ctrlGlobal.generateData(3));
        app.getStore2Store().loadData(ctrlGlobal.generateData(2, 20));
        app.getStore3Store().loadData(ctrlGlobal.generateData(4, 40));
        app.getStore4Store().loadData(ctrlGlobal.generateData(1));
    }

});
