/**
 * 
 */

$(document).ready(function() {
	if ($.fn.dataTable.isDataTable('#ls_table')) {
		$('#ls_table').DataTable().destroy();
		$('#ls_table_body').empty();
		loadDatatable();
	} else {
		loadDatatable();
	}
});

var lsTable;
var clickedEditRow;
function loadDatatable() {
	$.ajax({
		type: 'GET',
		url: 'ls',
		async: true,
	}).done(function(data) {
		lsTable = "";
		lsTable = $('#ls_table').DataTable({
			responsive: true,
			data: data,
			destroy: true,
			retrieve: true,
			columns: [
				{ data: "", "render": function(data, type, full, meta) { return meta.row + meta.settings._iDisplayStart + 1; } },
				{ data: "slope" },
				{ data: "slope_length" },
				{ data: "ls_value" },
				{ data: null, "render": function(data, type, full, meta) { return '<a href="#")"><i class="fa fa-pencil-square" aria-hidden="true"></i></a>'; } },
				{ data: null, "render": function(data, type, full, meta) { return '<a href="#"> <i class="fa fa-minus-square" aria-hidden="true"></i></a>'; } }
			],  
	         "fnRowCallback": function (nRow, aData, iDisplayIndex) {  
	             $("td:first", nRow).html(iDisplayIndex + 1);  
	             return nRow;  
	         }
		});
	});
}

$(document).on("click", "#saveLSBtn", function() {
	let lsSlope = $('#ls-slope').val(); 
	let slopeLength = $('#ls-length').val();
	let lsValue = $('#ls-value').val();
	if(lsSlope && slopeLength && lsValue) {
		let dataString = {};
		dataString.slope = lsSlope;
		dataString.slope_length = slopeLength;
		dataString.ls_value = lsValue;
		alert(JSON.stringify(dataString));		
		$.ajax({
			type: "POST",
			url: "ls",
			data: JSON.stringify(dataString),
			async: true,
		}).done(function(response) {
			$('#ls-slope').val('');
			$('#ls-length').val('');
			$('#ls-value').val('');
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
		}).fail(function(response) {
			//alert("failed: " + JSON.stringify(response));		
			if(!response.responseJSON.success) {
				$('#message').html("<span><strong>Please try again! </strong>" + response.responseJSON.message + "</span>")		
				.addClass("alert alert-danger")
				.hide()
				.fadeIn(1500);
				
				setTimeout(function() {
					$('#message').fadeOut("Slow");
				}, 20000);		
			}	
		});	
	} else {	
		if(!lsSlope) {
			alert("Please enter average watershed slope.");
		} else if(!slopeLength) {
			alert("Please enter sheet flow length.");
		} else if(!lsValue) {
			alert("Please enter LS factor value.");
		}	
	}		
});

$(document).ready(function() {	
	$('#ls_table tbody').off( 'click.rowClick' ).on('click.rowClick', 'td .fa.fa-pencil-square', function () {		
		var td = $(this).closest('td');
 		var rowIdx = lsTable.cell( td ).index().row;
		var rowData = lsTable.row( rowIdx ).data();	
		$('#edit_slope').text(rowData.slope);
		$('#edit_slope_length').text(rowData.slope_length); 
		$('#edit_ls_value').val(rowData.ls_value);
	
		var edit_ls_modal = new bootstrap.Modal(document.getElementById('edit_ls_modal'), {
		  backdrop: 'static',
		  keyboard: false,
		  focus: true
		})
		
		edit_ls_modal.show();
    	
    	$('#update_ls_button').click( function() {
	        var dataString = new Object();
			dataString.slope = $('#edit_slope').text();
			dataString.slope_length = $('#edit_slope_length').text();
			dataString.ls_value = $('#edit_ls_value').val();
			
    		editLS(rowIdx, dataString); 
			$( "#update_ls_button").off( "click" );
	    });
	});
});

function editLS(clickedRowIndex, changedData) {
	$.ajax({
		url: "ls",
		data: JSON.stringify(changedData),
		type: "POST",
		async: true,
	}).done(function(response) {
		lsTable.row(clickedRowIndex).data( changedData ).invalidate().draw();
		$('#message').html("<span>Updated! LS data record has been updated.</span>")
			.addClass("alert alert-success")
			.hide()
			.fadeIn(1500);

		setTimeout(function() {
			$('#message').fadeOut("Slow");
		}, 5000);
	}).fail(function(response) {
		alert("failed: " + JSON.stringify(response));			
	});	
}

$(document).ready(function() {
	$('#ls_table tbody').on( 'click', 'td i.fa.fa-minus-square', function () {    
    	var clickedRow = $($(this).closest('td')).closest('tr');
    	var rowData = lsTable.row( clickedRow ).data();
    	
    	var delete_ls_modal = new bootstrap.Modal(document.getElementById('delete_ls_modal'), {
		  backdrop: 'static',
		  keyboard: false,
		  focus: true
		})		
		delete_ls_modal.show();  	
	    $('#delete_ls_button').click( function() {  
    		deleteLS(clickedRow, rowData);  
			$( "#delete_ls_button").off( "click" );   
	    });
	});
});	

function deleteLS(clickedRow, rowData) {
	$.ajax({
		url: "ls",
		data: JSON.stringify(rowData),
		type: "DELETE",
		async: true,
	}).done(function(response) {
		lsTable.row(clickedRow).remove().draw();
		$('#message').html("<span>Deleted! LS data record has been deleted.</span>").addClass("alert alert-success").hide().fadeIn(1500);
		setTimeout(function() { $('#message').fadeOut("Slow"); }, 5000);
	}).fail(function(response) {
		alert("failed: " + JSON.stringify(response));			
	});	
}