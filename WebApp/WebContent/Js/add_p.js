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
 
 $(document).ready(function() {
	if ($.fn.dataTable.isDataTable('#p_table')) {
		$('#p_table').DataTable().destroy();
		$('#p_table_body').empty();
		loadDatatable();
	} else {
		loadDatatable();
	}
});
 
var pTable;
var clickedEditRow;
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
				{ data: "", "render": function(data, type, full, meta) { return meta.row + meta.settings._iDisplayStart + 1; }  },
				{ data: "supportpractices_name" },
				{ data: "reference" },
				{ data: "p_value" },
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



$(document).on("click", "#savePBtn", function() {
	let supportpractices_name = $('#supportpractices_name').val(); 
	let referenceName = $('#reference').val();
	let pValue = $('#p-value').val();

	if(supportpractices_name && referenceName && pValue) {
		let dataString = {};
		dataString.supportpractices_name = supportpractices_name;
		dataString.reference = referenceName;
		dataString.p_value = pValue;
		alert(JSON.stringify(dataString));	
		$.ajax({
			type: "POST",
			url: "p",
			data: JSON.stringify(dataString),
			async: true,
			}).done(function(response) {
			$('#supportpractices_name').val('');
			$('#reference').val('');
			$('#p-value').val('');
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
		if(!supportpractices_name) {
			alert("Please enter Support Practices name.");
		} else if(!referenceName) {
			alert("Please enter reference name.");
		} else if(!pValue) {
			alert("Please enter P factor value.");
		}	
	}		
});
		
		
$(document).ready(function() {	
	$('#p_table tbody').off( 'click.rowClick' ).on('click.rowClick', 'td .fa.fa-pencil-square', function () {		
		var td = $(this).closest('td');
 		var rowIdx = pTable.cell( td ).index().row;
		var rowData = pTable.row( rowIdx ).data();	
		$('#edit_supportpractice').text(rowData.supportpractices_name);
		$('#edit_reference').text(rowData.reference); 
		$('#edit_p_value').val(rowData.p_value);
	
		var edit_p_modal = new bootstrap.Modal(document.getElementById('edit_p_modal'), {
		  backdrop: 'static',
		  keyboard: false,
		  focus: true
		})
		
		edit_p_modal.show();
    	
    	$('#update_p_button').click( function() {
	        var dataString = new Object();
			dataString.supportpractices_name = $('#edit_supportpractice').text();
			dataString.reference = $('#edit_reference').text();
			dataString.p_value = $('#edit_p_value').val();
			
    		editP(rowIdx, dataString); 
    		
			$( "#update_p_button").off( "click" );
	    });
	});
});


function editP(clickedRowIndex, changedData) {
	$.ajax({
		url: "p",
		data: JSON.stringify(changedData),
		type: "POST",
		async: true,
	}).done(function(response) {
		pTable.row(clickedRowIndex).data( changedData ).invalidate().draw();
		$('#message').html("<span>Updated! P data record has been updated.</span>")
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
	$('#p_table tbody').on( 'click', 'td i.fa.fa-minus-square', function () {    
    	var clickedRow = $($(this).closest('td')).closest('tr');
    	var rowData = pTable.row( clickedRow ).data();
    	
    	var delete_p_modal = new bootstrap.Modal(document.getElementById('delete_p_modal'), {
		  backdrop: 'static',
		  keyboard: false,
		  focus: true
		})		
		delete_p_modal.show();  	
	    $('#delete_p_button').click( function() {  
    		deleteP(clickedRow, rowData);  
			$( "#delete_p_button").off( "click" );   
	    });
	});
});	

function deleteP(clickedRow, rowData) {
	$.ajax({
		url: "p",
		data: JSON.stringify(rowData),
		type: "DELETE",
		async: true,
	}).done(function(response) {
		pTable.row(clickedRow).remove().draw();
		$('#message').html("<span>Deleted! P data record has been deleted.</span>").addClass("alert alert-success").hide().fadeIn(1500);
		setTimeout(function() { $('#message').fadeOut("Slow"); }, 5000);
	}).fail(function(response) {
		alert("failed: " + JSON.stringify(response));			
	});	
}