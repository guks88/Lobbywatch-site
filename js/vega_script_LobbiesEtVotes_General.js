var initVegaMoyenne = function(affairVoteId) {
    var spec =
    {
        "$schema": "https://vega.github.io/schema/vega/v3.0.json",
        "width": 500,
        "height": 100,

        "data": [],
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
                "domain": {"data": "table","field": "category"},
                "range": [ "#FF0000", "#008000", "#FFFFFF"]
            },
            {
                "name": "colorStroke",
                "type": "ordinal",
                "domain": {"data": "table","field": "category"},
                "range": ["#000000"]
            }
        ],

        "axes": [
            {"orient": "left", "scale": "yscale", "tickSize": 0, "labelPadding": 4, "zindex": 1}
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
                                "fill": {"scale": "color", "field": "position"},
                                "stroke": {"scale": "colorStroke","field": "category"},
                                "strokeWidth": {"value": 1}
                            }
                        }
                    },
                    {
                        "type": "text",
                        "from": {"data": "bars"},
                        "encode": {
                            "enter": {
                                "x": {"field": "x2", "offset": 30},
                                "y": {"field": "y", "offset": {"field": "height", "mult": 0.5}},
                                "fill": {"value": "black"},
                                "align": {"value": "right"},
                                "baseline": {"value": "middle"},
                                "fontSize": {"value": 17},
                                "fontWeight": {"value": "bold"},
                                "text": {"field": "datum.value"}
                            }
                        }
                    }
                ]
            }
        ]
    };

    getAverage(affairVoteId, spec);

};

var getAverage = function(affairVoteId, spec) {
    var table = {};
    $.ajax({
        url: "/get_average_vote",
        data: {affairVoteId: affairVoteId},
        method: 'get',
        dataType: 'json',
        success: function (result) {
            table.name = "table";
            table.values = [];
            var total = result[0].nbreOui + result[0].nbreBlanc + result[0].nbreNon;
            var oui = (result[0].nbreOui*100)/total;
            var blanc = (result[0].nbreBlanc*100)/total;
            var non = (result[0].nbreNon*100)/total;
            var value = {
                "category": "MOYENNE",
                "position": 0,
                "value": Math.round(oui)
            }
            table.values.push(value);
            value = {
                "category": "MOYENNE",
                "position": 1,
                "value": Math.round(blanc)
            };
            table.values.push(value);
            value = {
                "category": "MOYENNE",
                "position": 2,
                "value": Math.round(non)
            };
            table.values.push(value);

            spec.data = table;

            var view = new vega.View(vega.parse(spec), {
                loader: vega.loader({baseURL: ''}),
                logLevel: vega.Warn,
                renderer: 'canvas'
            }).initialize('#moyenne_chart').hover().run();
        }
    });
};

