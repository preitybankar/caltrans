/**
 * 
 */
var rTable;
function loadDatatable() {
	$.ajax({
		type: 'GET',
		url: 'r',
		async: true,
	}).done(function(data) {
		rTable = "";
		rTable = $('#r_table').DataTable({
			responsive: true,
			data: data,
			destroy: true,
			retrieve: true,
			columns: [
				{ data: "", "render": function(data, type, full, meta) { return meta.row + 1; } },
				{ data: "location" },
				{ data: "r_value" },
				{ data: null, "render": function(data, type, full, meta) { return '<a href="#" data-bs-toggle="modal" data-bs-target="#edit_r_modal"><i class="fa fa-pencil-square" aria-hidden="true"></i></a>'; } },
				{ data: null, "render": function(data, type, full, meta) { return '<a href="#" data-bs-toggle="modal" data-bs-target="#delete_r_modal"><i class="fa fa-minus-square" aria-hidden="true"></i></a>'; } }
			]
		});
		console.log(rTable);
	});
}


$(document).ready(function() {
	if ($.fn.dataTable.isDataTable('#r_table')) {
		$('#r_table').DataTable().destroy();
		$('#r_table_body').empty();
		loadDatatable();
	} else {
		loadDatatable();
	}
});

$(document).ready(function() {
	$("#r_form").on("submit", function(e) {
		var dataString = $(this).serialize();

		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "r",
			data: dataString,
			async: true,
			success: function() {
				$("#r_form")[0].reset();
				$('#message').html("<span>Submitted! R data saved successfully.</span>")
					.addClass("alert alert-success")
					.hide()
					.fadeIn(1500);

				setTimeout(function() {
					$('#message').fadeOut("Slow");
				}, 5000);

				setTimeout(function() {
					if ($.fn.dataTable.isDataTable('#r_table')) {
						$('#r_table').DataTable().destroy();
						$('#r_table_body').empty();
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