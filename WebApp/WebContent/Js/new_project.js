//////////////////////// Datepicker ///////////////////////////////////
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
$(document).ready(function() {

	 $('.datepicker').datepicker({
		format: 'yyyy-mm-dd',
		autoclose: true,
		disableTouchKeyboard: true
	}); 
	
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

}); 

/*class SoilLoss {
	constructor() {
		this.covers = [];
		this.practices = [];
	}

	setK(k) {
		this.k = k;
	}

	getK() {
		return this.k;
	}

	setR(r) {
		this.r = r;
	}

	getR() {
		return this.r;
	}

	setLS(ls) {
		this.ls = ls;
	}

	getLS() {
		return this.ls;
	}

	addCover(c) {
		this.covers.push(c);
	}
	
	getCoverCount() {
		return this.covers.length;
	}
	
	setCover(cover, coverId) {
		this.covers[coverId] = cover;	
	}
	
	addPractice(p) {
		this.practices.push(p);
	}

	getPracticeCount() {
		return this.practices.length;
	}
	
	setPractice(practice, practiceId) {
		this.practices[practiceId] = practice;	
	}

	setA(a) {
		this.a = a;
	}

	getA() {
		return this.a;
	}

}

class Site {
	setName(name) {
		this.name = name;
	}

	getName() {
		return this.name;
	}

	setLocation(location) {
		this.location = location;
	}

	getLocation() {
		return this.location;
	}

	setArea(area) {
		this.area = area;
	}

	getArea() {
		return this.area;
	}

	setDescription(description) {
		this.description = description;
	}

	getDescription() {
		return this.description;
	}

	setPreSoilLoss(preSoilLoss) {
		this.pre_soil_loss = preSoilLoss;
	}

	getPreSoilLoss() {
		return this.pre_soil_loss;
	}

	setPostSoilLoss(postSoilLoss) {
		this.post_soil_loss = postSoilLoss;
	}

	getPostSoilLoss() {
		return this.post_soil_loss;
	}
}*/

var PROJECT = {};
PROJECT.sites = [];
const SITE_LIST = [];
const MAX_SITES = 10;

function loadProject(project) {
	// console.log(project);
	loadProjectDetails(project);
	if (project && project.sites) {
		loadSites(project.sites);
	}
}

function loadProjectDetails(project) {
	if (project) {
		$("#projectName").val(project.name);
		$("#projectLocation").val(project.location);
		$("#projectArea").val(project.area);
		$("#startDate").val(project.start_date);
		$("#endDate").val(project.end_date);
		$("#projectDescription").val(project.description);
		$("#preAvgSoilLoss").text(project.pre_construction_soil_loss);
		$("#postAvgSoilLoss").text(project.post_construction_soil_loss);
	}
}

function loadSites(sites) {
	 // alert(JSON.stringify(sites));
	if (sites.length < MAX_SITES) {
		$("div#accordionExample").empty();
		sites.forEach((site, index) => {
			// alert(JSON.stringify(site));
			addSiteUI(index);
			//////////////////////////// load site details ///////////////////////////////
			loadSiteDetails(site, index);
		});
	}
}

function addSiteUI(siteIndex) {
	let div = document.createElement('div');
	div.innerHTML = document.getElementById('accordionExampleHtml').innerHTML;
	div.id = "accordion-item-" + siteIndex;
	div.className = "accordion-item";

	let accordionExample = document.getElementById('accordionExample');
	accordionExample.appendChild(div);
	$("#headingOne").prop("id", "headingOne_" + siteIndex);
	$("#collapseOne").prop("id", "collapseOne_" + siteIndex);
	$("#siteName").prop("id", "siteName_" + siteIndex);
	$("#siteLocation").prop("id", "siteLocation_" + siteIndex);
	$("#siteArea").prop("id", "siteArea_" + siteIndex);
	$("#deleteSiteBtn").prop("id", "deleteSiteBtn_" + siteIndex);
	$("#siteDescription").prop("id", "siteDescription_" + siteIndex);
	$("#headingOne_" + siteIndex).html("<button id= accordion_button_" + siteIndex + " class=accordion-button type=button data-bs-toggle=collapse data-bs-target=#collapseOne_" + siteIndex + " aria-expanded=true aria-controls=collapseOne_" + siteIndex + ">" + "Segment #" + (siteIndex + 1) + "</button>");
	changeIds("pre", siteIndex);
	changeIds("post", siteIndex);
}

function changeIds(type, siteIndex) {
	$("#" + type + "CoverSection").prop("id", type + "CoverSection_" + siteIndex);
	$("#" + type + "PracticeSection").prop("id", type + "PracticeSection_" + siteIndex);
	$("#" + type + "KValue").prop("id", type + "KValue_" + siteIndex);
	$("#" + type + "RValues").prop("id", type + "RValues_" + siteIndex);
	$("#" + type + "RButton").prop("id", type + "RButton_" + siteIndex);
	$("#" + type + "LsButton").prop("id", type + "LsButton_" + siteIndex);
	$("#" + type + "LsValues").prop("id", type + "LsValues_" + siteIndex);	
	$("#" + type + "CoverButton").prop("id", type + "CoverButton_0-" + siteIndex);
	$("#" + type + "CValues").prop("id", type + "CValues_0-" + siteIndex);
	$("#" + type + "CButton").prop("id", type + "CButton_0-" + siteIndex);
	$("#" + type + "PracticeButton").prop("id", type + "PracticeButton_0-" + siteIndex);
	$("#" + type + "PValues").prop("id", type + "PValues_0-" + siteIndex);
	$("#" + type + "PButton").prop("id", type + "PButton_0-" + siteIndex);
	$("#" + type + "CDelBtn").prop("id", type + "CDelBtn_0-" + siteIndex);	
	$("#" + type + "PDelBtn").prop("id", type + "PDelBtn_0-" + siteIndex);	
	$("#" + type + "Avalue").prop("id", type + "Avalue_" + siteIndex);
	$("#add" + type + "CoversBtn").prop("id", "add"+ type + "CoversBtn_" + siteIndex);
	$("#add" + type + "PracticesBtn").prop("id", "add"+ type + "PracticesBtn_" + siteIndex);
	$("#" + type + "ConsCalculateBtn").prop("id", type + "ConsCalculateBtn_" + siteIndex);
}
	
