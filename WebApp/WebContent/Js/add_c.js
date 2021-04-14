/**
 * 
 */
var cTable;
function loadDatatable() {
	$.ajax({
		type: 'GET',
		url: 'c',
		async: true,
	}).done(function(data) {
		cTable = "";
		cTable = $('#c_table').DataTable({
			responsive: true,
			data: data,
			destroy: true,
			retrieve: true,
			columns: [
				{ data: "", "render": function(data, type, full, meta) { return meta.row + 1; } },
				{ data: "bmp_name" },
				{ data: "reference" },
				{ data: "c_value" },
				{ data: null, "render": function(data, type, full, meta) { return '<a href="#" data-bs-toggle="modal" data-bs-target="#edit_c_modal"><i class="fa fa-pencil-square" aria-hidden="true"></i></a>'; } },
				{ data: null, "render": function(data, type, full, meta) { return '<a href="#" data-bs-toggle="modal" data-bs-target="#delete_c_modal"><i class="fa fa-minus-square" aria-hidden="true"></i></a>'; } }
			]
		});
		console.log(cTable);
	});
}

$(document).ready(function() {
	if ($.fn.dataTable.isDataTable('#c_table')) {
		$('#c_table').DataTable().destroy();
		$('#c_table_body').empty();
		loadDatatable();
	} else {
		loadDatatable();
	}
});

$(document).ready(function() {
	$("#c_form").on("submit", function(e) {
		var dataString = $(this).serialize();
		// get inputs
		//var dataString = new Object();
		//dataString.bmp_name = $('#bmp').val();
		//dataString.reference = $('#reference').val();
		//dataString.c_value = $('#c-value').val();
		//alert(dataString);
		//alert(JSON.stringify(dataString))

		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "c",
			data: dataString,
			async: true,
			success: function() {
				$("#c_form")[0].reset();
				$('#message').html("<span>Submitted! C data saved successfully.</span>")
					.addClass("alert alert-success")
					.hide()
					.fadeIn(1500);

				setTimeout(function() {
					$('#message').fadeOut("Slow");
				}, 5000);

				setTimeout(function() {
					if ($.fn.dataTable.isDataTable('#c_table')) {
						$('#c_table').DataTable().destroy();
						$('#c_table_body').empty();
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