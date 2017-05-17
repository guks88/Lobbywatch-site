var initVegaMoyenne = function() {
    var spec = {
        "$schema": "https://vega.github.io/schema/vega/v3.0.json",
        "width": 600,
        "height": 600,
        "padding": 5,
        "data": [{
            "name": "source",
            "values": [{
                "lobbies": "Moyenne",
                "vote": "blanc",
                "nbre": 20
            }, {
                "lobbies": "Moyenne",
                "vote": "oui",
                "nbre": 40
            }, {
                "lobbies": "Moyenne",
                "vote": "non",
                "nbre": 40
            }]
        },
            {
                "name": "summary",
                "source": "source",
                "transform": [{
                    "type": "aggregate",
                    "groupby": ["lobbies", "vote"],
                    "summarize": {
                        "nbre": ["sum"]
                    }
                }]
            },
            {
                "name": "stacked_scale",
                "source": "summary",
                "transform": [{
                    "type": "aggregate",
                    "summarize": [{
                        "ops": ["sum"],
                        "field": "sum_nbre"
                    }],
                    "groupby": ["lobbies"]
                }]
            },
            {
                "name": "layout",
                "source": "summary",
                "transform": [{
                    "type": "aggregate",
                    "summarize": [{
                        "field": "lobbies",
                        "ops": ["distinct"]
                    }]
                }]
            }
        ],
        "marks": [{
            "name": "root",
            "type": "group",
            "from": {
                "data": "layout"
            },
            "properties": {
                "update": {
                    "width": {
                        "field": "width"
                    },
                    "height": {
                        "field": "height"
                    }
                }
            },
            "marks": [{
                "name": "marks",
                "type": "rect",
                "from": {
                    "data": "summary",
                    "transform": [{
                        "type": "stack",
                        "groupby": ["lobbies"],
                        "field": "sum_nbre",
                        "sortby": ["vote"],
                        "output": {
                            "start": "sum_nbre_start",
                            "end": "sum_nbre_end"
                        },
                        "offset": "normalize"
                    }]
                },
                "properties": {
                    "update": {
                        "x": {
                            "scale": "x",
                            "field": "sum_nbre_start"
                        },
                        "x2": {
                            "scale": "x",
                            "field": "sum_nbre_end"
                        },
                        "yc": {
                            "scale": "y",
                            "field": "lobbies"
                        },
                        "height": {
                            "value": 50
                        },
                        "fill": {
                            "scale": "color",
                            "field": "vote"
                        },
                        "stroke": {
                            "scale": "colorStroke",
                            "field": "vote"
                        },
                        "strokeWidth": {
                            "value": 2
                        }
                    }
                }
            }],
            "scales": [{
                "name": "x",
                "type": "linear",
                "domain": [1, 1],
                "rangeMin": 1,
                "rangeMax": 500,
                "round": true,
                "nice": true,
                "zero": true
            },
                {
                    "name": "y",
                    "type": "ordinal",
                    "domain": {
                        "data": "summary",
                        "field": "lobbies",
                        "sort": true
                    },
                    "padding": 1
                },
                {
                    "name": "color",
                    "type": "ordinal",
                    "domain": {
                        "data": "summary",
                        "field": "vote",
                        "sort": true
                    },
                    "range": ["#FFFFFF", "#FF0000", "#008000"]
                },
                {
                    "name": "colorStroke",
                    "type": "ordinal",
                    "domain": {
                        "data": "source",
                        "field": "vote"
                    },
                    "range": ["#000000"]
                }
            ],
            "axes": [{
                "type": "y",
                "scale": "y",
                "orient": "left"
            }],
            "legends": [{
                "fill": "color",
                "title": "vote",
                "orient": "left",
                "properties": {
                    "symbols": {
                        "shape": {
                            "value": "circle"
                        },
                        "strokeWidth": {
                            "value": 1
                        }
                    }
                }
            }]
        }]
    };

    var view = new vega.View(vega.parse(spec), {
        loader: vega.loader({baseURL: ''}),
        logLevel: vega.Warn,
        renderer: 'canvas'
    }).initialize('#moyenne_chart').hover().run();

};