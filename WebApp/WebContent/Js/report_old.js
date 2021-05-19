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
			
			$('#login_details').html('<span id="userEmail">' + resp.name + '</span> &nbsp;&nbsp;<a href="login.html" type="button" class="btn btn-outline-light me-2">Sign Out</a>');
			});
 };
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
			alert(JSON.stringify(PROJECT));
			$("#projectName").val(project.name);
			$("#projectLocation").val(project.location);
			$("#projectArea").val(project.area);
			$("#projectStartDate").val(project.start_date);
			$("#projectEndDate").val(project.end_date);
			$("#projectDescription").val(project.description);


			var preLs = 0.0;
			var preLsCount = 0;
			var postLs = 0.0;
			var postLsCount = 0;
			var preK = 0.0;
			var preKCount = 0;
			var postK = 0.0;
			var postKCount = 0;
			var preR = 0.0;
			var preRCount = 0;
			var postR = 0.0;
			var postRCount = 0;

			/*
			var ls = 0.0;
			var lsCount = 0;
			var k = 0.0;
			var kCount = 0;
			var r = 0.0;
			var rCount = 0; */
			
			project.sites.forEach((site) => {

				//loadProjectParameters(site.pre_soil_loss, preLs, preLsCount, preK, preKCount, preR, preRCount);

				//loadProjectParameters(site.post_soil_loss, postLs, postLsCount, postK, postKCount, postR, postRCount);

				// Calculate Avg Ls for Project
				if (site.pre_soil_loss.ls) {
					preLs += site.pre_soil_loss.ls.ls_value;
					preLsCount++;
				}
				if (site.post_soil_loss.ls) {
					postLs += site.post_soil_loss.ls.ls_value;
					postLsCount++;
				}
				// Calculate Avg K for Project
				if (site.pre_soil_loss.k) {
					preK += site.pre_soil_loss.k;
					preKCount++;
				}
				if (site.post_soil_loss.k) {
					postK += site.post_soil_loss.k;
					postKCount++;
				}
				// Calculate Avg R for Project
				if (site.pre_soil_loss.r) {
					preR += site.pre_soil_loss.r.r_value;
					preRCount++;
				}
				if (site.post_soil_loss.r) {
					postR += site.post_soil_loss.r.r_value;
					postRCount++;
				}
				
				loadCovers(site.pre_soil_loss, "preCoversTableBody", "pre");
				loadCovers(site.post_soil_loss, "postCoversTableBody", "post");
				loadPractices(site.pre_soil_loss, "prePracticesTableBody", "pre");
				loadPractices(site.post_soil_loss, "postPracticesTableBody", "post");
			});

			// Take avg and set Ls value
			preLs = round((preLs / preLsCount), 5);
			$("#preLs").val(preLs);
			postLs = round((postLs / postLsCount), 5);
			$("#postLs").val(postLs);

			// Take avg and set K value
			preK = round((preK / preKCount), 5);
			$("#preErodibility").val(preK);
			postK = round((postK / postKCount), 5);
			$("#postErodibility").val(postK);

			// Take avg and set R value
			preR = round((preR / preRCount), 5);
			$("#preErosivity").val(preR);
			postR = round((postR / postRCount), 5);
			$("#postErosivity").val(postR);


			//setProjectParameters("pre", preLs, preLsCount, preK, preKCount, preR, preRCount);
			//setProjectParameters("post", postLs, postLsCount, postK, postKCount, postR, postRCount);	
		}).fail(function(response) {
			alert(response.responseText);
		});
	}
};

var preCoverIndex = 0;
var postCoverIndex = 0;
// Load covers			
function loadCovers(soilLoss, tableId, type) {
	soilLoss.covers.forEach((cover) => {
		if(type == "pre") {
			preCoverIndex = preCoverIndex + 1;
			addRow(tableId, preCoverIndex, cover.bmp_name, cover.c_value, cover.percentage, cover.reference);
		} else {
			postCoverIndex = postCoverIndex + 1;
			addRow(tableId, postCoverIndex, cover.bmp_name, cover.c_value, cover.percentage, cover.reference);
		}
		
	});
}

var prePracticeIndex = 0;
var postPracticeIndex = 0;
function loadPractices(soilLoss, tableId, type) {
	soilLoss.practices.forEach((practice) => {
		if(type == "pre") {
			prePracticeIndex = prePracticeIndex + 1;
			addRow(tableId, prePracticeIndex, practice.supportpractices_name, practice.p_value, practice.percentage, practice.reference);
		} else {
			postPracticeIndex = postPracticeIndex + 1;
			addRow(tableId, postPracticeIndex, practice.supportpractices_name, practice.p_value, practice.percentage, practice.reference);
		}
		
	});
}

function addRow(tableID, index, name, value, percent, reference) {
	// Get a reference to the table
	let tableRef = document.getElementById(tableID);

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

/*
function loadProjectParameters(soilLoss, ls, lsCount, k, kCount, r, rCount){
	// Calculate Avg Ls for Project
	if(soilLoss.ls) {
		ls += soilLoss.ls.ls_value;
		lsCount++;
	}

	// Calculate Avg K for Project
	if(soilLoss.k) {
		k += soilLoss.k;
		kCount++;
	}

	// Calculate Avg R for Project
	if(soilLoss.r) {
		r += soilLoss.r.r_value;
		rCount++;
	}		
}

function setProjectParameters(type, ls, lsCount, k, kCount, r, rCount){
	// Take avg and set LS value
	ls = round((ls/lsCount), 5);
	$("#" + type + "Ls").val(ls);
	
	// Take avg and set K value
	k = round((k/kCount), 5);
	$("#" + type + "Erodibility").val(k);
	
	
	// Take avg and set R value
	r = round((r/rCount), 5);
	$("#" + type + "Erosivity").val(r);
}
*/

const round = (number, decimalPlaces) => {
	const factorOfTen = Math.pow(10, decimalPlaces);
	return Math.round(number * factorOfTen) / factorOfTen;
}
