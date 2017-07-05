/**
 * Created by HugoCastanheiro on 29.06.17.
 */

/**
 * Created by HugoCastanheiro on 26.06.17.
 */

var spec1 =
{
    "$schema": "https://vega.github.io/schema/vega/v3.0.json",
    "width": 700,
    "height": 16000,
    "padding": 5,
    "data": [
        {
            "name": "table",
            "url": "../data/averageOfAverageParlamentariansLobbies.json"
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
            "url": "../data/averageGeneralLobbies.json"
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

var initVegaMoyenneLobbies = function(){
    $('#moyenneGenerale').append('<p style="text-align: center">Moyenne des parlementaires votant en accord ou en contradiction avec leurs lobbies respectifs</p>');

    var view1 = new vega.View(vega.parse(spec2), {
        loader: vega.loader({baseURL: ''}),
        logLevel: vega.Warn,
        renderer: 'canvas'
    }).initialize('#moyenne_chart').hover().run();

    $('#moyenneTous').append('<p style="text-align: center">Proportions par parlementaire votant en accord ou en contradiction avec ses lobbies respectifs</p>');

    var view2 = new vega.View(vega.parse(spec1), {
        loader: vega.loader({baseURL: ''}),
        logLevel: vega.Warn,
        renderer: 'canvas'
    }).initialize('#moyenne_chart_parlementaires').hover().run();
};

var avgMoyenneLobbies = function(){
    var intermediaire = [];
    var resParlamentarians = [];

    $.ajax({
        url: "/get_average_lobby",
        method: 'get',
        dataType: 'json',
        success: function (result) {
            var oui = 0;
            var non = 0;
            var blanc = 0;
            $.each(result, function (index) {
                if(index+1 < result.length){
                    var thisId = result[index].lobbyId;
                    var nextId = result[index+1].lobbyId;
                }

                if(thisId == nextId){
                    if (this.Vote == "Yes") {
                        oui = result[index].NbreVote;
                    } else if (this.Vote == "No") {
                        non = result[index].NbreVote;
                    } else {
                        blanc += result[index].NbreVote;
                    }
                    return true;
                }else {
                    if (this.Vote == "Yes") {
                        oui = result[index].NbreVote;
                    } else if (this.Vote == "No") {
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
                        lobbyID : this.lobbyId,
                        lobby: this.lobbies,
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
        var array = allCouncillorNumbers();
        console.log(array);

        $.each(array, function () {
            $.ajax({
                url: "/get_average_infosLobbies",
                method: 'get',
                data: {councillorNumber: this},
                dataType: 'json',
                async: false,
                success: function (result) {
                    var avec = 0;
                    var contre = 0;
                    var parlamentarian = "";
                    $.each(result, function (index) {
                        if(index+1 < result.length){
                            var thisLobby = result[index].lobbyID;
                            var nextLobby = result[index+1].lobbyID;
                        }else{
                            nextLobby = 0;
                        }

                        var test = this;

                        $.each(intermediaire, function (index) {
                            if (test.councillorVote != "Yes" && test.councillorVote != "No") {
                                test.councillorVote = "White";
                            }
                            if (this.affairVoteId == test.affairVoteId) {
                                if (this.lobbyID == test.lobbyID) {
                                    if (this.vote == test.councillorVote) {
                                        avec++;
                                    } else {
                                        contre++;
                                    }
                                } else {
                                    return true;
                                }
                            } else {
                                return true;
                            }
                        });

                        if(thisLobby != nextLobby){
                            resParlamentarians.push({
                                lobbyID: this.lobbyID,
                                lobby: this.lobbies,
                                avec: avec,
                                contre: contre,
                                idParlemantaire: this.councillorNumber,
                                parlementaire: this.parlementaires
                            });
                            avec = 0;
                            contre = 0;
                        }
                    });
                }
            });
        });
        console.log(JSON.stringify(resParlamentarians));
        getAverageGeneral();
    }
};

var getAverage = function (){
    var totalAvec = 0;
    var totalContre = 0;
    var table = [];
    var tableau = [];

    $.getJSON('../data/resParlamentariansLobbies.json', function(responseObject) {
        $.each(responseObject, function () {
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
    });

    function getAverageParlamentarians() {
        var totalAvec = 0;
        var totalContre = 0;

        $.getJSON('../data/resParlamentariansLobbies.json', function(responseObject) {
            $.each(responseObject, function(){
                totalAvec += this.avec;
                totalContre += this.contre;

                var total = totalAvec + totalContre;
                var avecRes = Math.round((totalAvec * 100) / total);
                var contreRes = Math.round((totalContre * 100) / total);

                var value = {
                    "category": this.parlementaire + " - " + this.lobby,
                    "position": 0,
                    "value": Math.round(avecRes),
                    "idParlemantaire": this.idParlemantaire,
                    "idLobby": this.lobbyID
                }
                tableau.push(value);
                var value = {
                    "category": this.parlementaire + " - " + this.lobby,
                    "position": 1,
                    "value": Math.round(contreRes),
                    "idParlemantaire": this.idParlemantaire,
                    "idLobby": this.lobbyID
                }
                tableau.push(value);

                totalAvec = 0;
                totalContre = 0;
            });
            console.log(JSON.stringify(tableau));
        });
    }
};

var changeVega = function(councillorNumber){
    var tableau = {};
    tableau.name = "table";
    tableau.values = [];
    var parlementaire1 = "";
    var parlementaire2 = "";
    var i = 0;
    $.getJSON('../data/averageParlamentariansLobbies.json', function(responseObject){
        $.each(responseObject, function(index){
            if(index+1 < responseObject.length){
                var thisParl = responseObject[index].idParlemantaire;
                var nextParl = responseObject[index+1].idParlemantaire;
            }else{
                nextParl = 0;
            }
            if(this.idParlemantaire == councillorNumber){
                parlementaire1 = this.category;
                parlementaire1 = parlementaire1.substring(parlementaire1.indexOf("- ") + 1, parlementaire1.length );
                parlementaire2 = this.category;
                parlementaire2 = parlementaire2.substring(0, parlementaire2.indexOf(" - "));
                var value = {
                    "category": parlementaire1,
                    "position": this.position,
                    "value": this.value,
                    "idLobby": this.idLobby,
                    "idParlementaire": this.idParlementaire
                }
                tableau.values.push(value);
                i++;
                if(thisParl != nextParl){
                    return false;
                }
            }
        });

        tableau.values = tri(tableau.values);

        displayVega(tableau);
    });

    function displayVega(tableau){
        spec3.height = (tableau.values.length/2) * 100;
        spec3.data = tableau;

        $('#moyenneGenerale').empty();
        $('#moyenneGenerale').append('<p style="text-align: center">Proportions des votes en accord ou en contradiction par lobby pour: ' + parlementaire2 + '</p>');
        $('#hidden').addClass("hidden");

        var view = new vega.View(vega.parse(spec3), {
            loader: vega.loader({baseURL: ''}),
            logLevel: vega.Warn,
            renderer: 'canvas'
        }).initialize('#moyenne_chart').hover().run();
    }
};


var allCouncillorNumbers = function(){
    var councillorNumbers = [];
    $.ajax({
        url: "/get_councillorNumbers",
        method: 'get',
        dataType: 'json',
        async: false,
        success: function (result) {
            $.each(result, function(){
                councillorNumbers.push(this.councillorNumber);
            });
        }
    });
    return councillorNumbers;
};

var averageOfAverageParlamentariansLobbies = function(){
    $.getJSON('../data/averageParlamentariansLobbies.json', function(result){
        var totalAvec = 0;
        var totalContre = 0;
        var tableau = {};
        tableau.name = "table";
        tableau.values = [];
        var parlementaire = "";

        var test = result;

        $.each(test, function(index){
            parlementaire = this.category;
            parlementaire = parlementaire.substring(0, parlementaire.indexOf(" - "));

            if(index+1 < test.length){
                var thisId = test[index].idParlemantaire;
                var nextId = test[index+1].idParlemantaire;
            }
            if(thisId == nextId){
                if(this.position == 0){
                    totalAvec += this.value;
                }else{
                    totalContre += this.value;
                }
            }else{
                if(this.position == 0){
                    totalAvec += this.value;
                }else{
                    totalContre += this.value;
                }
                var total = totalAvec + totalContre;
                var avecRes = Math.round((totalAvec * 100) / total);
                var contreRes = Math.round((totalContre * 100) / total);

                var value = {
                    "category": parlementaire,
                    "position": 0,
                    "value": Math.round(avecRes)
                }
                tableau.values.push(value);
                var value = {
                    "category": parlementaire,
                    "position": 1,
                    "value": Math.round(contreRes)
                }
                tableau.values.push(value);
                totalAvec = 0;
                totalContre = 0;
            }
        });

        tableau.values = tri(tableau.values);

        console.log(JSON.stringify(tableau.values));
    });
};

var getObjectaverageParlamentariansLobbies = function(){
    $.getJSON('../data/averageParlamentariansLobbies.json', function(result){
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
                        udex = this.category;
                    }
                }
            }
        });
        $.each(result, function(){
            if(this.category == udex){
                array.push(this);
                big = 0;
            }
        });
    }
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