function loadSiteDetails(site, siteIndex) {
	if (site) {
		$("#siteName_" + siteIndex).val(site.name);
		$("#siteLocation_" + siteIndex).val(site.location);
		$("#siteArea_" + siteIndex).val(site.area);
		$("#siteDescription_" + siteIndex).val(site.description);

		if (site.pre_soil_loss) {
			loadSoilLoss(site.pre_soil_loss, "pre", siteIndex);
		}
		if (site.post_soil_loss) {
			loadSoilLoss(site.post_soil_loss, "post", siteIndex);
		}
		document.getElementById("saveProjectDiv").style.display = 'block';
	}
}

function loadSoilLoss(soilLoss, type, siteIndex) {
	if (soilLoss.k) {
		$("#" + type + "KValue_" + siteIndex).val(soilLoss.k);	
	}

	if (soilLoss.ls) {
		let ls_input = (soilLoss.ls.slope + ' | ' + soilLoss.ls.slope_length + ' | ' + soilLoss.ls.ls_value);
		$("#" + type + "LsValues_" + siteIndex).val(ls_input);
	}

	if (soilLoss.r) {
		//let r_input = (soilLoss.r.location + ' | ' + soilLoss.r.r_value + ' | ' + soilLoss.r.duration);
		let r_input = (soilLoss.r.location + ' | ' + soilLoss.r.r_value);
		$("#" + type + "RValues_" + siteIndex).val(r_input);
	}

	$("#" + type + "Avalue_" + siteIndex).text(soilLoss.a);
	
		
	soilLoss.covers.forEach((cover, index) => {
		if (index != 0) {
			let div = document.createElement('div');
			div.id = type + "CoverButton_" + index + "-" + siteIndex;
			div.innerHTML = ('<div class="input-group mb-3"><input id=' + type + 'CValues_' + index + "-" + siteIndex +
			' type="text" class="form-control" placeholder="C: Cover Management" aria-label="C: Cover Management" aria-describedby="' +
			type + '_c_button" disabled><button id=' + type + 'CButton_' + index + "-" + siteIndex + ' class="' + type + 'SelectCBtn btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#' + type + '_c_modal">Select C</button><button id=' + type + 'CDelBtn_' + index + "-" + siteIndex + " onclick=deleteCBtn(this.id," + "'" + type + "'" + ') class="btn btn-outline-secondary btn-sm"><i class="bi bi-dash"></i></button></div>');
			var coverSection = document.getElementById(type + 'CoverSection_' + siteIndex);
			coverSection.appendChild(div);		
		}		
		if(cover && cover.bmp_name && cover.c_value && cover.percentage && cover.reference) {
			let input_value = (cover.bmp_name + ' | ' + cover.c_value + ' | ' + cover.percentage + ' | ' + cover.reference);
			$("#" + type + "CValues_" + index + "-" + siteIndex).val(input_value);
		}
	});


	soilLoss.practices.forEach((practice, index) => {
		if (index != 0) {		
			let div = document.createElement('div');
			div.id = type + "PracticeButton_" + index + "-" + siteIndex;		
			div.innerHTML = ('<div class="input-group mb-3"><input id=' + type + 'PValues_' + index + "-" + siteIndex +
				' type="text" class="form-control" placeholder="P: Erosion Control Practice" aria-label="P: Erosion Control Practice" aria-describedby="' +
				type + '_p_button" disabled><button id=' + type + 'PButton_' + index + "-" + siteIndex + ' class="' + type + 'SelectPBtn btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#' + type + '_p_modal">Select P</button><button id=' + type + 'PDelBtn_' + index + "-" + siteIndex + " onclick=deletePBtn(this.id," + "'" + type + "'" + ') class="btn btn-outline-secondary btn-sm"><i class="bi bi-dash"></i></button></div>');	
			var practiceSection = document.getElementById(type + 'PracticeSection_' + siteIndex);
			practiceSection.appendChild(div);	
		}
		if(practice && practice.supportpractices_name && practice.p_value && practice.percentage && practice.reference) {
			let input_value = (practice.supportpractices_name + ' | ' + practice.p_value + ' | ' + practice.percentage + ' | ' + practice.reference);
			$("#" + type + "PValues_" + index + "-" + siteIndex).val(input_value);
		}
		
	});

	
}

function createSiteAccordion() {
	const siteIndex = PROJECT.sites.length;
	let site = {};
	
	// Initialize pre soil loss
	site.pre_soil_loss = {};
	site.pre_soil_loss.covers = [];
	site.pre_soil_loss.covers.push({});
	site.pre_soil_loss.practices = [];
	site.pre_soil_loss.practices.push({});
	
	// Initialize post soil loss
	site.post_soil_loss = {};
	site.post_soil_loss.covers = [];
	site.post_soil_loss.covers.push({});
	site.post_soil_loss.practices = [];
	site.post_soil_loss.practices.push({});
	
	PROJECT.sites[siteIndex] = site;
	loadSites(PROJECT.sites); 
}

const MAX_PRE_COVERS = 10;
function addPreCoversButton(btnId) {
	
	let siteIndex = btnId.split("_")[1];
	// alert(siteIndex);
	let site = PROJECT.sites[siteIndex];
	// alert(JSON.stringify(site));
	let preSoilLoss = site.pre_soil_loss;
	// alert(site.pre_soil_loss);
	let preCoverIndex = preSoilLoss.covers.length;

	if (preCoverIndex < MAX_PRE_COVERS) {
		let div = document.createElement('div');
		div.id = "preCoverButton_" + preCoverIndex + "-" + siteIndex;
		div.innerHTML = ('<div class="input-group mb-3"><input id=preCValues_' + preCoverIndex + "-" + siteIndex + ' type="text" class="form-control" placeholder="C: Cover Management" aria-label="C: Cover Management" aria-describedby="pre_c_button" disabled><button id=preCButton_' + preCoverIndex + "-" + siteIndex + ' class="preSelectCBtn btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#pre_c_modal">Select C</button><button id=preCDelBtn_' + preCoverIndex + "-" + siteIndex + " onclick=deleteCBtn(this.id," + "'pre'" + ') class="btn btn-outline-secondary btn-sm"><i class="bi bi-dash"></i></button></div>');
		var preCoverSection = document.getElementById('preCoverSection_' + siteIndex);
		preCoverSection.appendChild(div);
		// Since we added empty precover section, add empty precover object and populate it when user enters information
		preSoilLoss.covers.push({});
	}
}

