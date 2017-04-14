$(document).ready(function() {
    $.ajax({url: "/search_all_lobbies_size", dataType: 'json', success: function(result){
        console.log(result);
    }});
    var spec = {
        "$schema": "https://vega.github.io/schema/vega/v3.0.json",
        "width": 465,
        "height": 383,
        "padding": 5,
        "autosize": "fit",

        "data": [
            {
                "name": "table",
                "values": [
                    {"category":"A", "position":0, "value":0.1},
                    {"category":"A", "position":1, "value":0.6},
                    {"category":"A", "position":2, "value":0.9},
                    {"category":"A", "position":3, "value":0.4},
                    {"category":"B", "position":0, "value":0.7},
                    {"category":"B", "position":1, "value":0.2},
                    {"category":"B", "position":2, "value":1.1},
                    {"category":"B", "position":3, "value":0.8},
                    {"category":"C", "position":0, "value":0.6},
                    {"category":"C", "position":1, "value":0.1},
                    {"category":"C", "position":2, "value":0.2},
                    {"category":"C", "position":3, "value":0.7},
                    {"category":"D", "position":0, "value":0.6},
                    {"category":"D", "position":1, "value":0.1},
                    {"category":"D", "position":2, "value":0.2},
                    {"category":"D", "position":3, "value":0.7},
                    {"category":"E", "position":0, "value":0.6},
                    {"category":"E", "position":1, "value":0.1},
                    {"category":"E", "position":2, "value":0.2},
                    {"category":"E", "position":3, "value":0.7},
                    {"category":"F", "position":0, "value":0.1},
                    {"category":"F", "position":1, "value":0.6},
                    {"category":"F", "position":2, "value":0.9},
                    {"category":"F", "position":3, "value":0.4},
                    {"category":"G", "position":0, "value":0.7},
                    {"category":"G", "position":1, "value":0.2},
                    {"category":"G", "position":2, "value":1.1},
                    {"category":"G", "position":3, "value":0.8},
                    {"category":"H", "position":0, "value":0.6},
                    {"category":"H", "position":1, "value":0.1},
                    {"category":"H", "position":2, "value":0.2},
                    {"category":"H", "position":3, "value":0.7},
                    {"category":"I", "position":0, "value":0.6},
                    {"category":"I", "position":1, "value":0.1},
                    {"category":"I", "position":2, "value":0.2},
                    {"category":"I", "position":3, "value":0.7},
                    {"category":"J", "position":0, "value":0.6},
                    {"category":"J", "position":1, "value":0.1},
                    {"category":"J", "position":2, "value":0.2},
                    {"category":"J", "position":3, "value":0.7}
                ]
            }
        ],

        "scales": [
            {
                "name": "yscale",
                "type": "band",
                "domain": {"data": "table", "field": "category"},
                "range": "height",
                "padding": 0.2
            },
            {
                "name": "xscale",
                "type": "linear",
                "domain": {"data": "table", "field": "value"},
                "range": "width",
                "round": true,
                "zero": true,
                "nice": true
            },
            {
                "name": "color",
                "type": "ordinal",
                "domain": {"data": "table", "field": "position"},
                "range": {"scheme": "category20"}
            }
        ],

        "axes": [
            {"orient": "left", "scale": "yscale", "tickSize": 0, "labelPadding": 4, "zindex": 1},
            {"orient": "bottom", "scale": "xscale"}
        ],

        "marks": [
            {
                "type": "group",

                "from": {
                    "facet": {
                        "data": "table",
                        "name": "facet",
                        "groupby": "category"
                    }
                },

                "encode": {
                    "enter": {
                        "y": {"scale": "yscale", "field": "category"}
                    }
                },

                "signals": [
                    {"name": "height", "update": "bandwidth('yscale')"}
                ],

                "scales": [
                    {
                        "name": "pos",
                        "type": "band",
                        "range": "height",
                        "domain": {"data": "facet", "field": "position"}
                    }
                ],

                "marks": [
                    {
                        "name": "bars",
                        "from": {"data": "facet"},
                        "type": "rect",
                        "encode": {
                            "enter": {
                                "y": {"scale": "pos", "field": "position"},
                                "height": {"scale": "pos", "band": 1},
                                "x": {"scale": "xscale", "field": "value"},
                                "x2": {"scale": "xscale", "value": 0},
                                "fill": {"scale": "color", "field": "position"}
                            }
                        }
                    },
                    {
                        "type": "text",
                        "from": {"data": "bars"},
                        "encode": {
                            "enter": {
                                "x": {"field": "x2", "offset": -5},
                                "y": {"field": "y", "offset": {"field": "height", "mult": 0.5}},
                                "fill": {"value": "white"},
                                "align": {"value": "right"},
                                "baseline": {"value": "middle"},
                                "text": {"field": "datum.value"}
                            }
                        }
                    }
                ]
            }
        ]
    };

    function image(view, type) {
        return function(event) {
            event.preventDefault();
            view.toImageURL(type).then(function(url) {
                var link = document.createElement('a');
                link.setAttribute('href', url);
                link.setAttribute('target', '_blank');
                link.setAttribute('download', 'bar-chart.' + type);
                link.dispatchEvent(new MouseEvent('click'));
            }).catch(function(error) { console.error(error); });
        };
    }

    var view = new vega.View(vega.parse(spec), {
        loader: vega.loader({baseURL: 'https://vega.github.io/vega/'}),
        logLevel: vega.Warn,
        renderer: 'canvas'
    }).initialize('#bar-chart').hover().run();
});