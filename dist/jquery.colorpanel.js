(function ($) {
    $.fn.ColorPanel = function (options) {
        var settings = $.extend({
            styleSheet: '#duh'
            , colors: [
                '#1abc9c', '#2980b9' ,'#c0392b'
            , ]
            , linkClass: 'linka'
            , animateContainer: false
        }, options);
        var panelDiv = this;
		
		$('#cpToggle').click(function(e){
			e.preventDefault();
			 $('ul',panelDiv).slideToggle();
		});
		
        var colors = settings.colors || null;
	if (colors) {
            $.each(colors, function (key, value) {
                var li = $("<li/>");
                var e = $("<a />", {
                    href: '#'
                    , "class": settings.linkClass, // you need to quote "class" since it's a reserved keyword
                }).css('background-color', value);
                li.append(e);
                $(panelDiv).find('ul').append(li);
            });
            $('ul',panelDiv).on('click', 'a', function (e) {
                e.preventDefault();
                var color = $(this).css('background-color') || '#000';
                if (settings.animateContainer) {
                    $(settings.animateContainer).fadeOut(function () {
                        $(settings.styleSheet).css('background-color', color);

			// updating the color in the backend
			function rgb2hex(rgb) {
			    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			    function hex(x) {
				return ("0" + parseInt(x).toString(16)).slice(-2);
			    }
			    return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
			}

			var theColor = rgb2hex(color);
			$.get("/api/update_cover/" + theColor);
			
                        // And then:
                       $(this).fadeIn();
                    });
                }
                else {
                    $(settings.styleSheet).css('background-color', color);
                }
            });
        }
    };
}(jQuery));
