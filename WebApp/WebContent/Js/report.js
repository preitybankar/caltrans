/**
 * 
 */
var PROJECT = {};
window.onload = function() {
		var email= document.cookie;
		$.ajax({
			type: 'GET',
			url: 'login',
			data: { email: email },
			async: true,
		}).done(function(resp) {
			
		 var element = document.getElementById("login_details");
		 document.getElementById("login_details").innerHTML = '<span id="userEmail">' + resp.name + '</span> &nbsp;&nbsp;<a href="login.html" type="button" class="btn btn-warning">Sign Out</a>';
			});
			
	if (window.location.search.split('?').length > 1) {
		var paramsArray = window.location.search.split('?')[1].split('&');
		if(paramsArray.length == 1) {
			var id = paramsArray[0].split('=')[1];
		} else {
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
			$("#preAvgSoilLoss").text(project.pre_construction_soil_loss);
			$("#postAvgSoilLoss").text(project.post_construction_soil_loss);
	
			project.sites.forEach((site, index) => {

				let div = document.createElement('div');
				let siteElementId = "siteElement-" + index;
				div.innerHTML = document.getElementById('siteElement').innerHTML;
				div.id = siteElementId;
				div.className = "container mb-3 border border-warning";
				
				let siteReportContainer = document.getElementById('siteReportContainer');
				siteReportContainer.appendChild(div);
				
				changeIds("pre", index);
				changeIds("post", index);
				
				// Load Site details
				$("#segmentIndex_" + index).text("Segment #" + (index + 1));
				$("#siteName_" + index).text(site.name);
				$("#siteArea_" + index).text(site.area);
				$("#siteLocation_" + index).text(site.location);
				$("#siteDescription_" + index).text(site.description);

				// Load LS Values
				loadLSValue(site.pre_soil_loss, "pre", index);
				loadLSValue(site.post_soil_loss, "post", index);
				
				// Load R Values
				loadRValue(site.pre_soil_loss, "pre", index);
				loadRValue(site.post_soil_loss, "post", index);
				
				// Load K Values
				$("#siteElement-" + index).find("#preKValue_" + index).text(site.pre_soil_loss.k);
				$("#siteElement-" + index).find("#postKValue_" + index).text(site.post_soil_loss.k);
				
				// Load A:Soil Loss Values
				$("#siteElement-" + index).find("#preAValue_" + index).text(site.pre_soil_loss.a);
				$("#siteElement-" + index).find("#postAValue_" + index).text(site.post_soil_loss.a);
		
				// Load Pre Covers
				let preCoversBodyId = changeTableIds("pre", "Covers", index, siteElementId);
				loadCovers(site.pre_soil_loss, preCoversBodyId);
				
				// Load Post Covers
				let postCoversBodyId = changeTableIds("post", "Covers", index, siteElementId);
				loadCovers(site.post_soil_loss, postCoversBodyId);
				
				// Load Post Practices	
				let prePracticesBodyId = changeTableIds("pre", "Practices", index, siteElementId);
				loadPractices(site.pre_soil_loss, prePracticesBodyId);
				
				// Load Post Practices
				let postPracticesBodyId = changeTableIds("post", "Practices", index, siteElementId);
				loadPractices(site.post_soil_loss, postPracticesBodyId);
			});	
		}).fail(function(response) {
			 alert(response.responseText);
		});
	}
	
	document.getElementById("downloadReportBtn").addEventListener("click", () => {
		const main = this.document.getElementById("download_report_section");
        console.log(main);
        console.log(window);
        var opt = {
        	margin: 0.5,
        	filename: 'Rusle_Report.pdf',
        	image: { type: 'png', quality: 1 },
        	html2canvas: {scale: 4, logging: true},
        	jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        
        alert("Please wait. Report is being generated...");
        html2pdf().from(main).set(opt).save();
    })
};

function changeIds(type, siteIndex) {
	$("#siteElement-" + siteIndex).find("#segmentIndex").prop("id", "segmentIndex_" + siteIndex);
	$("#siteElement-" + siteIndex).find("#siteName").prop("id", "siteName_" + siteIndex);
	$("#siteElement-" + siteIndex).find("#siteArea").prop("id", "siteArea_" + siteIndex);
	$("#siteElement-" + siteIndex).find("#siteLocation").prop("id", "siteLocation_" + siteIndex);
	$("#siteElement-" + siteIndex).find("#siteDescription").prop("id", "siteDescription_" + siteIndex);	
	$("#siteElement-" + siteIndex).find("#" + type + "LsValues").prop("id", type + "LsValues_" + siteIndex);
	$("#siteElement-" + siteIndex).find("#" + type + "RValues").prop("id", type + "RValues_" + siteIndex);
	$("#siteElement-" + siteIndex).find("#" + type + "KValue").prop("id", type + "KValue_" + siteIndex);
	$("#siteElement-" + siteIndex).find("#" + type + "AValue").prop("id", type + "AValue_" + siteIndex);
}

//Change cover and practice table Ids
function changeTableIds(type, itemToLoad, siteIndex, siteElementId) {
	let tableId = type + itemToLoad + "Table_" + siteIndex;
	$("#" + siteElementId).find('#' + type + itemToLoad + 'Table').prop("id", tableId);
				
	let bodyId = type + itemToLoad + "Body_" + siteIndex;
	$("#" + tableId).find('#' + type + itemToLoad + 'Body').prop("id", bodyId);
	
	return bodyId;
}
//Load LS
function loadLSValue(soilLoss, type, siteIndex) {
	if (soilLoss.ls) {
		$("#" + type +"LsValues_" + siteIndex).text(soilLoss.ls.ls_value);
	} else {
		$("#" + type +"LsValues_" + siteIndex).text("");
	}			
}

//Load R
function loadRValue(soilLoss, type, siteIndex) {
	if (soilLoss.r) {
		$("#" + type +"RValues_" + siteIndex).text(soilLoss.r.r_value);
	} else {
		$("#" + type +"RValues_" + siteIndex).text("");
	}			
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
	
	if (typeof name == "undefined" && typeof value == "undefined" && typeof percent == "undefined" && typeof reference == "undefined") {
		//Do not add table row
	} else {
		// Add table row
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
		if (typeof name != "undefined") {
			newCell2.appendChild(document.createTextNode(name));
		} else {
			newCell2.appendChild(document.createTextNode(""));
		}
		if (typeof value != "undefined") {
			newCell3.appendChild(document.createTextNode(value));
		} else {
			newCell3.appendChild(document.createTextNode(""));
		}
		if (typeof percent != "undefined") {
			newCell4.appendChild(document.createTextNode(percent));
		} else {
			newCell4.appendChild(document.createTextNode(""));
		}
		if (typeof reference != "undefined") {
			newCell5.appendChild(document.createTextNode(reference));
		} else {
			newCell5.appendChild(document.createTextNode(""));
		}
	}
	
}

const round = (number, decimalPlaces) => {
	const factorOfTen = Math.pow(10, decimalPlaces);
	return Math.round(number * factorOfTen) / factorOfTen;
}

function takeBacktoEdit() {
	var projectId = PROJECT.id;
    window.location = 'new_project.html?id=' + projectId;
}
