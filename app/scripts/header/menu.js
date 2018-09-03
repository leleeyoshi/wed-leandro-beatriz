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

$( '.scroll-event-inhoshi' ).click( eventScroll )

function eventScroll(){
	var altura = $('.navbar-header').offset().top;
  var scrollUser = $( document ).scrollTop();
  var isClassMenu = $( '.sticky-wrapper' ).hasClass( 'is-sticky' );
  
	if( !isClassMenu && altura > scrollUser ){
		$('html, body').animate({scrollTop:altura}, 'slow');
  }
}

