var dataTablesLobbiesInit = function() {
    var data = {};
    data.selected = 0;
    $.ajax({
        url: "/search_all_lobbies_members_parties",
        method: 'get',
        dataType: 'json',
        data: data,
        success: function(result){
            $('#myTable').dataTable({
                data: result,
                columns:    [
                    //{'data': 'id'},
                    {'data': 'lobbies'},
                    {'data': 'parlementaires'},
                    {'data': 'groupe_politique'},
                    {'data': 'parti_politique'},
                ]
            });
        }
    });
}
var dataTableLobbiesUpdate = function(data) {
    var dataTable = $('#myTable').DataTable();
    dataTable.clear();
    $.ajax({
        url: "/search_all_lobbies_members_parties",
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