/**
 * 
 */
var lsTable;
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
				{ data: null, "render": function(data, type, full, meta) { return '<a href="#" onclick="editLS(\'' + meta.row + '\')"><i class="fa fa-pencil-square" aria-hidden="true"></i></a>'; } },
				{ data: null, "render": function(data, type, full, meta) { return '<a href="#"> <i class="fa fa-minus-square" aria-hidden="true"></i></a>'; } }
			],  
	         "fnRowCallback": function (nRow, aData, iDisplayIndex) {  
	             $("td:first", nRow).html(iDisplayIndex + 1);  
	             return nRow;  
	         }
		});
		//console.log(lsTable);
	});
}

function editLS(selectedRowIndex) {
 	//alert(selectedRowIndex);
	//var ls = JSON.stringify(lsTable.row(selectedRowIndex).data());
	//alert("Edit " + ls);
}
      
function deleteLS(clickedRow, rowData) {
		$.ajax({
		url: "ls",
		data: JSON.stringify(rowData),
		type: "DELETE",
		async: true,
		success: function() {
			lsTable.row(clickedRow).remove().draw();
			//alert("Inside success");
			$('#message').html("<span>Deleted! LS data record has been deleted.</span>")
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
	if ($.fn.dataTable.isDataTable('#ls_table')) {
		$('#ls_table').DataTable().destroy();
		$('#ls_table_body').empty();
		loadDatatable();
	} else {
		loadDatatable();
	}
});

$(document).ready(function() {

	$('#ls_table tbody').on( 'click', 'td .fa.fa-pencil-square', function () {
		//alert("Clicked Edit");
    	//alert( 'Row index: '+ lsTable.row( clickedRow ).index() );
    	var clickedRow = $($(this).closest('td')).closest('tr'); 
		var rowData = JSON.stringify(lsTable.row( clickedRow ).data());
		//alert( 'Row data: '+ rowData);
  
	} );
	
	$('#ls_table tbody').on( 'click', 'td i.fa.fa-minus-square', function (e) {
	    
    	var clickedRow = $($(this).closest('td')).closest('tr');
    	var rowData = lsTable.row( clickedRow ).data();
    	
    	var delete_ls_modal = new bootstrap.Modal(document.getElementById('delete_ls_modal'), {
		  backdrop: 'static',
		  keyboard: false,
		  focus: true
		})
		
		delete_ls_modal.show();
    	
    	e.stopPropagation();

	    $('#delete_ls_button').click( function() {
	        //alert('clicked');   
    		deleteLS(clickedRow, rowData);     
	    });
    		
    	//alert( 'Row data: '+ rowData);
    	console.log(rowData);
    	console.log(rowData.ls_value);
    	console.log(rowData.slope);
    	console.log(rowData.slope_length);
	});
	
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