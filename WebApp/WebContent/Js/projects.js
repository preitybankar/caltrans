/**
 * 
 */

$(document).ready(function() {
	loadDataTable();
});

var projectTable;
function loadDataTable() {
	$.ajax({
		type: 'GET',
		url: 'project',
		async: true,
	}).done(function(data) {
		if(data.length > 0) {
			document.getElementById("projectTableDiv").style.display = 'block';
			projectTable = "";
			projectTable = $('#projectTable').DataTable({
				responsive: true,
				data: data,
				destroy: true,
				retrieve: true,
				columns: [
					{ data: "", "render": function(data, type, full, meta) { return meta.row + meta.settings._iDisplayStart + 1; } },
					{ data: "name" },
					{ data: "location" },
					{ data: "area" },
					{ data: "start_date" },
					{ data: "end_date" },
					{ data: "pre_construction_soil_loss" },
					{ data: "post_construction_soil_loss" },
					{ data: "description" },
					{ data: null, "render": function(data, type, full, meta) { return '<a href=new_project.html?id=' + data.id + '><i class="fa fa-pencil-square" aria-hidden="true"></i></a>'; } },
					{ data: null, "render": function(data, type, full, meta) { return '<a href="#"><i class="bi bi-trash-fill"></i></a>'; } },
					{ data: null, "render": function(data, type, full, meta) { return '<a href=report.html?id=' + data.id + '><i class="bi bi-cloud-download-fill"></i>'; } }
				],  
				 columnDefs: [
			       { targets: [9, 10, 11 ], orderable: false},
			     ],
		         "fnRowCallback": function (nRow, aData, iDisplayIndex) {  
		             $("td:first", nRow).html(iDisplayIndex + 1);  
		             return nRow;  
		         }
			}); 
		} else {
			document.getElementById("noProjectData").style.display = 'block';		
		}
		
	});
}

$(document).ready(function() {	
	$('#projectTable tbody').on( 'click', 'td i.bi.bi-trash-fill', function () {    
    	var clickedRow = $($(this).closest('td')).closest('tr');
    	var rowData = projectTable.row( clickedRow ).data();
    	
    	var delete_project_modal = new bootstrap.Modal(document.getElementById('delete_project_modal'), {
		  backdrop: 'static',
		  keyboard: false,
		  focus: true
		})		
		delete_project_modal.show(); 
		 	
	    $('#delete_project_button').click( function() {  
    		deleteProject(clickedRow, rowData);  
			$( "#delete_project_button").off( "click" );   
	    });
	});
});	

function deleteProject(clickedRow, rowData) {
	$.ajax({
		url: "project",
		data: JSON.stringify(rowData),
		type: "DELETE",
		async: true,
	}).done(function(response) {
		projectTable.row(clickedRow).remove().draw();
		$('#message').html("<span>Deleted! Project data record has been deleted.</span>").addClass("alert alert-success").hide().fadeIn(1500);
		setTimeout(function() { $('#message').fadeOut("Slow"); }, 5000);
	}).fail(function(response) {
		alert("failed: " + JSON.stringify(response));			
	});
	
	
	
}
