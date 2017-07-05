var dataTablesParlementairesLobbiesInit = function(){
    var data = {};
    data.selected = 0;
    $.ajax({
        url: "/get_average_lobbies_parlementaireSelected",
        method: 'get',
        dataType: 'json',
        data: data,
        success: function(result){
            $('#myTable').dataTable({
                data: result,
                columns:[
                    {'data': 'affairVoteID', sClass: "hidden"},
                    {'data': 'titreAffaire'},
                    {'data': 'significationOui'},
                    {'data': 'significationNon'},
                    {'data': 'lobbies'},
                    {'data': 'majoriteLobby'},
                    {'data': 'voteParlementaire'}
                ]
            });
        }
    });
}

var dataTablesParlementairesLobbiesUpdate = function(councillorNumber) {
    $('#removeHidden').removeClass("hidden");
    var dataTable = $('#myTable').DataTable();
    dataTable.clear();
    $.ajax({
        url: "/get_average_lobbies_parlementaireSelected",
        method: 'get',
        dataType: 'json',
        data: {selected: councillorNumber},
        success: function(result) {
            dataTable.clear();
            dataTable.rows.add(result);
            dataTable.draw();
        }
    });
};

var updateDataTablesAvecContre = function(selected, selected2){
    var dataTable = $('#myTable').DataTable();
    dataTable.clear();
    $.ajax({
        url: "/get_average_lobbies_parlementaireSelected",
        method: 'get',
        dataType: 'json',
        data: {selected: selected, selected2: selected2},
        success: function(result) {
            dataTable.clear();
            dataTable.rows.add(result);
            dataTable.draw();
        }
    });
};