const MAX_POST_COVERS = 10;
function addPostCoversButton(btnId) {
	let siteIndex = btnId.split("_")[1];
	let site = PROJECT.sites[siteIndex];
	let postSoilLoss = site.post_soil_loss;
	let postCoverIndex = postSoilLoss.covers.length;

	if (postCoverIndex < MAX_POST_COVERS) {
		let div = document.createElement('div');
		div.id = "postCoverButton_" + postCoverIndex + "-" + siteIndex;
		div.innerHTML = ('<div class="input-group mb-3"><input id=postCValues_' + postCoverIndex + "-" + siteIndex + ' type="text" class="form-control" placeholder="C: Cover Management" aria-label="C: Cover Management" aria-describedby="post_c_button" disabled><button id=postCButton_' + postCoverIndex + "-" + siteIndex + ' class="postSelectCBtn btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#post_c_modal">Select C</button><button id=postCDelBtn_' + postCoverIndex + "-" + siteIndex + " onclick=deleteCBtn(this.id," + "'post'" + ') class="btn btn-outline-secondary btn-sm"><i class="bi bi-dash"></i></button></div>');
		var postCoverSection = document.getElementById('postCoverSection_' + siteIndex);
		postCoverSection.appendChild(div);
		postSoilLoss.covers.push({});
	}
}

const MAX_PRE_PRACTICES = 10;
function addPrePracticesButton(btnId) {

	let siteIndex = btnId.split("_")[1];
	let site = PROJECT.sites[siteIndex];
	let preSoilLoss = site.pre_soil_loss;
	let prePracticeIndex = preSoilLoss.practices.length;

	if (prePracticeIndex < MAX_PRE_PRACTICES) {

		let div = document.createElement('div');
		div.id = "prePracticeButton_" + prePracticeIndex + "-" + siteIndex;
		div.innerHTML = ('<div class="input-group mb-3"><input id=prePValues_' + prePracticeIndex + "-" + siteIndex + ' type="text" class="form-control" placeholder="P: Erosion Control Practice" aria-label="P: Erosion Control Practice" aria-describedby="pre_p_button" disabled><button id=prePButton_' + prePracticeIndex + "-" + siteIndex + ' class="preSelectPBtn btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#pre_p_modal">Select P</button><button id=prePDelBtn_' + prePracticeIndex + "-" + siteIndex + " onclick=deletePBtn(this.id," + "'pre'" + ') class="btn btn-outline-secondary btn-sm"><i class="bi bi-dash"></i></button></div>');
		var prePracticeSection = document.getElementById('prePracticeSection_' + siteIndex);
		prePracticeSection.appendChild(div);
		preSoilLoss.practices.push({});
	}
}

const MAX_POST_PRACTICES = 10;
function addPostPracticesButton(btnId) {

	let siteIndex = btnId.split("_")[1];
	let site = PROJECT.sites[siteIndex];
	//alert(JSON.stringify(site));
	let postSoilLoss = site.post_soil_loss;
	let postPracticeIndex = postSoilLoss.practices.length;

	if (postPracticeIndex < MAX_POST_PRACTICES) {

		let div = document.createElement('div');
		div.id = "postPracticeButton_" + postPracticeIndex + "-" + siteIndex;
		div.innerHTML = ('<div class="input-group mb-3"><input id=postPValues_' + postPracticeIndex + "-" + siteIndex + ' type="text" class="form-control" placeholder="P: Erosion Control Practice" aria-label="P: Erosion Control Practice" aria-describedby="post_p_button" disabled><button id=postPButton_' + postPracticeIndex + "-" + siteIndex + ' class="postSelectPBtn btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#post_p_modal">Select P</button><button id=postPDelBtn_' + postPracticeIndex + "-" + siteIndex + " onclick=deletePBtn(this.id," + "'post'" + ') class="btn btn-outline-secondary btn-sm"><i class="bi bi-dash"></i></button></div>');
		var postPracticeSection = document.getElementById('postPracticeSection_' + siteIndex);
		postPracticeSection.appendChild(div);
		postSoilLoss.practices.push({});
	}
}


window.onload = function () {   
    if (window.location.search.split('?').length > 1) {
        var id = window.location.search.split('?')[1].split('=')[1];
       // alert("id :" + id);		
		$.ajax({
			type: 'GET',
			url: 'project',
			data: {id: id},
			async: true,
		}).done(function(resp) {
			 let site_string = JSON.parse(resp[0].sites);
			 resp[0].sites = site_string;
			 var project = JSON.parse(JSON.stringify(resp[0]));	 
			 PROJECT = project;
			 loadProject(project);		
		}).fail(function(response) {			
			//alert(response.responseText);		
		});
    }
};

/////////////////////    Global variables    //////////////////////
var isLoading = false;
var buttonClicked;
const lsValueMap = new Map();
var rValueMap = new Map();
var cValueMap = new Map();
var refValueMap = new Map();
var pValueMap = new Map();

const lsMap = new Map();
const rMap = new Map();
const cMap = new Map();
const pMap = new Map();

////////////// Load LS Values for Pre Construction //////////////
$(document).on("click", ".preSelectLsBtn", function() {
	if (!isLoading) {
		buttonClicked = this.id;
		$("#pre_slope").empty();
		$("#pre_slope_length").empty();
		isLoading = true;
		$.ajax({
			type: 'GET',
			url: 'ls',
			async: true,
		}).done(function(lsList) {
			var slopeSet = new Set();
			var slopeLengthSet = new Set();
			lsMap.clear();
			lsValueMap.clear();
			for (var i = 0; i < lsList.length; i++) {
				var ls = lsList[i];
				slopeSet.add(ls.slope);
				slopeLengthSet.add(ls.slope_length);

				var key = constructLSMapKey(ls.slope, ls.slope_length);
				lsMap[key] = ls;

				lsValueMap[key] = ls.ls_value;
			}
			slopeSet.forEach(function(slope) {
				$("#pre_slope").append("<option value='" + slope + "'>" + slope + "</option>");
			});
			slopeLengthSet.forEach(function(slope_length) {
				$("#pre_slope_length").append("<option value='" + slope_length + "'>" + slope_length + "</option>");
			});
			// Update Pre LS value for the current slope and length
			var slope = $("#pre_slope").val();
			var slopeLength = $("#pre_slope_length").val();
			setPreLSValue(slope, slopeLength);
			isLoading = false;
		}).fail(function(response) {
			alert(response.responseText);
		});
	}
});


