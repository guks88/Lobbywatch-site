/**
 * Created by HugoCastanheiro on 14.06.17.
 */

$(document).ready(function() {
    // loading gif
    $(document).ajaxStart(function(){
        $('#loading').show();
    }).ajaxStop(function(){
        $('#loading').hide();
    });

    // All parlementarians on dropdown list
    var select = $("#select_parlementaires");
    $.ajax({url: "/search_all_parlamentarians", dataType: 'json', success: function(result){
        if(result != null){
            select.append('<option value="0">Tous les parlementaires</option>');
        }
        $.each(result, function() {
            select.append('<option value="'+this.id+'">'+this.parlementaires+'</option>');
        });
        select.select2();
    }});

    var selectAvecContre = $("#select_avecContre");
    selectAvecContre.append('<option value="'+2+'">Avec/Contre majorité parti</option>');
    selectAvecContre.append('<option value="'+1+'">Avec majorité parti</option>');
    selectAvecContre.append('<option value="'+0+'">Contre majorité parti</option>');
    selectAvecContre.select2();

    // parlamentarian select changed
    select.change(function() {
        var selected = $(this).val();
        var data = {};
        data.selected = selected;
    });

    // AvecContre select changed
    selectAvecContre.change(function() {
        var selected = $(this).val();
        var data = {};
        data.selected = selected;
    });
});