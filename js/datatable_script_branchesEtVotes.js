var dataTablesBranchesEtVotesInit = function(){
    var data = {};
    data.selected = 0;
    $.ajax({
        url: "/search_all_votes_selected_changed",
        method: 'get',
        dataType: 'json',
        data: data,
        success: function(result){
            $('#myTable').DataTable({
                data: result,
                columns:[
                    //{'data': 'affairId', sClass: "hidden"},
                    {'data': 'affairTitle', sClass: "clickable"},
                    {'data': 'meaningYes'},
                    {'data': 'meaningNo'},
                    {'data': 'date'},
                    {'data': 'affairVoteId', sClass: "hidden"},
                ]
            });
            dataTablesOnClick();
        }
    });
};

var dataTablesBranchesEtVotesUpdate = function(data) {
    var dataTable = $('#myTable').DataTable();
    dataTable.clear();
    $.ajax({
        url: "/search_all_votes_selected_changed",
        method: 'get',
        dataType: 'json',
        data: data,
        success: function(result){
            dataTable.clear();
            dataTable.rows.add(result);
            dataTable.draw();
        }
    });
};

// select the vote in datatable
var dataTablesOnClick = function(){
    var dataTable = $('#myTable').DataTable();
    var affairVoteId;
    $('#myTable tbody').on( 'click', 'tr', function () {
        affairVoteId = dataTable.row( $(this) ).data().affairVoteId;
        displayInfo(affairVoteId);
    });
};

var dataTablesBranchesEtVotesSelected = function(affairVoteId){
    $.ajax({
        url: "/get_infos_vote_of_branche_selected",
        method: 'get',
        dataType: 'json',
        data: {affairVoteId: affairVoteId, selected: 1},
        success: function(result){
            $('#tableInfos').DataTable({
                data: result,
                columns:[
                    {'data': 'parlementaires'},
                    {'data': 'votes'},
                ]
            });
        }
    });
};

var dataTablesBranchesEtVotesUpdateSelected = function(affairVoteId, selected) {
    $('#parlementairesVotesContent').removeClass("hidden");
    $('#TableInfosVote').removeClass("hidden");
    var dataTable = $('#tableInfos').DataTable();
    dataTable.clear();
    $.ajax({
        url: "/get_infos_vote_of_branche_selected",
        method: 'get',
        dataType: 'json',
        data: {affairVoteId: affairVoteId, selected: selected},
        success: function(result){
            dataTable.clear();
            dataTable.rows.add(result);
            dataTable.draw();
        }
    });
};
