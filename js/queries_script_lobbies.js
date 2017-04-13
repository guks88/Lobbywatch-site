// All Lobbies
$(document).ready(function() {
    var select = $(".lobby_select");
    if (select.length > 0) {
        select.append("<option value='0'>Tous les lobbies</option>");
        $.ajax({url: "/search_all_lobbies", dataType: 'json', success: function(result){
            $.each(result, function() {
                select.append("<option value='"+this.id+"'>"+this.name_fr+"</option>");
            });
        }});
    }
});