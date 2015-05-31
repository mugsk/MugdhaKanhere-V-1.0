$(document).ready(function(){

    $('a[href="#/skills"]').hover(function(){

            $('.skillbar').each(function () {
                $(this).find('.skillbar-bar').animate({ width: $(this).attr('data-percent')}, 2000);
            });

    });


}); // End ready

//jQuery(document).ready(function($){
//    $('.clientblock').hover(function() {
//        $scope.$apply(function() {
//            $(this).closest('.budget').find('.budgettooltip').stop(true,true).fadeToggle('fast');
//        });
//    });
//});