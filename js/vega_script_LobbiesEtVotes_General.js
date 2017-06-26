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
            $('#moyenneGenerale').append('<p style="text-align: center">Moyenne générale sur tous les lobbies</p>');

            spec.data = table;

            var view = new vega.View(vega.parse(spec), {
                loader: vega.loader({baseURL: ''}),
                logLevel: vega.Warn,
                renderer: 'canvas'
            }).initialize('#moyenne_chart').hover().run();
        }
    });
};

var chartLobbiesEtVotesUpdate = function(affairVoteId, selected){
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

    console.log(affairVoteId, selected);
    getAverageOfSelected(affairVoteId, selected, spec);
};

var getAverageOfSelected = function(affairVoteId, selected, spec){
    var tableau = {};
    var i = 0;
    tableau.name = "table";
    tableau.values = [];
    var nomLobby;

    $.ajax({
        url: "/get_average_vote_of_lobby_selected",
        data: {affairVoteId: affairVoteId, selected: selected},
        method: 'get',
        dataType: 'json',
        success: function (result) {
            var votes = {};
            $.each(result, function (index) {
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
            });

            $.each(votes, function () {
                var total = this.oui + this.non + this.blanc;
                var var_oui = Math.round((this.oui * 100) / total);
                var var_blanc = Math.round((this.blanc * 100) / total);
                var var_non = Math.round((this.non * 100) / total);
                nomLobby = this.lobby;

                var value_oui = {
                    "category": this.lobby,
                    "position": 0,
                    "value": var_oui
                }
                tableau.values.push(value_oui);
                var value_white = {
                    "category": this.lobby,
                    "position": 1,
                    "value": var_blanc
                }
                tableau.values.push(value_white);
                var value_non = {
                    "category": this.lobby,
                    "position": 2,
                    "value": var_non
                }
                tableau.values.push(value_non);
            });
            $('#uneColonne').addClass("hidden");
            $('#colonneUn').addClass("hidden");
            $('#colonneDeux').addClass("hidden");
            $('#moyenneGenerale').empty();
            $('#moyenneGenerale').append('<p style="text-align: center">Moyenne pour le lobby : ' + nomLobby + '</p>');

            spec.data = tableau;

            var view = new vega.View(vega.parse(spec), {
                loader: vega.loader({baseURL: ''}),
                logLevel: vega.Warn,
                renderer: 'canvas'
            }).initialize('#moyenne_chart').hover().run();
        }
    });
};

