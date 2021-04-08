/**
 * 
 */

$(document).ready(function() {
	$("#LSForm").on("submit", function(e) {
		var dataString = $(this).serialize();
		// get inputs
		//var dataString = new Object();
		//dataString.slope = $('#ls-slope').val();
		//dataString.slope_length = $('#ls-length').val();
		//dataString.ls_value = $('#ls-value').val();
		//alert(dataString);
		//alert(JSON.stringify(dataString))
		
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "ls",
			data: dataString,
			async: true,
			success: function() {
				$("#LSForm")[0].reset();
				$('#message').html("<span>Submitted! LS data saved successfully.</span>")
					.addClass("alert alert-success")
					.hide()
					.fadeIn(1500);
				setTimeout(function() {
					$('#message').fadeOut("Slow");
				}, 5000);
			}
		});
		return false;
	});
});


