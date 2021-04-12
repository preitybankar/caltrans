/**
 * 
 */
var pTable;
function loadDatatable() {
	$.ajax({
		type: 'GET',
		url: 'p',
		async: true,
	}).done(function(data) {
		pTable = "";
		pTable = $('#p_table').DataTable({
			responsive: true,
			data: data,
			destroy: true,
			retrieve: true,
			columns: [
				{ data: "", "render": function(data, type, full, meta) { return meta.row + 1; } },
				{ data: "supportpractices_name" },
				{ data: "reference" },
				{ data: "p_value" },
				{ data: null, "render": function(data, type, full, meta) { return '<a href="#" data-bs-toggle="modal" data-bs-target="#edit_p_modal">Edit</a>'; } },
				{ data: null, "render": function(data, type, full, meta) { return '<a href="#" data-bs-toggle="modal" data-bs-target="#delete_p_modal">Delete</a>'; } }
			]
		});
		console.log(pTable);
	});
}


$(document).ready(function() {
	if ($.fn.dataTable.isDataTable('#p_table')) {
		$('#p_table').DataTable().destroy();
		$('#p_table_body').empty();
		loadDatatable();
	} else {
		loadDatatable();
	}
});

$(document).ready(function() {
	$("#p_form").on("submit", function(e) {
		var dataString = $(this).serialize();
		// get inputs
		//var dataString = new Object();
		//dataString.supportpractices_name = $('#supportpractice').val();
		//dataString.reference = $('#reference').val();
		//dataString.p_value = $('#p-value').val();
		//alert(dataString);
		//alert(JSON.stringify(dataString))

		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "p",
			data: dataString,
			async: true,
			success: function() {
				$("#p_form")[0].reset();
				$('#message').html("<span>Submitted! P data saved successfully.</span>")
					.addClass("alert alert-success")
					.hide()
					.fadeIn(1500);

				setTimeout(function() {
					$('#message').fadeOut("Slow");
				}, 5000);

				setTimeout(function() {
					if ($.fn.dataTable.isDataTable('#p_table')) {
						$('#p_table').DataTable().destroy();
						$('#p_table_body').empty();
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