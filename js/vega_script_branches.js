/**
 * Created by HugoCastanheiro on 01.05.17.
 */
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
                "url": "/search_all_branches_size?selected=0",
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
                "domain": {"data": "tree","field": "parent"},
                "range": [ "#18bc9c", "#18bc9c", "#F44336", "#EF9A9A", "#00BCD4", "#009688", "#CDDC39", "#C6FF00", "#4CAF50", "#6200EA", "#FFC107","#2196F3", "#795548", "#1DE9B6", "#81C784", "#FF8F00"]
            }
        ],

        "marks": [
            {
                "type": "symbol",
                "from": {"data": "tree"},
                "encode": {
                    "enter": {
                        "shape": {"value": "circle"},
                        "fill": {"scale": "color", "field": "id"},
                        "tooltip": {"signal": "datum.name + (datum.size ? ', ' + datum.size + ' membres' : '')"}
                    },
                    "update": {
                        "x": {"field": "x"},
                        "y": {"field": "y"},
                        "size": {"signal": "4 * datum.r * datum.r"},
                        "stroke": {"value": "white"},
                        "strokeWidth": {"value": 0}
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