
$(document).ready(function() {
	$("[href='#contact']").on("click", (event) => {
 		scrollTo(event);
 	});

	$("[href='#about']").on("click", (event) => {
 		scrollTo(event);
 	});
	
	function scrollTo(event) {
		event.preventDefault();
		let id  = $(event.target).attr('href');
		//let id  = el.attr('href');
		let top = $(id).offset().top; //определим высоту от начала страницы до якоря
		$('body,html').animate({scrollTop: top}, 2000);
	}
	// toggle mob-nav visibility
	$('.mob-wrapper').click(function() {
		$('.mob-menu').toggle(1000);
	});

	$('.mob-nav-btn:first').click(function() {
		$('.dropdown-box').toggle(700);
	})
});
