var initVegaMoyenneLobbies = function (affairVoteId){
    var specOui =
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
                "domain": {"data": "table","field": "position"},
                "range": [ "#008000", "#FFFFFF", "#FF0000"  ]
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

    var specNon =
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
                "domain": {"data": "table","field": "position"},
                "range": [ "#008000" , "#FFFFFF", "#FF0000" ]
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
    getAverageOfLobby(affairVoteId, specOui, specNon);
};



var getAverageOfLobby = function(affairVoteId, specOui, specNon) {
    tableau_oui = {};
    tableau_non = {};
    var i = 0;
    tableau_oui.name = "table";
    tableau_oui.values = [];
    tableau_non.name = "table";
    tableau_non.values = [];

    $.ajax({
        url: "/get_average_vote_of_lobby",
        data: {affairVoteId: affairVoteId},
        method: 'get',
        dataType: 'json',
        success: function (result) {
            var votes = {};
            $.each(result, function (index) {
                var that = this;
                if (!(this.lobbies in votes)) {
                    votes[this.lobbies] = {
                        lobby: this.lobbies,
                        oui: 0,
                        non: 0,
                        blanc: 0
                    }
                }
                if (this.vote == "Yes") {
                    votes[this.lobbies].oui = result[index].nbreVote;
                } else if (this.vote == "No") {
                    votes[this.lobbies].non = result[index].nbreVote;
                } else {
                    votes[this.lobbies].blanc += result[index].nbreVote;
                }
                i=index;
            });

            $.each(votes, function () {
                var total = this.oui + this.non + this.blanc;
                var var_oui = Math.round((this.oui * 100) / total);
                var var_blanc = Math.round((this.blanc * 100) / total);
                var var_non = Math.round((this.non * 100) / total);

                var value_oui = {
                    "category": this.lobby,
                    "position": 0,
                    "value": var_oui
                }
                window[var_oui > var_non ? 'tableau_oui' : 'tableau_non'].values.push(value_oui);
                var value_white = {
                    "category": this.lobby,
                    "position": 1,
                    "value": var_blanc
                }
                window[var_oui > var_non ? 'tableau_oui' : 'tableau_non'].values.push(value_white);
                var value_non = {
                    "category": this.lobby,
                    "position": 2,
                    "value": var_non
                }
                window[var_oui > var_non ? 'tableau_oui' : 'tableau_non'].values.push(value_non);
            });

            if(tableau_oui.values.length > 0 && tableau_non.values.length > 0){
                $('#colonneUn').removeClass("hidden");
                $('#colonneDeux').removeClass("hidden");

                specOui.height = (tableau_oui.values.length/3)*100;
                specNon.height = (tableau_non.values.length/3)*100;
                specOui.width = 300;
                specNon.width = 300;

                specOui.data = tableau_oui;
                specNon.data = tableau_non;

                var viewOui = new vega.View(vega.parse(specOui), {
                    loader: vega.loader({baseURL: ''}),
                    logLevel: vega.Warn,
                    renderer: 'canvas'
                }).initialize('#moyenne_chart_lobbies_Oui').hover().run();

                var viewNon = new vega.View(vega.parse(specNon), {
                    loader: vega.loader({baseURL: ''}),
                    logLevel: vega.Warn,
                    renderer: 'canvas'
                }).initialize('#moyenne_chart_lobbies_Non').hover().run();

            }else{
                $('#uneColonne').removeClass("hidden");

                if(tableau_oui.values.length == 0){
                    specNon.height = (tableau_non.values.length/3)*100;
                    specNon.data = tableau_non;
                    $('#moyenneTous').append('<p style="text-align: center">Lobbies du non</p>');

                    var view = new vega.View(vega.parse(specNon), {
                        loader: vega.loader({baseURL: ''}),
                        logLevel: vega.Warn,
                        renderer: 'canvas'
                    }).initialize('#moyenne_chart_lobbies').hover().run();
                }else{
                    specOui.height = (tableau_oui.values.length/3)*100;
                    specOui.data = tableau_oui;
                    $('#moyenneTous').append('<p style="text-align: center">Lobbies du oui</p>');

                    var view = new vega.View(vega.parse(specOui), {
                        loader: vega.loader({baseURL: ''}),
                        logLevel: vega.Warn,
                        renderer: 'canvas'
                    }).initialize('#moyenne_chart_lobbies').hover().run();
                }
            }
        }
    });
};

