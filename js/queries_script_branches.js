// All Branches
$(document).ready(function() {
    var select = $(".branche_select");
    if (select.length > 0) {
        select.append("<option value='0'>Toutes les branches</option>");
        $.ajax({url: "/search_all_branches", dataType: 'json', success: function(result){
            $.each(result, function() {
                select.append("<option value='"+this.id+"'>"+this.name_fr+"</option>");
            });
        }});
    }
});