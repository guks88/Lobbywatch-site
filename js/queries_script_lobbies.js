$(document).ready(function() {
    // All names of Lobbies on dropdown list
    var select = $(".lobby_select");
    if (select.length > 0) {
        select.append("<option value='0'>Tous les lobbies</option>");
        $.ajax({url: "/search_all_lobbies", dataType: 'json', success: function(result){
            $.each(result, function() {
                select.append("<option value='"+this.id+"'>"+this.name_fr+"</option>");
            });
        }});
    }else{
        console.log("No data in DB");
    }
});

$(document).ready(function() {
   var selected = $(".lobby_select").val();
    if(selected == 0){
        return;
    }else{
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
    }
});