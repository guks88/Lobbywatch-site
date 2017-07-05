/**
 * Created by HugoCastanheiro on 26.06.17.
 */
var spec1 =
{
    "$schema": "https://vega.github.io/schema/vega/v3.0.json",
    "width": 700,
    "height": 16373,
    "padding": 5,
    "data": [
        {
            "name": "table",
            "url": "../data/averageParlamentariansPartis.json"
        }
    ],
    "scales": [
        {
            "name": "yscale",
            "type": "band",
            "domain": {"data": "table","field": "category"},
            "range": "height",
            "padding": 0.1
        },
        {
            "name": "xscale",
            "type": "linear",
            "domain": {"data": "table","field": "value"},
            "range": "width",
            "round": true,
            "zero": true,
            "nice": true
        },
        {
            "name": "color",
            "type": "ordinal",
            "domain": {"data": "table","field": "position"},
            "range": ["#008000","#FF0000"]
        },
        {
            "name": "colorStroke",
            "type": "ordinal",
            "domain": {"data": "table","field": "category"},
            "range": ["#000000"]
        }
    ],
    "axes": [
        {
            "orient": "left",
            "scale": "yscale",
            "tickSize": 0,
            "labelPadding": 4,
            "zindex": 1
        }
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
                "enter": {"y": {"scale": "yscale","field": "category"}}
            },
            "signals": [{"name": "height","update": "bandwidth('yscale')"}],
            "scales": [
                {
                    "name": "pos",
                    "type": "band",
                    "range": "height",
                    "domain": {"data": "facet","field": "position"}
                }
            ],
            "marks": [
                {
                    "name": "bars",
                    "from": {"data": "facet"},
                    "type": "rect",
                    "encode": {
                        "enter": {
                            "y": {"scale": "pos","field": "position"},
                            "height": {"scale": "pos","band": 1},
                            "x": {"scale": "xscale","field": "value"},
                            "x2": {"scale": "xscale","value": 0},
                            "fill": {"scale": "color","field": "position"},
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
                            "x": {"field": "x2","offset": 45},
                            "y": {
                                "field": "y",
                                "offset": {"field": "height","mult": 0.5}
                            },
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

var spec2 =
{
    "$schema": "https://vega.github.io/schema/vega/v3.0.json",
    "width": 700,
    "height": 100,
    "padding": 5,
    "data": [
        {
            "name": "table",
            "url": "../data/averageGeneralPartis.json"
        }
    ],
    "scales": [
        {
            "name": "yscale",
            "type": "band",
            "domain": {"data": "table","field": "category"},
            "range": "height"
        },
        {
            "name": "xscale",
            "type": "linear",
            "domain": {"data": "table","field": "value"},
            "range": "width",
            "round": true,
            "zero": true,
            "nice": true
        },
        {
            "name": "color",
            "type": "ordinal",
            "domain": {"data": "table","field": "position"},
            "range": ["#008000","#FF0000"]
        },
        {
            "name": "colorStroke",
            "type": "ordinal",
            "domain": {"data": "table","field": "category"},
            "range": ["#000000"]
        }
    ],
    "axes": [
        {
            "orient": "left",
            "scale": "yscale",
            "tickSize": 0,
            "labelPadding": 4,
            "zindex": 1
        }
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
                "enter": {"y": {"scale": "yscale","field": "category"}}
            },
            "signals": [{"name": "height","update": "bandwidth('yscale')"}],
            "scales": [
                {
                    "name": "pos",
                    "type": "band",
                    "range": "height",
                    "domain": {"data": "facet","field": "position"}
                }
            ],
            "marks": [
                {
                    "name": "bars",
                    "from": {"data": "facet"},
                    "type": "rect",
                    "encode": {
                        "enter": {
                            "y": {"scale": "pos","field": "position"},
                            "height": {"scale": "pos","band": 1},
                            "x": {"scale": "xscale","field": "value"},
                            "x2": {"scale": "xscale","value": 0},
                            "fill": {"scale": "color","field": "position"},
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
                            "x": {"field": "x2","offset": 45},
                            "y": {
                                "field": "y",
                                "offset": {"field": "height","mult": 0.5}
                            },
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

var spec3 =
{
    "$schema": "https://vega.github.io/schema/vega/v3.0.json",
    "width": 700,
    "height": 100,
    "padding": 5,
    "data": [],
    "scales": [
        {
            "name": "yscale",
            "type": "band",
            "domain": {"data": "table","field": "category"},
            "range": "height"
        },
        {
            "name": "xscale",
            "type": "linear",
            "domain": {"data": "table","field": "value"},
            "range": "width",
            "round": true,
            "zero": true,
            "nice": true
        },
        {
            "name": "color",
            "type": "ordinal",
            "domain": {"data": "table","field": "position"},
            "range": ["#008000","#FF0000"]
        },
        {
            "name": "colorStroke",
            "type": "ordinal",
            "domain": {"data": "table","field": "category"},
            "range": ["#000000"]
        }
    ],
    "axes": [
        {
            "orient": "left",
            "scale": "yscale",
            "tickSize": 0,
            "labelPadding": 4,
            "zindex": 1
        }
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
                "enter": {"y": {"scale": "yscale","field": "category"}}
            },
            "signals": [{"name": "height","update": "bandwidth('yscale')"}],
            "scales": [
                {
                    "name": "pos",
                    "type": "band",
                    "range": "height",
                    "domain": {"data": "facet","field": "position"}
                }
            ],
            "marks": [
                {
                    "name": "bars",
                    "from": {"data": "facet"},
                    "type": "rect",
                    "encode": {
                        "enter": {
                            "y": {"scale": "pos","field": "position"},
                            "height": {"scale": "pos","band": 1},
                            "x": {"scale": "xscale","field": "value"},
                            "x2": {"scale": "xscale","value": 0},
                            "fill": {"scale": "color","field": "position"},
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
                            "x": {"field": "x2","offset": 45},
                            "y": {
                                "field": "y",
                                "offset": {"field": "height","mult": 0.5}
                            },
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

var initVegaMoyennePartis = function(){
    $('#moyenneGenerale').append('<p style="text-align: center">Moyenne des parlementaires votant en accord ou en contradiction avec leur parti</p>');

    var view1 = new vega.View(vega.parse(spec2), {
        loader: vega.loader({baseURL: ''}),
        logLevel: vega.Warn,
        renderer: 'canvas'
    }).initialize('#moyenne_chart').hover().run();

    $('#moyenneTous').append('<p style="text-align: center">Proportions par parlementaire votant en accord ou en contradiction avec son parti</p>');

    var view2 = new vega.View(vega.parse(spec1), {
        loader: vega.loader({baseURL: ''}),
        logLevel: vega.Warn,
        renderer: 'canvas'
    }).initialize('#moyenne_chart_parlementaires').hover().run();
};

var avgMoyennePartis = function(){
    var intermediaire = [];
    var resParlamentarians = [];
    var table = [];
    var tableau = [];

    $.ajax({
        url: "/get_average_partis",
        method: 'get',
        dataType: 'json',
        success: function (result) {
            var oui = 0;
            var non = 0;
            var blanc = 0;
            $.each(result, function (index) {
                if(index+1 < result.length){
                    var thisId = result[index].idParti;
                    var nextId = result[index+1].idParti;
                }

                if(thisId == nextId){
                    if (this.vote == "Yes") {
                        oui = result[index].NbreVote;
                    } else if (this.vote == "No") {
                        non = result[index].NbreVote;
                    } else {
                        blanc += result[index].NbreVote;
                    }
                    return true;
                }else {
                    if (this.vote == "Yes") {
                        oui = result[index].NbreVote;
                    } else if (this.vote == "No") {
                        non = result[index].NbreVote;
                    } else {
                        blanc += result[index].NbreVote;
                    }
                    var val = 0;
                    var type = "";
                    if(oui>non){
                        if(oui>blanc){
                            val = oui;
                            type = "Yes";
                        }else{
                            val = blanc;
                            type = "White";
                        }
                    } else if(non > blanc){
                        val = non;
                        type = "No"
                    }else{
                        val = blanc;
                        type = "White";
                    }

                    intermediaire.push({
                        affairVoteId : this.affairVoteId,
                        idParti : this.idParti,
                        parti: this.parti,
                        majoritee: val,
                        vote: type
                    });

                    oui = 0;
                    non = 0;
                    blanc = 0;
                }
            });

            console.log(intermediaire);

            getResultPerParlamentarians();

        }
    });

    function getResultPerParlamentarians() {
        $.ajax({
            url: "/get_average_infosPartis",
            method: 'get',
            dataType: 'json',
            success: function (result) {
                var avec = 0;
                var contre = 0;
                var parlamentarian = "";
                $.each(result, function (index) {

                    var test = this;

                    if(index+1 < result.length){
                        var thisIdParl = result[index].councillorNumber;
                        var nextIdParl = result[index+1].councillorNumber;
                    }else{
                        nextIdParl = 0;
                    }

                    $.each(intermediaire, function(index){
                        if(test.Vote != "Yes" && test.Vote != "No"){
                                test.Vote = "White";
                        }
                            if(this.affairVoteId == test.affairVoteId) {
                                if (this.idParti == test.idParti) {
                                    if (this.vote == test.Vote) {
                                        avec++;
                                    } else {
                                        contre++;
                                    }
                                }else{
                                    return true;
                                }
                            }else{
                                return true;
                            }
                    });

                    if(thisIdParl != nextIdParl){
                        resParlamentarians.push({
                            idParti: this.idParti,
                            parti: this.parti,
                            avec: avec,
                            contre: contre,
                            idParlemantaire : this.councillorNumber,
                            parlementaire: this.parlementaires
                        });
                        avec = 0;
                        contre = 0;
                    }
                });
                console.log(JSON.stringify(resParlamentarians));

                getAverageGeneral();
            }
        });
    }

    function getAverageGeneral(){
        var totalAvec = 0;
        var totalContre = 0;

        $.each(resParlamentarians, function(){
            totalAvec += this.avec;
            totalContre += this.contre;
        });

        var total = totalAvec + totalContre;
        var avecRes = Math.round((totalAvec * 100) / total);
        var contreRes = Math.round((totalContre * 100) / total);

        var value = {
            "category": "MOYENNE",
            "position": 0,
            "value": Math.round(avecRes)
        }
        table.push(value);
        var value = {
            "category": "MOYENNE",
            "position": 1,
            "value": Math.round(contreRes)
        }
        table.push(value);

        console.log(JSON.stringify(table));

        getAverageParlamentarians();
    }

    function getAverageParlamentarians() {
        var totalAvec = 0;
        var totalContre = 0;

        $.each(resParlamentarians, function(){
            totalAvec += this.avec;
            totalContre += this.contre;

            var total = totalAvec + totalContre;
            var avecRes = Math.round((totalAvec * 100) / total);
            var contreRes = Math.round((totalContre * 100) / total);

            var value = {
                "category": this.parlementaire,
                "position": 0,
                "value": Math.round(avecRes),
                "idParlemantaire": this.idParlemantaire
            }
            tableau.push(value);
            var value = {
                "category": this.parlementaire,
                "position": 1,
                "value": Math.round(contreRes),
                "idParlemantaire": this.idParlemantaire
            }
            tableau.push(value);

            totalAvec = 0;
            totalContre = 0;
        })

        console.log(JSON.stringify(tableau));
    }
};

var changeVega = function(councillorNumber){
    var tableau = {};
    tableau.name = "table";
    tableau.values = [];
    var parlementaire = "";
    var i = 0;
    $.getJSON('../data/averageParlamentariansPartis.json', function(responseObject){
        $.each(responseObject, function(index){
            if(index+1 < responseObject.length){
                var thisParl = responseObject[index].idParlemantaire;
                var nextParl = responseObject[index+1].idParlemantaire;
            }else{
                nextParl = 0;
            }
            if(this.idParlemantaire == councillorNumber){
                parlementaire = this.category;
                var value = {
                    "category": this.category,
                    "position": i,
                    "value": this.value
                }
                tableau.values.push(value);
                i++;
                if(thisParl != nextParl){
                    return false;
                }
            }
        });

        displayVega(tableau);
    });

    function displayVega(tableau){
        spec3.data = tableau;

        $('#moyenneGenerale').empty();
        $('#moyenneGenerale').append('<p style="text-align: center">Proportions des votes en accord ou en contradiction avec le parti pour: ' + parlementaire + '</p>');
        $('#hidden').addClass("hidden");

        var view = new vega.View(vega.parse(spec3), {
            loader: vega.loader({baseURL: ''}),
            logLevel: vega.Warn,
            renderer: 'canvas'
        }).initialize('#moyenne_chart').hover().run();
    }
};

var getObjectaverageParlamentariansPartis = function(){
    $.getJSON('../data/averageParlamentariansPartis.json', function(result){
        var array = [];
        var big = 0;
        var udex = "";
        while(array.length != result.length){
            $.each(result, function(){
                var boolean = itIs(this, array);
                if(boolean == false) {
                    if (this.position == 0) {
                        if (this.value >= big) {
                            big = this.value;
                            udex = this.idParlemantaire;
                        }
                    }
                }
            });
            $.each(result, function(){
                if(this.idParlemantaire == udex){
                    array.push(this);
                    big = 0;
                }
            });
        }
        console.log(JSON.stringify(array));
    });
};

var tri = function(result){
    var array = [];
    var big = 0;
    var udex = "";
    while(array.length != result.length){
        $.each(result, function(){
            var boolean = itIs(this, array);
            if(boolean == false) {
                if (this.position == 0) {
                    if (this.value >= big) {
                        big = this.value;
                        udex = this.idParlemantaire;
                    }
                }
            }
        });
        $.each(result, function(){
            if(this.idParlemantaire == udex){
                array.push(this);
                big = 0;
            }
        });
    }
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

