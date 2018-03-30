$(document).ready(function () {
	var $DOJO = function(id) {
		var element = document.getElementById(id);
		
		return {
			click: function(callback) {
				element.addEventListener('click', callback)
			},

			hover: function(callback, calltwo) {
				element.addEventListener('mouseover', callback);
				element.addEventListener('mouseout', calltwo);
			}
		}
	}

	$DOJO('friends').click(function() { console.log('Yay! One friend! Finally!')});
	$DOJO('friends').hover(function() { console.log('Click me! PLEEEAASSSSEEEEEE!!!!')}, function() { console.log('Yay! Another enemy! Yet Again!')});
});