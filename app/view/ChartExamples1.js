/*
 * File: app/view/ChartExamples1.js
 */

Ext.define('skyclinic.view.ChartExamples1', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.chartexamplesex1',

    requires: [
        'Ext.chart.PolarChart',
        'Ext.chart.series.Pie',
        'Ext.chart.series.sprite.PieSlice',
        'Ext.chart.interactions.Rotate',
        'Ext.draw.sprite.Text',
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Bar',
        'Ext.chart.Legend'
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
            height: 400,
            maxHeight: 400,
            maxWidth: 350,
            minHeight: 400,
            minWidth: 350,
            padding: '10 0 10 10',
            ui: 'defpiechart',
            width: 350,
            bodyStyle: 'background-color: #f1f1f1 !important',
            animation: true,
            background: '#f1f1f1',
            colors: [
                '#2ac8ef',
                '#ececec'
            ],
            store: 'store5',
            innerPadding: 20,
            series: [
                {
                    type: 'pie',
                    showInLegend: false,
                    xField: 'data1',
                    donut: 85
                }
            ],
            interactions: [
                {
                    type: 'rotate'
                }
            ],
            sprites: [
                {
                    type: 'text',
                    fontFamily: 'latolight',
                    fontSize: '20px',
                    fontStyle: 'italic',
                    text: 'Gráfico de Teste 3',
                    x: 50,
                    y: 30
                },
                {
                    type: 'text',
                    font: '50px 300 Proxima Nova, Helvetica Neue, Helvetica, Arial, sans-serif',
                    text: '25%',
                    x: 120,
                    y: 210
                }
            ]
        },
        {
            xtype: 'cartesian',
            flex: 1,
            height: 250,
            background: '#f1f1f1',
            insetPadding: {
                top: 40,
                left: 10,
                right: 10,
                bottom: 20
            },
            store: 'store6',
            axes: [
                {
                    type: 'numeric',
                    fields: [
                        'data1'
                    ],
                    grid: true,
                    label: {
                        renderer: function(v) { return v + '%'; }
                    },
                    minimum: 0,
                    position: 'left'
                },
                {
                    type: 'category',
                    fields: [
                        'name'
                    ],
                    grid: true,
                    label: {
                        rotate: {
                            degrees: -45
                        }
                    },
                    position: 'bottom'
                }
            ],
            series: [
                {
                    type: 'bar',
                    tips: {
                        trackMouse: true,
                        height: 20,
                        renderer: function(storeItem, item) {
                            //var browser = item.series.title[item.series._yField.indexOf(item.field)];
                            var browser = item.field;
                            this.setTitle(browser + ' for ' + storeItem.get('name') + ': ' + storeItem.get(item.field) + '%');
                        }
                    },
                    highlight: {
                        fillStyle: '#aae9f7',
                        lineWidth: 1,
                        strokeStyle: '#fff'
                    },
                    xField: 'name',
                    yField: [
                        'data1',
                        'data2',
                        'data3',
                        'data4'
                    ]
                }
            ],
            legend: {
                xtype: 'legend',
                position: 'bottom',
                boxStrokeWidth: 0,
                labelFont: '12px Helvetica'
            },
            sprites: [
                {
                    type: 'text',
                    fontFamily: 'latolight',
                    fontSize: '20px',
                    fontStyle: 'italic',
                    text: 'Gráfico de Teste 4',
                    x: 50,
                    y: 30
                }
            ]
        }
    ]

});