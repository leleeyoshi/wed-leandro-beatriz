$(window).on('load', function(){
  $('#nav-sticky-wrapper').sticky({ topSpacing: 0 });
});

$('#nav_list').onePageNav({
    currentClass: 'active'
});


$("#nav_list li").click(function(){
  if($('.navbar-toggle').is(':visible')){
    $('.navbar-toggle').click();
  }
});