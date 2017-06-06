var dataTablesLobbiesEtVotesInit = function(){
    var data = {};
    data.selected = 0;
    $.ajax({
        url: "/search_all_votes_selected_changed",
        method: 'get',
        dataType: 'json',
        data: data,
        success: function(result){
            $('#myTable').dataTable({
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
}

var dataTablesLobbiesEtVotesUpdate = function(data) {
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