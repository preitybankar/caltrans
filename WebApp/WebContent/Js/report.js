/**
 * 
 */
var PROJECT = {};
window.onload = function() {
	if (window.location.search.split('?').length > 1) {
		var paramsArray = window.location.search.split('?')[1].split('&');
		var id = paramsArray[0].split('=')[1];
		var statusResp = paramsArray[1].split('=')[1];
		var message = paramsArray[2].split('=')[1];
		//alert("id : " + id);
		//alert("statusResp : " + statusResp);

		if (statusResp) {
			$('#message').html("<span><strong>Well done!</strong> Project data record " + message + " successfully." + "</span>")
				.addClass("alert alert-success")
				.hide()
				.fadeIn(1500);
			setTimeout(function() {
				$('#message').fadeOut("Slow");
			}, 10000);
		}

		$.ajax({
			type: 'GET',
			url: 'project',
			data: { id: id },
			async: true,
		}).done(function(resp) {
			let site_string = JSON.parse(resp[0].sites);
			resp[0].sites = site_string;
			var project = JSON.parse(JSON.stringify(resp[0]));
			PROJECT = project;
			// alert(JSON.stringify(PROJECT));
			$("#projectName").text(project.name);
			$("#projectLocation").text(project.location);
			$("#projectArea").text(project.area);
			$("#projectStartDate").text(project.start_date);
			$("#projectEndDate").text(project.end_date);
			$("#projectDescription").text(project.description);

	
			project.sites.forEach((site, index) => {
				$("#segmentIndex").text("Segment #" + (index + 1));
				$("#siteName").text(site.name);
				$("#siteArea").text(site.area);
				$("#siteLocation").text(site.location);
				$("#siteDescription").text(site.description);
				$("#preLsValues").text(site.pre_soil_loss.ls.ls_value);
				$("#postLsValues").text(site.post_soil_loss.ls.ls_value);
				$("#preRValues").text(site.pre_soil_loss.r.r_value);
				$("#postRValues").text(site.post_soil_loss.r.r_value);
				$("#preKValue").text(site.pre_soil_loss.k);
				$("#postKValue").text(site.post_soil_loss.k);
				$("#preAvalue").text(site.pre_soil_loss.a);
				$("#postAvalue").text(site.post_soil_loss.a);
				
				let div = document.createElement('div');
				div.innerHTML = document.getElementById('siteElements').innerHTML;
				div.id = "segmentItem-" + index;
				div.className = "container mb-3 border border-warning";
				
				let siteReportContainer = document.getElementById('siteReportContainer');
				siteReportContainer.appendChild(div);
					
				//let siteReportContainer = document.getElementById('preCoversTable');
				let preCoversBody = "preCoversBody_" + index;
				let postCoversBody = "postCoversBody_" + index;
				let prePracticesBody = "prePracticesBody_" + index;
				let postPracticesBody = "postPracticesBody_" + index;
				
				$("#preCoversBody").prop("id", preCoversBody);
				$("#postCoversBody").prop("id", postCoversBody);
				$("#prePracticesBody").prop("id", prePracticesBody);
				$("#postPracticesBody").prop("id", postPracticesBody);
				
				loadCovers(site.pre_soil_loss, preCoversBody, index);
				loadCovers(site.post_soil_loss, postCoversBody, index);
				loadPractices(site.pre_soil_loss, prePracticesBody, index);
				loadPractices(site.post_soil_loss, postPracticesBody, index);
	
			});	
		}).fail(function(response) {
			//alert(response.responseText);
		});
	}
};



// Load covers			
function loadCovers(soilLoss, tableId, siteId) {
	soilLoss.covers.forEach((cover, index) => {
		addRow(tableId, (index+1), cover.bmp_name, cover.c_value, cover.percentage, cover.reference, siteId);	
	});
}

function loadPractices(soilLoss, tableId, siteId) {
	soilLoss.practices.forEach((practice, index) => {
		addRow(tableId, (index+1), practice.supportpractices_name, practice.p_value, practice.percentage, practice.reference, siteId);	
	});
}

function addRow(tableId, index, name, value, percent, reference, siteId) {
	// $("#" + tableId).prop("id", tableId + "-" + siteId);
	//let newTableId = tableId + "-" + siteId;
	//alert(newTableId);
	//$("#" + tableId).attr("id", newTableId);
	
	//return;
	
	// Get a reference to the table
	let tableRef = document.getElementById(tableId);
	//alert(tableId);
	// Insert a row at the end of the table
	let newRow = tableRef.insertRow(-1);
	// Insert a cell in the row at index 0
	let newCell1 = newRow.insertCell(0);
	let newCell2 = newRow.insertCell(1);
	let newCell3 = newRow.insertCell(2);
	let newCell4 = newRow.insertCell(3);
	let newCell5 = newRow.insertCell(4);

	// Append a text node to the cell
	newCell1.appendChild(document.createTextNode(index));
	newCell2.appendChild(document.createTextNode(name));
	newCell3.appendChild(document.createTextNode(value));
	newCell4.appendChild(document.createTextNode(percent));
	newCell5.appendChild(document.createTextNode(reference));
}

const round = (number, decimalPlaces) => {
	const factorOfTen = Math.pow(10, decimalPlaces);
	return Math.round(number * factorOfTen) / factorOfTen;
}
