var dataTablesLobbiesEtVotesInit = function() {
    var data = {};
    data.selected = 0;
    $.ajax({
        url: "/search_all_votes",
        method: 'get',
        dataType: 'json',
        data: data,
        success: function(result){
            $('#myTable').dataTable({
                data: result,
                columns:    [
                    //{'data': 'id'},
                    {'data': 'date'},
                    {'data': 'affairTitle'},
                ]
            });
        }
    });
}
var dataTablesLobbiesEtVotesUpdate = function(data) {
    var dataTable = $('#myTable').DataTable();
    dataTable.clear();
    $.ajax({
        url: "/search_all_votes",
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