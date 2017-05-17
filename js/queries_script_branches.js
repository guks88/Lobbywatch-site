// All Branches
$(document).ready(function() {
    // loading gif
    $(document).ajaxStart(function(){
        $('#loading').show();
    }).ajaxStop(function(){
        $('#loading').hide();
    });

    // init dataTables for Branches
    dataTablesBranchesInit();

    // All names of Branches on dropdown list
    var select = $("#select_branches");
    $.ajax({url: "/search_all_branches", dataType: 'json', success: function(result){
        if(result != null){
            select.append('<option value="0">Toutes les branches</option>');
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

    // Branches select changed
    select.change(function() {
        var selected = $(this).val();
        var data = {};
        data.selected = selected;
        // update datatables
        dataTableBranchesUpdate(data);
    });
});