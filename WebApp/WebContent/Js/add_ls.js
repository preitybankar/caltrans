/**
 * 
 */
$(document).ready(function() {
	$("#ls_form").on("submit", function(e) {
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
				$("#ls_form")[0].reset();
				$('#message').html("<span>Submitted! LS data saved successfully.</span>")
					.addClass("alert alert-success")
					.hide()
					.fadeIn(1500);

				setTimeout(function() {
					$('#message').fadeOut("Slow");
				}, 5000);

				setTimeout(function() {
					if ($.fn.dataTable.isDataTable('#ls_table')) {
						$('#ls_table').DataTable().destroy();
						$('#ls_table_body').empty();
						loadDatatable();
					} else {
						loadDatatable();
					}
				}, 1000);




			}
		});
		return false;
	});
});

function loadDatatable() {
	$.ajax({
		type: 'GET',
		url: 'ls',
		async: true,
	}).done(function(data) {
		$('#ls_table').DataTable({
			responsive: true,
			data: data,
			destroy: true,
			retrieve: true,
			columns: [
				{ data: "", "render": function(data, type, full, meta) { console.log(meta); return meta.row + 1; } },
				{ data: "slope" },
				{ data: "slope_length" },
				{ data: "ls_value" },
				{ data: null, "render": function(data, type, full, meta) { return '<a href="#">Edit</a>'; } },
				{ data: null, "render": function(data, type, full, meta) { return '<a href="#">Delete</a>'; } }
			]
		});

	});
}


$(document).ready(function() {
	if ($.fn.dataTable.isDataTable('#ls_table')) {
		alert($.fn.dataTable.isDataTable('#ls_table'));
		$('#ls_table').DataTable().destroy();
		$('#ls_table_body').empty();
		loadDatatable();
	} else {
		loadDatatable();
	}
});
