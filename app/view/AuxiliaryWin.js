/*
 * File: app/view/AuxiliaryWin.js
 */

Ext.define('skyclinic.view.AuxiliaryWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.auxiliarywin',

    requires: [
        'skyclinic.view.AuxiliaryWinViewModel'
    ],

    viewModel: {
        type: 'auxiliarywin'
    },
    constrain: true,
    modal: true,
    autoShow: true,
    height: 400,
    ui: 'defwin',
    width: 600,
    defaults: {
        labelSeparator: '',
        labelAlign: 'top',
        msgTarget: 'under',
        anchor: '0'
    },
    layout: 'fit',
    bodyBorder: true,
    bodyPadding: 10,
    maximizable: true

});