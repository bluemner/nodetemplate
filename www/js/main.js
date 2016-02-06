;
(function ($, main) {
    'use strict';
    $.extend(main, {
		
		init : function () {			
			
			$("#navigation").load("links.html");
						
			//Events
			window.onhashchange = main.urlChange;
			main.urlChange ();
			
			$('#show-side-bar-icon').on('click', '#show-side-bar', function () {
				$('#side-bar').toggleClass('hidden');
				$('#hide-bar-show').toggleClass('hidden');
				$('#show-side-bar-icon').addClass('hidden');
				$('#content').removeClass('col-md-11 col-md-offset-0');
				$('#content').addClass('col-md-10 col-md-offset-2');
			});
			
			$('#main-wrapper').on('click', '#hide-side-bar', function () {
				$('#side-bar').toggleClass('hidden');				
				$('#show-side-bar-icon').removeClass('hidden');
				$('#content').removeClass('col-md-10 col-md-offset-2');
				$('#content').addClass('col-md-11 col-md-offset-0');
			});
		},
		urlChange : function () {
			/*	
				url: http://jsfiddle.net/nchaves/vMrjs/2/
				//window.location:
				window.location.host        // fiddle.jshell.net (includes port if there is one[1])
				window.location.hostname    // fiddle.jshell.net
				window.location.hash        // 
				window.location.href        // http://fiddle.jshell.net/nchaves/vMrjs/2/show/
				window.location.pathname    // /nchaves/vMrjs/2/show/
				window.location.port        // (port if there is one[1])
				window.location.protocol    // http:
				window.location.search      // 
				
				var el = document.createElement('a');
				el.href ="http://www.somedomain.com/account/search?filter=a#top";
				el.host        // www.somedomain.com (includes port if there is one[1])
				el.hostname    // www.somedomain.com
				el.hash        // #top
				el.href        // http://www.somedomain.com/account/search?filter=a#top
				el.pathname    // /account/search
				el.port        // (port if there is one[1])
				el.protocol    // http:
				el.search      // ?filter=a
			*/
			switch ( window.location.hash ) {
				case '#About':
					$("#content").load("home.html");
					break;
				case '#Home':
					$("#content").load("home.html", function ()
					{
							  
					});
					$("#Dashboard").addClass("active").siblings().removeClass('active');					
					break;
				case '#a':
					$("#content").load("home.html");
					$("#Export").addClass("active").siblings().removeClass('active');
					
					break;
				case '#Report':
					$("#content").load("home.html");
					$("#Reports").addClass("active").siblings().removeClass('active');
					break;
				case '#Analytics':
					$("#content").load("home.html");
					$("#Analytics").addClass("active").siblings().removeClass('active');
					break;				
				default:
					$("#content").load("home.html", function()
					{
					  
					});					
					break;
			}
		}	
}); //extend
})(window.jQuery, window.main || (window.main = {}));