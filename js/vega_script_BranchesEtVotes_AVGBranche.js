var initVegaMoyenneBranches = function (affairVoteId){
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
                "range": [ "#008000", "#FFFFFF", "#FF0000" ]
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
                                "x": {"field": "x2", "offset": 45},
                                "y": {"field": "y", "offset": {"field": "height", "mult": 0.5}},
                                "fill": {"value": "black"},
                                "align": {"value": "right"},
                                "baseline": {"value": "middle"},
                                "fontSize": {"value": 17},
                                "fontWeight": {"value": "bold"},
                                "text": {"signal": "datum.datum.value + '%'"}
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
                "range": [ "#008000", "#FFFFFF", "#FF0000" ]
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
                                "x": {"field": "x2", "offset": 45},
                                "y": {"field": "y", "offset": {"field": "height", "mult": 0.5}},
                                "fill": {"value": "black"},
                                "align": {"value": "right"},
                                "baseline": {"value": "middle"},
                                "fontSize": {"value": 17},
                                "fontWeight": {"value": "bold"},
                                "text": {"signal": "datum.datum.value + '%'"}
                            }
                        }
                    }
                ]
            }
        ]
    };

    getAverageOfbranche(affairVoteId, specNon, specOui);
};

var getAverageOfbranche = function(affairVoteId, specOui, specNon) {
    tableau_oui = {};
    tableau_non = {};
    var i = 0;
    tableau_oui.name = "table";
    tableau_oui.values = [];
    tableau_non.name = "table";
    tableau_non.values = [];
    tableau_oui

    $.ajax({
        url: "/get_average_vote_of_branche",
        data: {affairVoteId: affairVoteId},
        method: 'get',
        dataType: 'json',
        success: function (result) {
            var votes = {};
            $.each(result, function (index) {
                var that = this;
                if (!(this.branches in votes)) {
                    votes[this.branches] = {
                        branche: this.branches,
                        oui: 0,
                        non: 0,
                        blanc: 0,
                        brancheID: this.brancheId
                    }
                }
                if (this.vote == "Yes") {
                    votes[this.branches].oui = result[index].nbreVote;
                } else if (this.vote == "No") {
                    votes[this.branches].non = result[index].nbreVote;
                } else {
                    votes[this.branches].blanc += result[index].nbreVote;
                }
                i=index;
            });

            $.each(votes, function () {
                var total = this.oui + this.non + this.blanc;
                var var_oui = Math.round((this.oui * 100) / total);
                var var_blanc = Math.round((this.blanc * 100) / total);
                var var_non = Math.round((this.non * 100) / total);

                var value_oui = {
                    "category": this.branche,
                    "position": 0,
                    "value": var_oui,
                    "idBranche": this.brancheID
                }
                window[var_oui > var_non ? 'tableau_oui' : 'tableau_non'].values.push(value_oui);
                var value_white = {
                    "category": this.branche,
                    "position": 1,
                    "value": var_blanc,
                    "idBranche": this.brancheID
                }
                window[var_oui > var_non ? 'tableau_oui' : 'tableau_non'].values.push(value_white);
                var value_non = {
                    "category": this.branche,
                    "position": 2,
                    "value": var_non,
                    "idBranche": this.brancheID
                }
                window[var_oui > var_non ? 'tableau_oui' : 'tableau_non'].values.push(value_non);
            });

            tableau_oui.values = triVegaOui(tableau_oui.values);
            tableau_non.values =  triVegaNon(tableau_non.values);

            displayTableauOuiNon(tableau_oui, tableau_non, specOui, specNon);
        }
    });
};

var displayTableauOuiNon = function(tableau_oui, tableau_non, specOui, specNon){
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
        }).initialize('#moyenne_chart_branches_Oui').hover().run();

        var viewNon = new vega.View(vega.parse(specNon), {
            loader: vega.loader({baseURL: ''}),
            logLevel: vega.Warn,
            renderer: 'canvas'
        }).initialize('#moyenne_chart_branches_Non').hover().run();

    }else{
        $('#uneColonne').removeClass("hidden");

        if(tableau_oui.values.length == 0){
            specNon.height = (tableau_non.values.length/3)*100;
            specNon.data = tableau_non;
            $('#moyenneTous').append('<p style="text-align: center">Branches du non</p>');

            var view = new vega.View(vega.parse(specNon), {
                loader: vega.loader({baseURL: ''}),
                logLevel: vega.Warn,
                renderer: 'canvas'
            }).initialize('#moyenne_chart_branches').hover().run();
        }else{
            specOui.height = (tableau_oui.values.length/3)*100;
            specOui.data = tableau_oui;
            $('#moyenneTous').append('<p style="text-align: center">Branches du oui</p>');

            var view = new vega.View(vega.parse(specOui), {
                loader: vega.loader({baseURL: ''}),
                logLevel: vega.Warn,
                renderer: 'canvas'
            }).initialize('#moyenne_chart_branches').hover().run();
        }
    }
}

var triVegaOui = function(tableau){
    var array = [];
    var big = 0;
    var udex = 0;

    while(array.length != tableau.length){
        $.each(tableau, function(){
            var boolean = itIs(this, array);
            if(boolean == false) {
                if (this.position == 0) {
                    if (this.value >= big) {
                        big = this.value;
                        udex = this.idBranche;
                    }
                }
            }
        });
        $.each(tableau, function(){
            if(this.idBranche == udex){
                array.push(this);
                big = 0;
            }
        });
    };

    return array;
};

var triVegaNon = function(tableau){
    var array = [];
    var big = 0;
    var udex = 0;

    while(array.length != tableau.length){
        $.each(tableau, function(){
            var boolean = itIs(this, array);
            if(boolean == false) {
                if (this.position == 2) {
                    if (this.value >= big) {
                        big = this.value;
                        udex = this.idBranche;
                    }
                }
            }
        });
        $.each(tableau, function(){
            if(this.idBranche == udex){
                array.push(this);
                big = 0;
            }
        });
    };

    return array;
};

var itIs = function(object, tableau){
    var boolean = false;

    $.each(tableau, function(){
        if(object == this){
            boolean = true;
            return false;
        }
    });

    return boolean;

};
