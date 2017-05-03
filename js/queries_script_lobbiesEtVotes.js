$(document).ready(function() {
    // init dataTables for Lobbies
    dataTablesLobbiesEtVotesInit();

    // All names of Lobbies on dropdown list
    var select = $("#select_lobbiesVotes");
    $.ajax({url: "/search_all_votes", dataType: 'json', success: function(result){
        if(result != null){
            select.append('<option value="0">Tous les votes</option>');
        }
        $.each(result, function() {
            select.append('<option value="'+this.affairId+'">'+this.affairTitle+'</option>');
        });
        select.select2();
    }});

    // votes select changed
    select.change(function() {
        var selected = $(this).val();
        var data = {};
        data.selected = selected;
        // update datatables
        dataTablesLobbiesEtVotesUpdate(data);
    });
});