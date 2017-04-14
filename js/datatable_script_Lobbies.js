$(document).ready(function(){
    $.ajax({url: "/search_all_lobbies_members_parties",method: 'post', dataType: 'json', success: function(result){
        console.log(result);
        $('#myTable').dataTable({
            data: result,
            columns:    [
                //{'data': 'id'},
                {'data': 'name_fr'},
                {'data': 'name'},
                {'data': 'abkuerzung_fr'},
            ]
        });
    }});
});

