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
				{ data: "", "render": function(data, type, full, meta) { return meta.row + meta.settings._iDisplayStart + 1; } },
				{ data: "location" },
				{ data: "r_value" },
				{ data: "duration" },
				{ data: null, "render": function(data, type, full, meta) { return '<a href="#" onclick="editR(\'' + meta.row + '\')"><i class="fa fa-pencil-square" aria-hidden="true"></i></a>'; } },
				{ data: null, "render": function(data, type, full, meta) { return '<a href="#"> <i class="fa fa-minus-square" aria-hidden="true"></i></a>'; } }
			],  
	         "fnRowCallback": function (nRow, aData, iDisplayIndex) {  
	             $("td:first", nRow).html(iDisplayIndex + 1);  
	             return nRow;  
	         }
		});
		//console.log(rTable);
	});
}

function editR(selectedRowIndex) {

}
      
function deleteR(clickedRow, rowData) {
		$.ajax({
		url: "r",
		data: JSON.stringify(rowData),
		type: "DELETE",
		async: true,
		success: function() {
			rTable.row(clickedRow).remove().draw();
			//alert("Inside success");
			$('#message').html("<span>Deleted! R data record has been deleted.</span>")
				.addClass("alert alert-success")
				.hide()
				.fadeIn(1500);
	
			setTimeout(function() {
				$('#message').fadeOut("Slow");
			}, 5000);
		}
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

	$('#r_table tbody').on( 'click', 'td .fa.fa-pencil-square', function () {
		//alert("Clicked Edit");
    	//alert( 'Row index: '+ rTable.row( clickedRow ).index() );
    	var clickedRow = $($(this).closest('td')).closest('tr'); 
		var rowData = JSON.stringify(rTable.row( clickedRow ).data());
		//alert( 'Row data: '+ rowData);
  
	} );
	
	$('#r_table tbody').on( 'click', 'td i.fa.fa-minus-square', function (e) {
	    
    	var clickedRow = $($(this).closest('td')).closest('tr');
    	var rowData = rTable.row( clickedRow ).data();
    	
    	var delete_r_modal = new bootstrap.Modal(document.getElementById('delete_r_modal'), {
		  backdrop: 'static',
		  keyboard: false,
		  focus: true
		})
		
		delete_r_modal.show();
    	
    	e.stopPropagation();

	    $('#delete_r_button').click( function() {
	        //alert('clicked');   
    		deleteR(clickedRow, rowData);     
	    });
    		
    	//alert( 'Row data: '+ rowData);
    	console.log(rowData);
    	console.log(rowData.r_value);
    	console.log(rowData.location);
    	console.log(rowData.duration);
	});
	
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