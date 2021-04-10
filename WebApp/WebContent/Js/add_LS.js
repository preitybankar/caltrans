/**
 * 
 */

$(document).ready(function() {
	$("#LSForm").on("submit", function(e) {
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
				$("#LSForm")[0].reset();
				$('#message').html("<span>Submitted! LS data saved successfully.</span>")
					.addClass("alert alert-success")
					.hide()
					.fadeIn(1500);
				setTimeout(function() {
					$('#message').fadeOut("Slow");
				}, 5000);
			}
		});
		return false;
	});
});


$(document).ready(function() {	
	var call = $.ajax({
					type: 'GET',
					url: 'ls',
					async: true,
				});

	call.done(function(data) {
		$('#ls_table').DataTable({
			responsive: true,
			data: data,
			columns: [
			{ data: null, "render": function ( data, type, full, meta ) { return  meta.row + 1;} },
			{ data: "slope" },
			{ data: "slope_length" },
			{ data: "ls_value" },
			{ data: null, "render": function() { return '<a href="#">Edit</a>'; } },
			{ data: null, "render": function() { return '<a href="#">Delete</a>'; } }
		]
		});

	});
});
/*





table
    .column( 0 )
    .data()
    .filter( function ( value, index ) {
        return value > 20 ? true : false;
    } );

table.rows( function ( idx, data, node ) {              
         if(data.somefield === somevalue){
            rowIndexes.push(idx);                   
         }
 
         return false;
     }); 


var call = $.ajax({
	url: "https:/mysite/_vti_bin/listdata.svc/AM?$select=Title,Number,Date,Name,Classification/Classification,Class2/Class2,Class3/Class3&$expand=Classification,Class2,Class3",
	async: "true",
	type: "GET",
	dataType: "json",
	headers: { Accept: "application/json;odata=verbose" }
});//close ajax call

call.done(function(data, textStatus, jqXHR) {

	myData = data.d.results;
	var dtTable = $('#example').DataTable({
		responsive: true,
		data: myData,
		columns: [
			{ data: "Title" },
			{ data: "Number" },
			{ data: "Date", "render": function(data, type, full, meta) { return moment.utc(data, "x").format('l'); } },
			{ data: "Name", "render": function(data, type, full, meta) { return '<a href="https:/mysite/AM/' + data + '">Click here</a>'; } },
			{ data: "Classification.results[, ].Classification" },
			{ data: "Class2.results[, ].Class2" },
			{ data: "Class3.results[, ].Class2" }
		],
		stateSave: true

	}); //close DataTable

*/