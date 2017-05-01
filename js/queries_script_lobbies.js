$(document).ready(function() {
    // init dataTables for Lobbies
    dataTablesLobbiesInit();

    // All names of Lobbies on dropdown list
    var select = $("#select_lobbies");
    $.ajax({url: "/search_all_lobbies", dataType: 'json', success: function(result){
        if(result != null){
            select.append('<option value="0">Tous les lobbies</option>');
        }
        $.each(result, function() {
            select.append('<option value="'+this.id+'">'+this.name_fr+'</option>');
        });
        select.select2();

        var parentElement = $(".select2-dropdown--above");
        $(".js-example-basic-single").select2({
            dropdownParent: parentElement
        });
    }});

    // lobbies select changed
    select.change(function() {
        var selected = $(this).val();
        var data = {};
        data.selected = selected;
        // update datatables
        dataTableLobbiesUpdate(data);
    });
});