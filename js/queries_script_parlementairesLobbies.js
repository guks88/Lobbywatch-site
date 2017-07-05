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
    selectAvecContre.append('<option value="'+2+'">Avec/Contre majorité lobby</option>');
    selectAvecContre.append('<option value="'+1+'">Avec majorité lobby</option>');
    selectAvecContre.append('<option value="'+0+'">Contre majorité lobby</option>');
    selectAvecContre.select2();

    // parlamentarian select changed
    select.change(function() {
        var selected = $(this).val();

        $('#espace1').addClass("hidden");
        $('#selParl').removeClass("col-lg-4");
        $('#selParl').addClass("col-lg-5");
        $('#espace2').removeClass("col-lg-4");
        $('#espace2').addClass("col-lg-2");
        $('#selAvec').removeClass("hidden");
        $('#selAvec').addClass("col-lg-5");

        changeVega(selected);
        dataTablesParlementairesLobbiesUpdate(selected);
        selectAvecContre.val(2).trigger('change');

        // AvecContre select changed
        selectAvecContre.change(function() {
            var selected2 = $(this).val();
            updateDataTablesAvecContre(selected, selected2);
        });
    });

    initVegaMoyenneLobbies();

    dataTablesParlementairesLobbiesInit();

    //averageOfAverageParlamentariansLobbies();

    //getResultPerParlamentarians();

    //avgMoyenneLobbies();

    //getAverage();

});