////////////// Set/Update LS for Pre-Construction //////////////
$(document).on('change', '#pre_slope', function() {
	var slopeLength = $("#pre_slope_length").val();
	setPreLSValue(this.value, slopeLength);
});

$(document).on('change', '#pre_slope_length', function() {
	var slope = $("#pre_slope").val();
	setPreLSValue(slope, this.value);
});

function setPreLSValue(slope, slopeLength) {
	var key = constructLSMapKey(slope, slopeLength);
	var ls = lsValueMap[key];
	$("#pre_ls_value").text((ls == null) ? "" : ls);
	$('#select_pre_ls_button').attr("disabled", (ls == null));
}

function onSelectPreLSButtonClick() {
	//var lsValue = $("#pre_ls_value").text();
	var lsSlope = $("#pre_slope").val();
	var lsSlopeLength = $("#pre_slope_length").val();
	var siteId = buttonClicked.split("_")[1];
	var key = constructLSMapKey(lsSlope, lsSlopeLength);
	var ls = lsMap[key];
	let site = PROJECT.sites[siteId];
	site.pre_soil_loss.ls = ls;
	if (ls) {
		$("#preLsValues_" + siteId).val(ls.slope + " | " + ls.slope_length + " | " + ls.ls_value);
	} else {
		$("#preLsValues_" + siteId).val("");
	}
}

////////////// Load LS Values for Post - Construction ////////////////
$(document).on("click", ".postSelectLsBtn", function() {
	if (!isLoading) {
		buttonClicked = this.id;
		$("#post_slope").empty();
		$("#post_slope_length").empty();
		isLoading = true;
		$.ajax({
			type: 'GET',
			url: 'ls',
			async: true,
		}).done(function(lsList) {
			var slopeSet = new Set();
			var slopeLengthSet = new Set();
			lsMap.clear();
			lsValueMap.clear();
			for (var i = 0; i < lsList.length; i++) {
				var ls = lsList[i];
				slopeSet.add(ls.slope);
				slopeLengthSet.add(ls.slope_length);

				var key = constructLSMapKey(ls.slope, ls.slope_length);
				
				lsMap[key] = ls;
				lsValueMap[key] = ls.ls_value;
			}
			slopeSet.forEach(function(slope) {
				$("#post_slope").append("<option value='" + slope + "'>" + slope + "</option>");
			});
			slopeLengthSet.forEach(function(slope_length) {
				$("#post_slope_length").append("<option value='" + slope_length + "'>" + slope_length + "</option>");
			});
			// Update Post LS value for the current slope and length
			var slope = $("#post_slope").val();
			var slopeLength = $("#post_slope_length").val();
			setPostLSValue(slope, slopeLength);
			isLoading = false;
		}).fail(function(response) {
			alert(response.responseText);
		});
	}
});

////////////// Set/Update LS Value for Post - Construction //////////////
$(document).on('change', '#post_slope', function() {
	var slopeLength = $("#post_slope_length").val();
	setPostLSValue(this.value, slopeLength);
});

$(document).on('change', '#post_slope_length', function() {
	var slope = $("#post_slope").val();
	setPostLSValue(slope, this.value);
});

function setPostLSValue(slope, slopeLength) {
	var key = constructLSMapKey(slope, slopeLength);
	var ls = lsValueMap[key];

	$("#post_ls_value").text((ls == null) ? "" : ls);
	$('#select_post_ls_button').attr("disabled", (ls == null));
}

function onSelectPostLSButtonClick() {
	// var lsValue = $("#post_ls_value").text();
	let lsSlope = $("#post_slope").val();
	let lsSlopeLength = $("#post_slope_length").val();	
	let siteId = buttonClicked.split("_")[1];
	let key = constructLSMapKey(lsSlope, lsSlopeLength);
	let ls = lsMap[key];
	let site = PROJECT.sites[siteId];
	site.post_soil_loss.ls = ls;
	if (ls) {
		$("#postLsValues_" + siteId).val(ls.slope + " | " + ls.slope_length + " | " + ls.ls_value);
	} else {
		$("#postLsValues_" + siteId).val("");
	}	
}

// Common Construct Map key function for LS //
function constructLSMapKey(slope, slopeLength) {
	return slope.toString() + "-" + slopeLength.toString();
}

///////////// Load R Values for Pre Construction //////////////
$(document).on("click", ".preSelectRBtn", function() {
	if (!isLoading) {
		buttonClicked = this.id;
		$("#pre_r_location_select").empty();
		isLoading = true;
		$.ajax({
			type: 'GET',
			url: 'r',
			async: true,
		}).done(function(rList) {
			let siteId = buttonClicked.split("_")[1];	
			if ($("#preRValues_" + siteId).val()) {
				let selectedVal = ($("#preRValues_" + siteId).val()).split(" | ");
				$("#pre_r_location_text").val(selectedVal[0]);
				$("#pre_r_value_text").val(selectedVal[1]);	
			} else {
				$("#pre_r_location_text").val("");
				$("#pre_r_value_text").val("");	
			}
			var locationSet = new Set();
			rMap.clear();
			rValueMap.clear();
			for (var i = 0; i < rList.length; i++) {
				var r = rList[i];
				locationSet.add(r.location);

				var key = r.location;
				rMap[key] = r;
				rValueMap[key] = r.r_value;
			}
			locationSet.forEach(function(location) {
				$("#pre_r_location_select").append("<option value='" + location + "'>" + location + "</option>");
			});
			// Update Pre R
			var location = $("#pre_r_location_select").val();
			setPreRValue(location);
			isLoading = false;
		}).fail(function(response) {
			alert(response.responseText);
		});
	}
});

////////////// Set/Update R for Pre-Construction //////////////	
$(document).on('change', '#pre_r_location_select', function() {
	setPreRValue(this.value);
});

function setPreRValue(location) {
	var key = location;
	var r = rValueMap[key];
	$("#pre_r_value_select").text((r == null) ? "" : r);
}		


