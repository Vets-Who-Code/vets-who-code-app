!function ($) {

	$(function () {

		window.prettyPrint && prettyPrint()

		/* ---------------------------------------------- /*
		 * Animation scroll
		/* ---------------------------------------------- */
		
		$('a[href*=#]').bind('click', function(e) {
			var anchor = $(this);

			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top
			}, 500);
			e.preventDefault();
		});
		
		 var $body   = $(document.body)
			
			    $body.scrollspy({
			      target: '.sidebar'
			    });



		
	})

}(jQuery)
				

