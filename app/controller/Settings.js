/*
 * File: app/controller/Settings.js
 */

Ext.define('skyclinic.controller.Settings', {
    extend: 'Ext.app.Controller',

    stores: [
        'Specialties',
        'Insurances',
        'Procedures'
    ],

    refs: {
        mainRef: 'settings'
    }
});