function onSelectPreRButtonClick() {
	let preRValue = $('#pre_r_value_text').val();
	let preLoc = $('#pre_r_location_text').val();
	
	let objR = new Object();
		objR.location = preLoc;
		objR.r_value = parseFloat(preRValue);
		
	let siteId = buttonClicked.split("_")[1];
	let site = PROJECT.sites[siteId];
	let key = preLoc;
	let r = rMap[key];
	if(objR && objR.location && objR.r_value) {
		$("#preRValues_" + siteId).val(objR.location + " | " + objR.r_value);
		r = objR;
	} 
	else {
		$("#preRValues_" + siteId).val("");
	}		
	site.pre_soil_loss.r = r;
}

///////////// Load R Values for Post Construction Database //////////////
$(document).on("click", ".postSelectRBtn", function() {
	if (!isLoading) {
		buttonClicked = this.id;
		$("#post_r_location_select").empty();
		isLoading = true;
		$.ajax({
			type: 'GET',
			url: 'r',
			async: true,
		}).done(function(rList) {
			let siteId = buttonClicked.split("_")[1];	
			if ($("#postRValues_" + siteId).val()) {
				let selectedVal = ($("#postRValues_" + siteId).val()).split(" | ");
				$("#post_r_location_text").val(selectedVal[0]);
				$("#post_r_value_text").val(selectedVal[1]);	
			} else {
				$("#post_r_location_text").val("");
				$("#post_r_value_text").val("");	
			}
			var locationSet = new Set();
			rMap.clear();
			rValueMap.clear();
			for (var i = 0; i < rList.length; i++) {
				var r = rList[i];
				locationSet.add(r.location);
				var key = r.location;
				rMap[key] = r;
				rValueMap[key] = r.r_value;
			}
			locationSet.forEach(function(location) {
				$("#post_r_location_select").append("<option value='" + location + "'>" + location + "</option>");
			});
			// Update Pre R
			var location = $("#post_r_location_select").val();
			setPostRValue(location);
			isLoading = false;
		}).fail(function(response) {
			alert(response.responseText);
		});
	}
});

////////////// Set/Update R for Post-Construction //////////////	
$(document).on('change', '#post_r_location_select', function() {
	setPostRValue(this.value);
});

function setPostRValue(location) {
	var key = location;
	var r = rValueMap[key];
	$("#post_r_value_select").text((r == null) ? "" : r);
}


function onSelectPostRButtonClick() {
	let postRValue = $('#post_r_value_text').val();
	let postLoc = $('#post_r_location_text').val();
	let objR = new Object();
		objR.location = postLoc;
		objR.r_value = parseFloat(postRValue);
	let siteId = buttonClicked.split("_")[1];
	let site = PROJECT.sites[siteId];
	let key = postLoc;
	let r = rMap[key];
	if(objR && objR.location && objR.r_value) {
		$("#postRValues_" + siteId).val(objR.location + " | " + objR.r_value);
		r = objR;
	}
	else {
		$("#postRValues_" + siteId).val("");
	}	
	site.post_soil_loss.r = r;
}

////////////// Load C Values for Pre Construction //////////////	
$(document).on('click', ".preSelectCBtn", function() {
	if (!isLoading) {
		buttonClicked = this.id;
		$("#pre_bmpName").empty();
		isLoading = true;
		$.ajax({
			type: 'GET',
			url: 'c',
			async: true,
		}).done(function(cList) {		
			let siteId = buttonClicked.split("_")[1];
			$("#preCsiteId").val(siteId);
			if ($("#preCValues_" + siteId).val()) {
				let selectedVal = ($("#preCValues_" + siteId).val()).split(" | ");
				$("#pre_c_percent").val(selectedVal[2]);	
			} else {
				$("#pre_c_percent").val("");
			}
			document.getElementById("pre_c_percent").classList.remove("is-valid");
			document.getElementById("pre_c_percent").classList.remove("is-invalid");		
			var bmpSet = new Set();
			cMap.clear();
			cValueMap.clear();
			refValueMap.clear();
			for (var i = 0; i < cList.length; i++) {
				var c = cList[i];
				bmpSet.add(c.bmp_name);

				var key = c.bmp_name;
				cMap[key] =  c;
				cValueMap[key] = c.c_value;
				refValueMap[key] = c.reference;
			}
			bmpSet.forEach(function(bmp_name) {
				$("#pre_bmpName").append("<option value='" + bmp_name + "'>" + bmp_name + "</option>");
			});
			// Update Pre LS value for the current slope and length
			var bmp = $("#pre_bmpName").val();
			setPreCValue(bmp);
			isLoading = false;
		}).fail(function(response) {
			alert(response.responseText);
		});
	}
});


////////////// Set/Update C for Pre-Construction //////////////
$(document).on('change', '#pre_bmpName', function() {
	setPreCValue(this.value);
});

function setPreCValue(bmp) {
	var key = bmp;
	var c = cValueMap[key];
	var ref = refValueMap[key];
	$("#pre_c_value").text((c == null) ? "" : c);
	$("#pre_c_reference").text((ref == null) ? "" : ref);
	$('#select_pre_c_button').attr("disabled", (c == null));
}

function onSelectPreCButtonClick() {
	// var cValue = $("#pre_c_value").text();
	let bmpName = $("#pre_bmpName").val();
	// let ref = $("#pre_c_reference").text();
	let percent = parseFloat ($("#pre_c_percent").val());
	let key = bmpName;
	let c = cMap[key];
	c.percentage = percent;
	let idsArray = buttonClicked.split("_")[1].split("-");
	let coverId = idsArray[0];
	let siteId = idsArray[1];
	let site = PROJECT.sites[siteId];
	site.pre_soil_loss.covers[coverId] = c;
	if (c) {
		$("#preCValues_" + coverId + "-" + siteId).val(c.bmp_name + " | " + c.c_value + " | " + c.percentage + " | " + c.reference);
	} else {
		$("#preCValues_" + coverId + "-" + siteId).val("");
	}	
}

