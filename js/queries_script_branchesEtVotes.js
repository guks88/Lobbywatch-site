$(document).ready(function() {
    // loading gif
    $(document).ajaxStart(function(){
        $('#loading').show();
    }).ajaxStop(function(){
        $('#loading').hide();
    });

    // init dataTables for branches
    dataTablesBranchesEtVotesInit();

    // All votes on dropdown list
    var select = $("#select_branchesVotes");
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
        dataTablesBranchesEtVotesUpdate(data);
    });
});

// display infos for vote selected
var displayInfo = function(affairVoteId) {
    $(".rowSelectLobbies").addClass("hidden");
    $(".Table").addClass("hidden");

    var select = $("#select_branches");
    $.ajax({
        url: "/search_all_branches",
        dataType: 'json',
        success: function(result){
            if(result != null){
                select.append('<option value="0">Toutes les branches</option>');
            }
            $.each(result, function() {
                select.append('<option value="' + this.id + '">' + this.name_fr + '</option>');
            });
            select.select2();
        }});
    $('.rowBranches').removeClass("hidden");

    var affairVoteId = affairVoteId;
    $.ajax({
        url: "/search_vote_selected",
        data: {affairVoteId: affairVoteId},
        method: 'get',
        dataType: 'json',
        success: function(result){
            $.each(result, function() {
                $('.rowInfos').append('<strong>Titre de l&quotaffaire :</strong><p style="text-align: center">' + this.affairTitle + '</p>');
                $('.rowInfos').append('<strong>Signification du oui :</strong><p style="text-align: center">' + this.meaningYes + '</p>');
                $('.rowInfos').append('<strong>Signification du non :</strong><p style="text-align: center">' + this.meaningNo + '</p>');
            });
        }});
    $('#infos').removeClass("hidden");

    $('#btnNewSearch').removeClass("hidden");

    $('#moyenneChart').removeClass("hidden");

    initVegaMoyenneBranche(affairVoteId);

    initVegaMoyenneBranches(affairVoteId);

    dataTablesBranchesEtVotesSelected(affairVoteId);

    // votes select changed
    select.change(function() {
        var selected = $(this).val();
        // update chart
        chartBranchesEtVotesUpdate(affairVoteId, selected);
        dataTablesBranchesEtVotesUpdateSelected(affairVoteId, selected);
    });

};

var onClick = function(){
    window.location.reload();
};
