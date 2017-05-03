$(document).ready(function() {
      var spec = {
            "$schema": "https://vega.github.io/schema/vega/v3.0.json",
            "width": 600,
            "height": 600,
            "padding": 5,
            "autosize": "none",

            "data": [
                {
                    "name": "tree",
                    "url": "/search_all_lobbies_size?selected=0",
                    //"url": "../data/lobbies.json",
                    "transform": [
                        {
                            "type": "stratify",
                            "key": "id",
                            "parentKey": "parent"
                        },
                        {
                            "type": "pack",
                            "field": "size",
                            "sort": {"field": "name"},
                            "size": [{"signal": "width"}, {"signal": "height"}]
                        }
                    ]
                }
            ],

            "scales": [
                {
                    "name": "color",
                    "type": "ordinal",
                    "range": {"scheme": "category20"}
                }
            ],

            "marks": [
                {
                    "type": "symbol",
                    "from": {"data": "tree"},
                    "encode": {
                        "enter": {
                            "shape": {"value": "circle"},
                            "fill": {"scale": "color", "field": "depth"},
                            "tooltip": {"signal": "datum.name + (datum.size ? ', ' + datum.size + ' membres' : '')"}
                        },
                        "update": {
                            "x": {"field": "x"},
                            "y": {"field": "y"},
                            "size": {"signal": "4 * datum.r * datum.r"},
                            "stroke": {"value": "white"},
                            "strokeWidth": {"value": 1}
                        },
                        "hover": {
                            "stroke": {"value": "black"},
                            "strokeWidth": {"value": 2}
                        }
                    }
                }
            ]
        };

    var view = new vega.View(vega.parse(spec), {
        loader: vega.loader({baseURL: ''}),
        logLevel: vega.Warn,
        renderer: 'canvas'
    }).initialize('#circle_packing').hover().run();
});