////////////// Load C Values for Post Construction //////////////
$(document).on("click", ".postSelectCBtn", function() {
	if (!isLoading) {
		buttonClicked = this.id;
		$("#post_bmpName").empty();
		isLoading = true;
		$.ajax({
			type: 'GET',
			url: 'c',
			async: true,
		}).done(function(cList) {
			let siteId = buttonClicked.split("_")[1];
			$("#postCsiteId").val(siteId);	
			if ($("#postCValues_" + siteId).val()) {
				let selectedVal = ($("#postCValues_" + siteId).val()).split(" | ");
				$("#post_c_percent").val(selectedVal[2]);	
			} else {
				$("#post_c_percent").val("");
			}	
			document.getElementById("post_c_percent").classList.remove("is-valid");
			document.getElementById("post_c_percent").classList.remove("is-invalid");	
			var bmpSet = new Set();
			cMap.clear();
			cValueMap.clear();
			refValueMap.clear();
			for (var i = 0; i < cList.length; i++) {
				var c = cList[i];
				bmpSet.add(c.bmp_name);

				var key = c.bmp_name;
				cMap[key] =  c;
				cValueMap[key] = c.c_value;
				refValueMap[key] = c.reference;
			}
			bmpSet.forEach(function(bmp_name) {
				$("#post_bmpName").append("<option value='" + bmp_name + "'>" + bmp_name + "</option>");
			});
			// Update Pre LS value for the current slope and length
			var bmp = $("#post_bmpName").val();
			setPostCValue(bmp);
			isLoading = false;
		}).fail(function(response) {
			alert(response.responseText);
		});
	}
});


////////////// Set/Update C for Post-Construction //////////////	
$(document).on('change', '#post_bmpName', function() {
	setPostCValue(this.value);
});

function setPostCValue(bmp) {
	var key = bmp;
	var c = cValueMap[key];
	var ref = refValueMap[key];
	$("#post_c_value").text((c == null) ? "" : c);
	$("#post_c_reference").text((ref == null) ? "" : ref);
	$('#select_post_c_button').attr("disabled", (c == null));
}

function onSelectPostCButtonClick() {
	// var cValue = $("#post_c_value").text();
	var bmpName = $("#post_bmpName").val();
	// var ref = $("#post_c_reference").text();
	var percent = parseFloat($("#post_c_percent").val());
	let key = bmpName;
	let c = cMap[key];
	c.percentage = percent;
	let idsArray = buttonClicked.split("_")[1].split("-");
	let coverId = idsArray[0];
	let siteId = idsArray[1];
	let site = PROJECT.sites[siteId];
	site.post_soil_loss.covers[coverId] = c;
	if (c) {
		$("#postCValues_" + coverId + "-" + siteId).val(c.bmp_name + " | " + c.c_value + " | " + c.percentage + " | " + c.reference);
	} else {
		$("#postCValues_" + coverId + "-" + siteId).val("");
	}	
}

////////////// Load P Values for Pre Construction //////////////
$(document).on("click", ".preSelectPBtn", function() {
	if (!isLoading) {
		buttonClicked = this.id;
		$("#pre_supportpracticesName").empty();
		isLoading = true;
		$.ajax({
			type: 'GET',
			url: 'p',
			async: true,
		}).done(function(pList) {
			let siteId = buttonClicked.split("_")[1];
			$("#prePsiteId").val(siteId);	
			if ($("#prePValues_" + siteId).val()) {
				let selectedVal = ($("#prePValues_" + siteId).val()).split(" | ");
				$("#pre_p_percent").val(selectedVal[2]);	
			} else {
				$("#pre_p_percent").val("");
			}
			document.getElementById("pre_p_percent").classList.remove("is-valid");
			document.getElementById("pre_p_percent").classList.remove("is-invalid");	
			var supportpracticesSet = new Set();
			pMap.clear();
			pValueMap.clear();
			refValueMap.clear();
			for (var i = 0; i < pList.length; i++) {
				var p = pList[i];
				supportpracticesSet.add(p.supportpractices_name);

				var key = p.supportpractices_name;
				pMap[key] = p;
				pValueMap[key] = p.p_value;
				refValueMap[key] = p.reference;
			}
			supportpracticesSet.forEach(function(supportpractices_name) {
				$("#pre_supportpracticesName").append("<option value='" + supportpractices_name + "'>" + supportpractices_name + "</option>");
			});
			// Update Pre P value for the current support practices
			var supportpractices = $("#pre_supportpracticesName").val();
			setPrePValue(supportpractices);
			isLoading = false;
		}).fail(function(response) {
			alert(response.responseText);
		});
	}
});


////////////// Set/Update P for Pre-Construction //////////////
$(document).on('change', '#pre_supportpracticesName', function() {
	setPrePValue(this.value);
});

function setPrePValue(supportpractices) {
	var key = supportpractices;
	var p = pValueMap[key];
	var ref = refValueMap[key];
	$("#pre_p_value").text((p == null) ? "" : p);
	$("#pre_p_reference").text((ref == null) ? "" : ref);
	$('#select_pre_p_button').attr("disabled", (p == null));
}

function onSelectPrePButtonClick() {
	// var pValue = $("#pre_p_value").text();
	var practice = $("#pre_supportpracticesName").val();
	// var ref = $("#pre_p_reference").text();
	var percent = parseFloat($("#pre_p_percent").val());
	let key = practice;
	let p = pMap[key];
	p.percentage = percent;
	let idsArray = buttonClicked.split("_")[1].split("-");
	let practiceId = idsArray[0];
	let siteId = idsArray[1];
	let site = PROJECT.sites[siteId];
	site.pre_soil_loss.practices[practiceId] = p;
	if (p) {
		$("#prePValues_" + practiceId + "-" + siteId).val(p.supportpractices_name + " | " + p.p_value + " | " + p.percentage + " | " + p.reference);
	} else {
		$("#prePValues_" + practiceId + "-" + siteId).val("");
	}		
}

