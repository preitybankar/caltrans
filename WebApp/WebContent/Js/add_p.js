/**
 * 
 */
 
  // Loading header and footer using Ajax
fetch("./header.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("header").innerHTML = data;
});

fetch("./footer.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("footer").innerHTML = data;
});
 
 window.onload = function() {
 //alert(document.cookie);
 var email= document.cookie;
 $.ajax({
			type: 'GET',
			url: 'login',
			data: { email: email },
			async: true,
		}).done(function(resp) {
			
			//alert(JSON.stringify(resp));
			
			$('#login_details').html('<span id="userEmail">' + resp.name + '</span> &nbsp;&nbsp;<a href="login.html" type="button" class="btn btn-outline-light me-2">Sign Out</a>');
			});
 };
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
				{ data: null, "render": function(data, type, full, meta) { return '<a href="#" data-bs-toggle="modal" data-bs-target="#edit_p_modal"><i class="fa fa-pencil-square" aria-hidden="true"></i></a>'; } },
				{ data: null, "render": function(data, type, full, meta) { return '<a href="#" data-bs-toggle="modal" data-bs-target="#delete_p_modal"><i class="fa fa-minus-square" aria-hidden="true"></i></a>'; } }
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