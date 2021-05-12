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

				// changeIds("pre", index);
				// changeIds("post", index);
				
				let div = document.createElement('div');
				let siteElementId = "siteElement-" + index;
				div.innerHTML = document.getElementById('siteElement').innerHTML;
				div.id = siteElementId;
				div.className = "container mb-3 border border-warning";
				
				let siteReportContainer = document.getElementById('siteReportContainer');
				siteReportContainer.appendChild(div);
				
				// Load Pre Covers
				// let preCoversTableId = "preCoversTable_" + index;
				// $("#" + siteElementId).find('#preCoversTable').prop("id", preCoversTableId);
				
				// let preCoversBodyId = "preCoversBody_" + index;
				// $("#" + preCoversTableId).find('#preCoversBody').prop("id", preCoversBodyId);
				
				let preCoversBodyId = changeIds("pre", "Covers", index, siteElementId);
				loadCovers(site.pre_soil_loss, preCoversBodyId);
				
				// Load Post Covers
				// let postCoversTableId = "postCoversTable_" + index;
				// $("#" + siteElementId).find('#postCoversTable').prop("id", postCoversTableId);
				
				// let postCoversBodyId = "postCoversBody_" + index;
				// $("#" + postCoversTableId).find('#postCoversBody').prop("id", postCoversBodyId);
				let postCoversBodyId = changeIds("post", "Covers", index, siteElementId);
				loadCovers(site.post_soil_loss, postCoversBodyId);
				
				// Load Post Practices
				// let prePracticesTableId = "prePracticesTable_" + index;
				// $("#" + siteElementId).find('#prePracticesTable').prop("id", prePracticesTableId);
				
				// let prePracticesBodyId = "prePracticesBody_" + index;
				// $("#" + prePracticesTableId).find('#prePracticesBody').prop("id", prePracticesBodyId);
				let prePracticesBodyId = changeIds("pre", "Practices", index, siteElementId);
				loadPractices(site.pre_soil_loss, prePracticesBodyId);
				
				// Load Post Practices
				// let postPracticesTableId = "postPracticesTable_" + index;
				// $("#" + siteElementId).find('#postPracticesTable').prop("id", postPracticesTableId);
				
				// let postPracticesBodyId = "postPracticesBody_" + index;
				// $("#" + postPracticesTableId).find('#postPracticesBody').prop("id", postPracticesBodyId);
				
				let postPracticesBodyId = changeIds("post", "Practices", index, siteElementId);
				loadPractices(site.post_soil_loss, postPracticesBodyId);
			});	
		}).fail(function(response) {
			 alert(response.responseText);
		});
	}
};

function changeIds(type, itemToLoad, siteIndex, siteElementId) {
	let tableId = type + itemToLoad + "Table_" + siteIndex;
	
	$("#" + siteElementId).find('#' + type + itemToLoad + 'Table').prop("id", tableId);
				
	let bodyId = type + itemToLoad + "Body_" + siteIndex;
	$("#" + tableId).find('#' + type + itemToLoad + 'Body').prop("id", bodyId);
	
	return bodyId;
}

// Load covers			
function loadCovers(soilLoss, tableId) {
	soilLoss.covers.forEach((cover, index) => {
		addRow(tableId, (index+1), cover.bmp_name, cover.c_value, cover.percentage, cover.reference);	
	});
}
// Load practices	
function loadPractices(soilLoss, tableId) {
	soilLoss.practices.forEach((practice, index) => {
		addRow(tableId, (index+1), practice.supportpractices_name, practice.p_value, practice.percentage, practice.reference);	
	});
}

function addRow(tableId, index, name, value, percent, reference) {
	// Get a reference to the table
	let tableRef = document.getElementById(tableId);
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