////////////// Load P Values for Post Construction //////////////
$(document).on("click", ".postSelectPBtn", function() {
	if (!isLoading) {
		buttonClicked = this.id;
		$("#post_supportpracticesName").empty();
		isLoading = true;
		$.ajax({
			type: 'GET',
			url: 'p',
			async: true,
		}).done(function(pList) {
			let siteId = buttonClicked.split("_")[1];
			$("#postPsiteId").val(siteId);	
			if ($("#postPValues_" + siteId).val()) {
				let selectedVal = ($("#postPValues_" + siteId).val()).split(" | ");
				$("#post_p_percent").val(selectedVal[2]);	
			} else {
				$("#post_p_percent").val("");
			}
			document.getElementById("post_p_percent").classList.remove("is-valid");
			document.getElementById("post_p_percent").classList.remove("is-invalid");	
			var supportpracticesSet = new Set();
			pValueMap.clear();
			pMap.clear();
			refValueMap.clear();
			for (var i = 0; i < pList.length; i++) {
				var p = pList[i];
				supportpracticesSet.add(p.supportpractices_name);

				var key = p.supportpractices_name;
				pMap[key] = p;
				pValueMap[key] = p.p_value;
				refValueMap[key] = p.reference;
			}
			supportpracticesSet.forEach(function(supportpractices_name) {
				$("#post_supportpracticesName").append("<option value='" + supportpractices_name + "'>" + supportpractices_name + "</option>");
			});
			// Update Post P value for the current support practices
			var supportpractices = $("#post_supportpracticesName").val();
			setPostPValue(supportpractices);
			isLoading = false;
		}).fail(function(response) {
			alert(response.responseText);
		});
	}
});


////////////// Set/Update P for Post-Construction //////////////
$(document).on('change', '#post_supportpracticesName', function() {
	setPostPValue(this.value);
});

function setPostPValue(supportpractices) {
	var key = supportpractices;
	var p = pValueMap[key];
	var ref = refValueMap[key];
	$("#post_p_value").text((p == null) ? "" : p);
	$("#post_p_reference").text((ref == null) ? "" : ref);
	$('#select_post_p_button').attr("disabled", (p == null));
}

function onSelectPostPButtonClick() {
	// var pValue = $("#post_p_value").text();
	var practice = $("#post_supportpracticesName").val();
	// var ref = $("#post_p_reference").text();
	var percent = parseFloat($("#post_p_percent").val());
	let key = practice;
	let p = pMap[key];
	p.percentage = percent;
	let idsArray = buttonClicked.split("_")[1].split("-");
	let practiceId = idsArray[0];
	let siteId = idsArray[1];
	let site = PROJECT.sites[siteId];
	site.post_soil_loss.practices[practiceId] = p
	if (p) {
		$("#postPValues_" + practiceId + "-" + siteId).val(p.supportpractices_name + " | " + p.p_value + " | " + p.percentage + " | " + p.reference);
	} else {
		$("#postPValues_" + practiceId + "-" + siteId).val("");
	}
}

function setKValue(elementId, type) {
	let kValue = parseFloat($("#" + elementId).val());
	let siteId = elementId.split("_")[1];
	let site = PROJECT.sites[siteId];
	
	if (kValue) {
		if(type == "pre") {
			site.pre_soil_loss.k = kValue;
		} else {
			site.post_soil_loss.k = kValue;
		}
	}
}

function setSiteDetails(elementId) {
	let arr = elementId.split("_");
	let siteId = arr[1];
	let site = PROJECT.sites[siteId];
	
	if (arr[0] == "siteName") {
		site.name = $("#" + elementId).val();
	}
	else if (arr[0] == "siteArea") {
		site.area = parseFloat($("#" + elementId).val());
	}
	else if (arr[0] == "siteLocation") {
		site.location = $("#" + elementId).val();
	}
	else if (arr[0] == "siteDescription" ) {
		site.description = $("#" + elementId).val();
	}
}

function setProjectDetails(elementId) {
	if (elementId == "projectName") {
		PROJECT.name = $("#" + elementId).val();
	}
	else if (elementId == "projectArea") {
		PROJECT.area = parseFloat($("#" + elementId).val());
	}
	else if (elementId == "projectLocation") {
		PROJECT.location = $("#" + elementId).val();
	}
	else if (elementId == "projectDescription" ) {
		PROJECT.description = $("#" + elementId).val();
	}
}

function checkCoverPercentVal(elementId, type) {
	var percent = parseFloat($("#" + elementId).val());
	var combineId = $("#" + type + "CsiteId").val().split("-");
	
	var btnIndex = combineId[0];
	var siteIndex = combineId[1];
	var site = PROJECT.sites[siteIndex];
	var totalPercent = 0.00 + percent;
	
	if (type == "pre") {
		soilLoss = site.pre_soil_loss;
	} else {
		soilLoss = site.post_soil_loss;
	}
	soilLoss.covers.forEach((cover, index) => {
    	if(cover.percentage && index != btnIndex) {
			totalPercent += cover.percentage;
		}
	});
	
	if (totalPercent > parseFloat(100)) {
		document.getElementById("select_" + type +"_c_button").disabled = true;
		document.getElementById(type + "CPercentExceedsFlag").style.display = "block";
		document.getElementById(type + "_c_percent").classList.add("is-invalid");
		document.getElementById(type + "_c_percent").classList.remove("is-valid");
	
	} else {
		document.getElementById("select_" + type +"_c_button").disabled = false;
		document.getElementById(type + "CPercentExceedsFlag").style.display = "none";
		document.getElementById(type + "_c_percent").classList.add("is-valid");	
		document.getElementById(type + "_c_percent").classList.remove("is-invalid");
	}			
}


function checkPracticePercentVal(elementId, type) {
	var percent = parseFloat($("#" + elementId).val());
	var combineId = $("#" + type + "PsiteId").val().split("-");
	
	var btnIndex = combineId[0];
	var siteIndex = combineId[1];
	var site = PROJECT.sites[siteIndex];
	var totalPercent = 0.00 + percent;
	
	if (type == "pre") {
		soilLoss = site.pre_soil_loss;
	} else {
		soilLoss = site.post_soil_loss;
	}
	soilLoss.practices.forEach((practice, index) => {
    	if(practice.percentage && index != btnIndex) {
			totalPercent += practice.percentage;
		}
	});
	
	if (totalPercent > parseFloat(100)) {
		document.getElementById("select_" + type +"_p_button").disabled = true;
		document.getElementById(type + "PPercentExceedsFlag").style.display = "block";
		document.getElementById(type + "_p_percent").classList.add("is-invalid");
		document.getElementById(type + "_p_percent").classList.remove("is-valid");
	
	} else {
		document.getElementById("select_" + type +"_p_button").disabled = false;
		document.getElementById(type + "PPercentExceedsFlag").style.display = "none";
		document.getElementById(type + "_p_percent").classList.add("is-valid");	
		document.getElementById(type + "_p_percent").classList.remove("is-invalid");
	}			
}


