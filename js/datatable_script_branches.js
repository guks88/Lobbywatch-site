/**
 * Created by HugoCastanheiro on 01.05.17.
 */
var dataTablesBranchesInit = function() {
    var data = {};
    data.selected = 0;
    $.ajax({
        url: "/search_all_branches_members_parties",
        method: 'get',
        dataType: 'json',
        data: data,
        success: function(result){
            $('#myTable').dataTable({
                data: result,
                columns:    [
                    //{'data': 'id'},
                    {'data': 'branches'},
                    {'data': 'parlementaires'},
                    {'data': 'groupe_politique'},
                    {'data': 'parti_politique'},
                ]
            });
        }
    });
}
var dataTableBranchesUpdate = function(data) {
    var dataTable = $('#myTable').DataTable();
    dataTable.clear();
    $.ajax({
        url: "/search_all_branches_members_parties",
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