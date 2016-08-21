/*
 * File: app/view/ChartExamplesEx.js
 */

Ext.define('skyclinic.view.ChartExamplesEx', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.chartexamplesex',

    requires: [
        'Ext.chart.PolarChart',
        'Ext.chart.series.Pie',
        'Ext.chart.series.sprite.PieSlice',
        'Ext.chart.interactions.Rotate',
        'Ext.chart.Legend',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.draw.sprite.Text'
    ],

    height: 400,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'polar',
            flex: 1,
            shadow: true,
            ui: 'defpiechart',
            bodyStyle: 'background-color: #f1f1f1 !important',
            animation: true,
            background: '#f1f1f1',
            colors: [
                '#115fa6',
                '#94ae0a',
                '#a61120',
                '#ff8809',
                '#ffd13e',
                '#a61187',
                '#24ad9a',
                '#7c7474',
                '#a66111'
            ],
            store: 'store1',
            innerPadding: 20,
            series: [
                {
                    type: 'pie',
                    highlight: {
                        segment: {
                            margin: 20
                        }
                    },
                    label: {
                        field: 'name',
                        display: 'outside',
                        contrast: true,
                        font: '12px Arial',
                        calloutLine: true
                    },
                    tooltip: {
                        trackMouse: true,
                        renderer: function(storeItem, item) {
                            this.setHtml(storeItem.get('name') + ': ' + storeItem.get('data1') + '%');
                        }
                    },
                    xField: 'data1',
                    donut: 40
                }
            ],
            interactions: [
                {
                    type: 'rotate'
                },
                {
                    type: 'itemhighlight'
                }
            ],
            legend: {
                xtype: 'legend',
                docked: 'right'
            },
            sprites: [
                {
                    type: 'text',
                    fontFamily: 'latolight',
                    fontSize: '20px',
                    fontStyle: 'italic',
                    text: 'Gráfico de Teste 1',
                    x: 50,
                    y: 30
                }
            ]
        },
        {
            xtype: 'polar',
            flex: 1,
            shadow: true,
            ui: 'defpiechart',
            bodyStyle: 'background-color: #f1f1f1 !important',
            animation: true,
            background: '#f1f1f1',
            colors: [
                '#115fa6',
                '#94ae0a',
                '#a61120',
                '#ff8809',
                '#ffd13e',
                '#a61187',
                '#24ad9a',
                '#7c7474',
                '#a66111'
            ],
            store: 'store2',
            innerPadding: 20,
            series: [
                {
                    type: 'pie',
                    highlight: {
                        segment: {
                            margin: 20
                        }
                    },
                    label: {
                        field: 'name',
                        display: 'outside',
                        contrast: true,
                        font: '12px Arial',
                        calloutLine: true
                    },
                    tooltip: {
                        trackMouse: true,
                        renderer: function(storeItem, item) {
                            this.setHtml(storeItem.get('name') + ': ' + storeItem.get('data1') + '%');
                        }
                    },
                    xField: 'data1',
                    donut: 40
                }
            ],
            interactions: [
                {
                    type: 'rotate'
                },
                {
                    type: 'itemhighlight'
                }
            ],
            legend: {
                xtype: 'legend',
                docked: 'bottom'
            },
            sprites: [
                {
                    type: 'text',
                    fontFamily: 'latolight',
                    fontSize: '20px',
                    fontStyle: 'italic',
                    text: 'Gráfico de Teste 2',
                    x: 50,
                    y: 30
                }
            ]
        }
    ]

});