/*
 * File: app/view/Calendar.js
 */

Ext.define('skyclinic.view.Calendar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.calendar',

    requires: [
        'Ext.panel.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'Ext.form.field.Date'
    ],

    config: {
        action: 'm'
    },

    layout: 'fit',
    title: 'Calendário',

    dockedItems: [
        {
            xtype: 'panel',
            name: 'calend-title',
            dock: 'top',
            height: 35,
            maxHeight: 35,
            minHeight: 35,
            ui: 'monthpanel',
            title: 'Mês',
            titleAlign: 'center'
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'bodytoolbar',
            items: [
                {
                    xtype: 'button',
                    action: 'previous',
                    text: 'Anterior'
                },
                {
                    xtype: 'button',
                    action: 'next',
                    text: 'Próximo'
                },
                {
                    xtype: 'button',
                    action: 'today',
                    text: 'Hoje'
                },
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    action: 'month',
                    allowDepress: false,
                    enableToggle: true,
                    pressed: true,
                    text: 'Mês',
                    toggleGroup: 'viewer'
                },
                {
                    xtype: 'button',
                    action: 'week',
                    allowDepress: false,
                    enableToggle: true,
                    text: 'Semana',
                    toggleGroup: 'viewer'
                },
                {
                    xtype: 'button',
                    action: 'day',
                    allowDepress: false,
                    enableToggle: true,
                    text: 'Dia',
                    toggleGroup: 'viewer'
                },
                {
                    xtype: 'datefield',
                    width: 140,
                    name: 'gotoDate'
                },
                {
                    xtype: 'button',
                    action: 'goto',
                    text: 'Ir'
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'panel',
            name: 'CalendBody',
            autoRender: true,
            layout: 'fit',
            dockedItems: [
                {
                    xtype: 'container',
                    cls: 'calend-header',
                    dock: 'top',
                    height: 35,
                    maxHeight: 35,
                    minHeight: 35,
                    defaults: {
                        padding: '10 0 0 0'
                    },
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            name: 'time',
                            baseCls: 'calend-sunday',
                            hidden: true,
                            width: 60
                        },
                        {
                            xtype: 'container',
                            name: 'sun',
                            calendHeader: true,
                            flex: 1,
                            cls: 'calend-sunday',
                            html: 'Dom'
                        },
                        {
                            xtype: 'container',
                            name: 'mon',
                            calendHeader: true,
                            flex: 1,
                            cls: 'calend-weekday',
                            html: 'Seg'
                        },
                        {
                            xtype: 'container',
                            name: 'tue',
                            calendHeader: true,
                            flex: 1,
                            cls: 'calend-weekday',
                            html: 'Ter'
                        },
                        {
                            xtype: 'container',
                            name: 'wed',
                            calendHeader: true,
                            flex: 1,
                            cls: 'calend-weekday',
                            html: 'Qua'
                        },
                        {
                            xtype: 'container',
                            name: 'thu',
                            calendHeader: true,
                            flex: 1,
                            cls: 'calend-weekday',
                            html: 'Qui'
                        },
                        {
                            xtype: 'container',
                            name: 'fri',
                            calendHeader: true,
                            flex: 1,
                            cls: 'calend-weekday',
                            html: 'Sex'
                        },
                        {
                            xtype: 'container',
                            calendHeader: true,
                            flex: 1,
                            cls: 'calend-saturday',
                            html: 'Sáb'
                        },
                        {
                            xtype: 'container',
                            name: 'scrollFill',
                            cls: 'calend-scrollFill',
                            width: 18
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'container',
                    name: 'calendar',
                    cls: 'calendix',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            name: 'week1',
                            week: true,
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body sunday'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body saturday'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            name: 'week2',
                            week: true,
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body sunday'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body saturday'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            name: 'week3',
                            week: true,
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body sunday'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body saturday'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            name: 'week4',
                            week: true,
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body sunday'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body saturday'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            name: 'week5',
                            week: true,
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body sunday'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body saturday'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            name: 'week6',
                            week: true,
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body sunday'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body'
                                },
                                {
                                    xtype: 'container',
                                    day: true,
                                    flex: 1,
                                    cls: 'calend-body saturday'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    name: 'dayView',
                    scrollable: true
                }
            ]
        },
        {
            xtype: 'container',
            name: 'marker',
            hidden: true
        }
    ]

});