$(document).on("click", ".calculatePreSoilLoss", function() {
	let siteId = (this.id).split("_")[1];
	let site = PROJECT.sites[siteId];
	calculateSoilLoss(siteId, site.pre_soil_loss, "pre" );
});

$(document).on("click", ".calculatePostSoilLoss", function() {
	let siteId = (this.id).split("_")[1];
	let site = PROJECT.sites[siteId];
	calculateSoilLoss(siteId, site.post_soil_loss, "post" );
});


function calculateSoilLoss(siteId, soilLoss, type) {
	var kVal = soilLoss.k

	if (soilLoss.ls) {
		var lsVal = soilLoss.ls.ls_value;
	}
	
	if (soilLoss.r) {
		var rVal = soilLoss.r.r_value;
	}
		
	var totalC = 0.00;
	var totalP = 0.00;
	
	soilLoss.covers.forEach((cover) => {
    	totalC += parseFloat(cover.c_value * (cover.percentage/100));
	});
	
	soilLoss.practices.forEach((practice) => {	
    	totalP += parseFloat(practice.p_value * (practice.percentage/100));
	});
	
	if (kVal && lsVal && rVal && totalC && totalP) {
		let result = parseFloat((kVal * lsVal * rVal * totalC * totalP));
		var soilLossA = round(result, 7);	
	}

	$("#" + type + "Avalue_" + siteId).text(soilLossA);
	soilLoss.a = soilLossA;
	
	var preAvgSoilLoss = 0.0;
	var postAvgSoilLoss = 0.0;
	var count = 0;
	
	if (type == "pre") {
		PROJECT.sites.forEach((site) => {
			if(site.pre_soil_loss.a) {
				preAvgSoilLoss += site.pre_soil_loss.a;
				count++;
			}
		});	
		if(preAvgSoilLoss > 0.0) {
			preAvgSoilLoss = round((preAvgSoilLoss / count), 7);
		}
		$("#preAvgSoilLoss").text(preAvgSoilLoss);	
	} else {
		PROJECT.sites.forEach((site) => {
			if(site.post_soil_loss.a) {
				postAvgSoilLoss += site.post_soil_loss.a;
				count++;
			}
		});
		if(postAvgSoilLoss > 0.0) {
			postAvgSoilLoss = round((postAvgSoilLoss / count), 7);
		}
		$("#postAvgSoilLoss").text(postAvgSoilLoss);
	}
	
	var preProjectSL = parseFloat($("#preAvgSoilLoss").text());
	var postProjectSL = parseFloat($("#postAvgSoilLoss").text());
	
	PROJECT.pre_construction_soil_loss = preProjectSL;
	PROJECT.post_construction_soil_loss = postProjectSL;
	
	if(postProjectSL > preProjectSL) {
		$('#comparisonResult').html("<span><strong>Warning! </strong>Post - construction soil loss is greater than Pre - construction soil loss. Try using better cover BMP's and support practices to improve the results.</span>").addClass("alert alert-warning");
	} 
	else if(postProjectSL < preProjectSL) {
		$('#comparisonResult').html("<span><strong>Well done! </strong>Post - construction soil loss is less than Pre - construction soil loss. Thus, there is no significant Soil Erosion happened after construction of this project.</span>").addClass("alert alert-success");
	} 
	else {
		$('#comparisonResult').html("<span><strong>Good job! </strong>Soil loss for Pre - construction and Post - construction is equal. Thus, there is no significant Soil Erosion happened after construction of this project.</span>").addClass("alert alert-primary");
	}
}

const round = (number, decimalPlaces) => {
  const factorOfTen = Math.pow(10, decimalPlaces);
  return Math.round(number * factorOfTen) / factorOfTen;
}
////////////////////////// DELETE SITE ////////////////////////////////
function deleteSite(elementId) {
	let siteId = elementId.split("_")[1];
	PROJECT.sites.splice(siteId, 1);
	var siteHtml = document.getElementById("accordion-item-" + siteId);
  	siteHtml.remove();
}

////////////////////////// DELETE COVER ////////////////////////////////
function deleteCBtn(elementId, type) {
	let idsArray = elementId.split("_")[1].split("-");
	let coverId = idsArray[0];
	let siteId = idsArray[1];
	let site = PROJECT.sites[siteId];
	if(type == "pre"){
		site.pre_soil_loss.covers.splice(coverId, 1);

	} else {
		site.post_soil_loss.covers.splice(coverId, 1);
	}
	let divId = type + "CoverButton_" + coverId + "-" + siteId;
	let coverBtnHtml = document.getElementById(divId);
  	coverBtnHtml.remove();
}
////////////////////////// DELETE PRACTICE ////////////////////////////////
function deletePBtn(elementId, type) {
	let idsArray = elementId.split("_")[1].split("-");
	let practiceId = idsArray[0];
	let siteId = idsArray[1];
	let site = PROJECT.sites[siteId];
	if(type == "pre"){
		site.pre_soil_loss.practices.splice(practiceId, 1);

	} else {
		site.post_soil_loss.practices.splice(practiceId, 1);
	}
	let divId = type + "PracticeButton_" + practiceId + "-" + siteId;
	let practiceBtnHtml = document.getElementById(divId);
  	practiceBtnHtml.remove();
}

//////////////////////// PROJECT SAVE BUTTON //////////////////////////
var stringifySitesJson = false;
$(document).on("click", "#saveProjectBtn", function() {
	PROJECT.start_date = $("#startDate").val();
	PROJECT.end_date = $("#endDate").val();
	PROJECT.pre_construction_soil_loss = parseFloat($("#preAvgSoilLoss").text());;
	PROJECT.post_construction_soil_loss = parseFloat($("#postAvgSoilLoss").text());

	if (stringifySitesJson == false) {	
		PROJECT.sites = JSON.stringify(PROJECT.sites);
		stringifySitesJson = true;
	}
		 
	$.ajax({
		type: 'POST',
		url: 'project',
		data: PROJECT,
		async: true,
	}).done(function(response) {
		if (response.success) {
			window.location = 'report.html?id=' + response.id + '&status=' + response.success + '&message=' + response.message;
		}
	}).fail(function(response) {
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
});

