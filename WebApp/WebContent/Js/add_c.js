/**
 * 
 */
 
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
			
			$('#login_details').html('<span id="userEmail">' + resp.name + '</span> &nbsp;&nbsp;<a href="login.html" type="button" class="btn btn-warning">Sign Out</a>');
			});
 };
 
 
$(document).ready(function() {
	if ($.fn.dataTable.isDataTable('#c_table')) {
		$('#c_table').DataTable().destroy();
		$('#c_table_body').empty();
		loadDatatable();
	} else {
		loadDatatable();
	}
});
 
var cTable;
var clickedEditRow;
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
				{ data: "", "render": function(data, type, full, meta) { return meta.row + meta.settings._iDisplayStart + 1; }  },
				{ data: "bmp_name" },
				{ data: "reference" },
				{ data: "c_value" },
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

$(document).on("click", "#saveCBtn", function() {
	let bmpName = $('#bmp').val(); 
	let referenceName = $('#reference').val();
	let cValue = $('#c-value').val();
	
	if(bmpName && referenceName && cValue) {
		let dataString = {};
		dataString.bmp_name = bmpName;
		dataString.reference = referenceName;
		dataString.c_value = cValue;
		alert(JSON.stringify(dataString));		
		$.ajax({
			type: "POST",
			url: "c",
			data: JSON.stringify(dataString),
			async: true,
		}).done(function(response) {
			$('#bmp').val('');
			$('#reference').val('');
			$('#c-value').val('');
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
		if(!bmpName) {
			alert("Please enter BMP name.");
		} else if(!referenceName) {
			alert("Please enter reference name.");
		} else if(!cValue) {
			alert("Please enter C factor value.");
		}	
	}		
});
	
$(document).ready(function() {	
	$('#c_table tbody').off( 'click.rowClick' ).on('click.rowClick', 'td .fa.fa-pencil-square', function () {		
		var td = $(this).closest('td');
 		var rowIdx = cTable.cell( td ).index().row;
		var rowData = cTable.row( rowIdx ).data();	
		$('#edit_bmp').text(rowData.bmp_name);
		$('#edit_reference').text(rowData.reference); 
		$('#edit_c_value').val(rowData.c_value);
	
		var edit_c_modal = new bootstrap.Modal(document.getElementById('edit_c_modal'), {
		  backdrop: 'static',
		  keyboard: false,
		  focus: true
		})
		
		edit_c_modal.show();
    	
    	$('#update_c_button').click( function() {
	        var dataString = new Object();
			dataString.bmp_name = $('#edit_bmp').text();
			dataString.reference = $('#edit_reference').text();
			dataString.c_value = $('#edit_c_value').val();
			
    		editC(rowIdx, dataString); 
    		
			$( "#update_c_button").off( "click" );
	    });
	});
});

function editC(clickedRowIndex, changedData) {
	$.ajax({
		url: "c",
		data: JSON.stringify(changedData),
		type: "POST",
		async: true,
	}).done(function(response) {
		cTable.row(clickedRowIndex).data( changedData ).invalidate().draw();
		$('#message').html("<span>Updated! C data record has been updated.</span>")
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
	$('#c_table tbody').on( 'click', 'td i.fa.fa-minus-square', function () {    
    	var clickedRow = $($(this).closest('td')).closest('tr');
    	var rowData = cTable.row( clickedRow ).data();
    	
    	var delete_c_modal = new bootstrap.Modal(document.getElementById('delete_c_modal'), {
		  backdrop: 'static',
		  keyboard: false,
		  focus: true
		})		
		delete_c_modal.show();  	
	    $('#delete_c_button').click( function() {  
    		deleteC(clickedRow, rowData);  
			$( "#delete_c_button").off( "click" );   
	    });
	});
});	

function deleteC(clickedRow, rowData) {
	$.ajax({
		url: "c",
		data: JSON.stringify(rowData),
		type: "DELETE",
		async: true,
	}).done(function(response) {
		cTable.row(clickedRow).remove().draw();
		$('#message').html("<span>Deleted! C data record has been deleted.</span>").addClass("alert alert-success").hide().fadeIn(1500);
		setTimeout(function() { $('#message').fadeOut("Slow"); }, 5000);
	}).fail(function(response) {
		alert("failed: " + JSON.stringify(response));			
	});	
}