/**
 * 
 */

//////////////////////// Datepicker ///////////////////////////////////
$(document).ready(function() {

	$('.datepicker').datepicker({
		format: 'dd-mm-yyyy',
		autoclose: true,
		disableTouchKeyboard: true
	});

});

/* class K {
	setValue(value) {
		this.value = value;
	}
	
	getValue() {
		return this.value;
	}
	
}
	
class R {		
	setLocation(location) {
		this.location = location;
	}
	
	getLocation() {
		return this.location;
	}
	
	setValue(value) {
		this.value = value;
	}
	
	getValue() {
		return this.value;
	}
	
	setDuration(duration) {
		this.duration = duration;
	}
	
	getDuration() {
		return this.duration;
	}
}
	
class LS {
	
	setSlope(slope) {
		this.slope = slope;
	}
	
	getSlope() {
		return this.slope;
	}
	
	setSlopeLength(slopeLength) {
		this.slopeLength = slopeLength;
	}
	
	getSlopeLength() {
		return this.slopeLength;
	}
	
	setValue(value) {
		this.value = value;
	}
	
	getValue() {
		return this.value;
	}
}
	
class C {

	setCoverBMP(coverBMP) {
		this.coverBMP = coverBMP;
	}
	
	getCoverBMP() {
		return this.coverBMP;
	}
	
	setReference(reference) {
		this.reference = reference;
	}
	
	getReference() {
		return this.reference;
	}
	
	setValue(value) {
		this.value = value;
	}
	
	getValue() {
		return this.value;
	}
	
	setPercentage(percentage) {
		this.percentage = percentage;
	}
	
	getPercentage() {
		return this.percentage;
	}
	
}
	
class P {
	
	setPractice(practice) {
		this.practice = practice;
	}
	
	getPractice() {
		return this.practice;
	}
	
	setReference(reference) {
		this.reference = reference;
	}
	
	getReference() {
		return this.reference;
	}
	
	setValue(value) {
		this.value = value;
	}
	
	getValue() {
		return this.value;
	}
	
	setPercentage(percentage) {
		this.percentage = percentage;
	}
	
	getPercentage() {
		return this.percentage;
	}
	
} */

class SoilLoss {
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

	addPractice(p) {
		this.practices.push(p);
	}

	getPracticeCount() {
		return this.practices.length;
	}

	setA(a) {
		this.a = a;
	}

	getA() {
		return this.a;
	}

}

class Site {
	/*constructor() {
		this.preCoverList = [];
		}*/

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

	/*addPreCover(c) {
		this.preCoverList.push(c);
	}
	
	getPreCoverCount() {
		return this.preCoverList.length;
	}*/
}

class Project {
	constructor() {
		this.sites = [];
	}

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

	setStartDate(startDate) {
		this.startDate = startDate;
	}

	getStartDate() {
		return this.startDate;
	}

	setEndDate(endDate) {
		this.endDate = endDate;
	}

	getEndDate() {
		return this.endDate;
	}

	setDescription(description) {
		this.description = description;
	}

	getDescription() {
		return this.description;
	}

	addSite(site) {
		this.sites.push(site);
	}

	getSite(siteId) {
		// return site by id from sites
		return this.sites[siteId];
	}
}

const PROJECT = new Project();
const SITE_LIST = [];
const MAX_SITES = 10;

function loadProject(project) {
	loadProjectDetails(project);
	if (project && project.sites) {
		loadSites(project.sites);
	}
}

function loadProjectDetails(project) {
	if (project) {
		$("#project_name").val(project.name);
		$("#project_location").val(project.location);
		$("#project_area").val(project.area);
		$("#start_date").val(project.start_date);
		$("#end_date").val(project.end_date);
		$("#project_description").val(project.description);
	}
}

function loadSites(sites) {
	if (sites.length < MAX_SITES) {
		$("div#accordionExample").empty();
		sites.forEach((site, index) => {
			//alert(JSON.stringify(site));
			loadSite(site, index);
		})
	}
}

function loadSite(site, siteIndex) {
	let div = document.createElement('div');
	div.innerHTML = document.getElementById('accordionExampleHtml').innerHTML;
	div.id = "accordion-item-" + siteIndex;
	div.className = "accordion-item";

	let accordionExample = document.getElementById('accordionExample');
	accordionExample.appendChild(div);
	$("#headingOne").prop("id", "headingOne_" + siteIndex);
	$("#collapseOne").prop("id", "collapseOne_" + siteIndex);

	$("#preCoverSection").prop("id", "preCoverSection_" + siteIndex);
	$("#postCoverSection").prop("id", "postCoverSection_" + siteIndex);
	$("#prePracticeSection").prop("id", "prePracticeSection_" + siteIndex);
	$("#postPracticeSection").prop("id", "postPracticeSection_" + siteIndex);

	$("#siteName").prop("id", "siteName_" + siteIndex);
	$("#siteLocation").prop("id", "siteLocation_" + siteIndex);
	$("#siteArea").prop("id", "siteArea_" + siteIndex);
	$("#siteDescription").prop("id", "siteDescription_" + siteIndex);

	$("#preKValue").prop("id", "preKValue_" + siteIndex);
	$("#postKValue").prop("id", "postKValue_" + siteIndex);

	$("#preLsButton").prop("id", "preLsButton_" + siteIndex);
	$("#preLsValues").prop("id", "preLsValues_" + siteIndex);
	$("#postLsButton").prop("id", "postLsButton_" + siteIndex);
	$("#postLsValues").prop("id", "postLsValues_" + siteIndex);

	$("#preRValues").prop("id", "preRValues_" + siteIndex);
	$("#preRButton").prop("id", "preRButton_" + siteIndex);
	$("#postRValues").prop("id", "postRValues_" + siteIndex);
	$("#postRButton").prop("id", "postRButton_" + siteIndex);
	
	$("#preCoverButton").prop("id", "preCoverButton_0-" + siteIndex);
	$("#preCValues").prop("id", "preCValues_0-" + siteIndex);
	$("#preCButton").prop("id", "preCButton_0-" + siteIndex);
	
	$("#postCoverButton").prop("id", "postCoverButton_0-" + siteIndex);
	$("#postCValues").prop("id", "postCValues_0-" + siteIndex);
	$("#postCButton").prop("id", "postCButton_0-" + siteIndex);
	
	$("#prePracticeButton").prop("id", "prePracticeButton_0-" + siteIndex);
	$("#prePValues").prop("id", "prePValues_0-" + siteIndex);
	$("#prePButton").prop("id", "prePButton_0-" + siteIndex);
	
	$("#postPracticeButton").prop("id", "postPracticeButton_0-" + siteIndex);
	$("#postPValues").prop("id", "postPValues_0-" + siteIndex);
	$("#postPButton").prop("id", "postPButton_0-" + siteIndex);
	

	$("#preAvalue").prop("id", "preAvalue_" + siteIndex);
	$("#postAvalue").prop("id", "postAvalue_" + siteIndex);

	$("#addPreCoversBtn").prop("id", "addPreCoversBtn_" + siteIndex);
	$("#addPostCoversBtn").prop("id", "addPostCoversBtn_" + siteIndex);
	$("#addPrePracticesBtn").prop("id", "addPrePracticesBtn_" + siteIndex);
	$("#addPostPracticesBtn").prop("id", "addPostPracticesBtn_" + siteIndex);
	$("#headingOne_" + siteIndex).html("<button id= accordion_button_" + siteIndex + " class=accordion-button type=button data-bs-toggle=collapse data-bs-target=#collapseOne_" + siteIndex + " aria-expanded=true aria-controls=collapseOne_" + siteIndex + ">" + "Site #" + (siteIndex + 1) + "</button>");

	//////////////////////////// load site details ///////////////////////////////
	loadSiteDetails(site, siteIndex);
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
	}
}

function loadSoilLoss(soilLoss, type, siteIndex) {
	if (soilLoss.k) {
		$("#" + type + "KValue_" + siteIndex).val(soilLoss.k.k_value);
	}

	if (soilLoss.ls) {
		let ls_input = (soilLoss.ls.slope + ' | ' + soilLoss.ls.slope_length + ' | ' + soilLoss.ls.ls_value);
		$("#" + type + "LsValues_" + siteIndex).val(ls_input);
	}

	if (soilLoss.r) {
		let r_input = (soilLoss.r.location + ' | ' + soilLoss.r.r_value + ' | ' + soilLoss.r.duration);
		$("#" + type + "RValues_" + siteIndex).val(r_input);
	}

	$("#" + type + "Avalue_" + siteIndex).val(soilLoss.soil_loss);
	

	$("div#" + type + "CoverButton_0" + "-" + siteIndex).remove();
	soilLoss.covers.forEach((cover, index) => {
		let div = document.createElement('div');
		div.id = type + "CoverButton_" + index + "-" + siteIndex;
		div.innerHTML = ('<div class="input-group mb-3"><input id=' + type + 'CValues_' + index + "-" + siteIndex +
			' type="text" class="form-control" placeholder="C: Cover Management" aria-label="C: Cover Management" aria-describedby="' +
			type + '_c_button" disabled><button id=' + type + 'CButton_' + index + "-" + siteIndex + ' class="' + type + 'SelectCBtn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#' + type + '_c_modal">Select C</button></div>');
		var coverSection = document.getElementById(type + 'CoverSection_' + siteIndex);
		coverSection.appendChild(div);
		if(cover) {
			let input_value = (cover.bmp_name + ' | ' + cover.c_value + ' | ' + cover.percentage + ' | ' + cover.reference);
			$("#" + type + "CValues_" + index + "-" + siteIndex).val(input_value);
		}
	});
	
	$("div#" + type + "PracticeButton_0" + "-" + siteIndex).remove();
	soilLoss.practices.forEach((practice, index) => {
		let div = document.createElement('div');
		div.id = type + "PracticeButton_" + index + "-" + siteIndex;		
		div.innerHTML = ('<div class="input-group mb-3"><input id=' + type + 'PValues_' + index + "-" + siteIndex +
			' type="text" class="form-control" placeholder="P: Erosion Control Practice" aria-label="P: Erosion Control Practice" aria-describedby="' +
			type + '_p_button" disabled><button id=' + type + 'PButton_' + index + "-" + siteIndex + ' class="' + type + 'SelectPBtn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#' + type + '_p_modal">Select P</button></div>');	
		var practiceSection = document.getElementById(type + 'PracticeSection_' + siteIndex);
		practiceSection.appendChild(div);	
		if(practice) {
			let input_value = (practice.supportpractices_name + ' | ' + practice.p_value + ' | ' + practice.percentage + ' | ' + practice.reference);
			$("#" + type + "PValues_" + index + "-" + siteIndex).val(input_value);
		}
		
	});

	
}

function createSiteAccordion() {
	
	/*var project = {
		name: "Test",
		location: "California",
		area: "8000 sqft",
		start_date: "04/21/2021",
		end_date: "04/31/2021",
		description: "Agbaii Kahihi !!!",
		sites: [
			{
				"name": "Site_0",
				"location": "Newark",
				"description": "backyard garden irrigation system",
				"area": "2000 sqft",
				pre_soil_loss: {
					k: {
						k_value: 0.68
					},
					r: {
						location: 0.2,
						r_value: 0.68,
						duration: "3 months"
					},
					ls: {
						slope: 0.2,
						slope_length: 3,
						ls_value: 0.68
					},
					covers: [
						{
							bmp_name: "Straw",
							reference: "None",
							c_value: 0.02,
							percentage: 50
						},
						{
							bmp_name: "Pavement",
							reference: "None",
							c_value: 0.07,
							percentage: 50
						}
					],
					practices: [
						{
							supportpractices_name: "Benching",
							reference: "None",
							p_value: 0.02,
							percentage: 50
						},
						{
							supportpractices_name: "Terracing",
							reference: "None",
							p_value: 0.07,
							percentage: 50
						}
					],
					soil_loss: 0.785
				},
				post_soil_loss: {
					k: {
						k_value: 0.68
					},
					r: {
						location: 0.2,
						r_value: 0.68,
						duration: "3 months"
					},
					ls: {
						slope: 0.2,
						slope_length: 3,
						ls_value: 0.34
					},
					covers: [
						{
							bmp_name: "Straw",
							reference: "None",
							c_value: 0.02,
							percentage: 50
						},
						{
							bmp_name: "Pavement",
							reference: "None",
							c_value: 0.07,
							percentage: 50
						}
					],
					practices: [
						{
							supportpractices_name: "Benching",
							reference: "None",
							p_value: 0.02,
							percentage: 50
						},
						{
							supportpractices_name: "Terracing",
							reference: "None",
							p_value: 0.07,
							percentage: 50
						}
					],
					soil_loss: 0.999

				},

			},
			{
				"name": "Site_1",
				"location": "Fremont",
				"description": "test",
				"area": "5000 sqft",
			}
		]
	}
	loadProject(project);*/
	
	loadSite({});

	return;
	if (SITE_LIST.length < MAX_SITES) {
		var siteIndex = SITE_LIST.length;

		// Add an empty form for new site
		let div = document.createElement('div');
		div.innerHTML = document.getElementById('accordionExampleHtml').innerHTML;
		div.id = "accordion-item-" + siteIndex;
		div.className = "accordion-item";

		var accordionExample = document.getElementById('accordionExample');
		accordionExample.appendChild(div);
		$("#headingOne").prop("id", "headingOne_" + siteIndex);
		$("#collapseOne").prop("id", "collapseOne_" + siteIndex);

		$("#preCoverSection").prop("id", "preCoverSection_" + siteIndex);
		$("#postCoverSection").prop("id", "postCoverSection_" + siteIndex);
		$("#prePracticeSection").prop("id", "prePracticeSection_" + siteIndex);
		$("#postPracticeSection").prop("id", "postPracticeSection_" + siteIndex);


		$("#siteName").prop("id", "siteName_" + siteIndex);
		$("#siteLocation").prop("id", "siteLocation_" + siteIndex);
		$("#siteArea").prop("id", "siteArea_" + siteIndex);
		$("#siteDescription").prop("id", "siteDescription_" + siteIndex);

		$("#preKValue").prop("id", "preKValue_" + siteIndex);
		$("#postKValue").prop("id", "postKValue_" + siteIndex);

		$("#preLsButton").prop("id", "preLsButton_" + siteIndex);
		$("#preLsValues").prop("id", "preLsValues_" + siteIndex);
		$("#postLsButton").prop("id", "postLsButton_" + siteIndex);
		$("#postLsValues").prop("id", "postLsValues_" + siteIndex);

		$("#preRValues").prop("id", "preRValues_" + siteIndex);
		$("#preRButton").prop("id", "preRButton_" + siteIndex);
		$("#postRValues").prop("id", "postRValues_" + siteIndex);
		$("#postRButton").prop("id", "postRButton_" + siteIndex);

		$("#preAvalue").prop("id", "preAvalue_" + siteIndex);
		$("#postAvalue").prop("id", "postAvalue_" + siteIndex);

		$("#addPreCoversBtn").prop("id", "addPreCoversBtn_" + siteIndex);
		$("#addPostCoversBtn").prop("id", "addPostCoversBtn_" + siteIndex);
		$("#addPrePracticesBtn").prop("id", "addPrePracticesBtn_" + siteIndex);
		$("#addPostPracticesBtn").prop("id", "addPostPracticesBtn_" + siteIndex);
		$("#headingOne_" + siteIndex).html("<button id= accordion_button_" + siteIndex + " class=accordion-button type=button data-bs-toggle=collapse data-bs-target=#collapseOne_" + siteIndex + " aria-expanded=true aria-controls=collapseOne_" + siteIndex + ">" + "Site #" + (siteIndex + 1) + "</button>");


		let site = new Site();
		site.setName("Site_" + siteIndex);
		site.setLocation("Newark");
		site.setDescription("backyard garden irrigation system");
		site.setArea("2000 sqft");
		// Since we added empty precover section, add empty precover object and populate it when user enters information
		site.setPreSoilLoss(new SoilLoss());
		site.setPostSoilLoss(new SoilLoss());
		SITE_LIST[siteIndex] = site;
		// alert(sites[siteIndex].getName());

		////////////////////////////// add one pre cover by default /////////////////////////
		let preSoilLoss = site.getPreSoilLoss();
		let preCoverIndex = preSoilLoss.getCoverCount();

		let div2 = document.createElement('div');
		div2.id = "preCoverButton_" + preCoverIndex + "-" + siteIndex;
		div2.innerHTML = ('<div class="input-group mb-3"><input id=preCValues_' + preCoverIndex + "-" + siteIndex + ' type="text" class="form-control" placeholder="C: Cover Management" aria-label="C: Cover Management" aria-describedby="pre_c_button" disabled><button id=preCButton_' + preCoverIndex + "-" + siteIndex + ' class="preSelectCBtn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#pre_c_modal">Select C</button></div>');
		var preCoverSection = document.getElementById('preCoverSection_' + siteIndex);
		preCoverSection.appendChild(div2);
		//preSoilLoss.addCover({});

		//////////////////////////// add one post cover by default /////////////////////////
		let postSoilLoss = site.getPostSoilLoss();
		let postCoverIndex = postSoilLoss.getCoverCount();

		let div3 = document.createElement('div');
		div3.id = "postCoverButton_" + postCoverIndex + "-" + siteIndex;
		div3.innerHTML = ('<div class="input-group mb-3"><input id=postCValues_' + postCoverIndex + "-" + siteIndex + ' type="text" class="form-control" placeholder="C: Cover Management" aria-label="C: Cover Management" aria-describedby="post_c_button" disabled><button id=postCButton_' + postCoverIndex + "-" + siteIndex + ' class="postSelectCBtn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#post_c_modal">Select C</button></div>');
		var postCoverSection = document.getElementById('postCoverSection_' + siteIndex);
		postCoverSection.appendChild(div3);
		postSoilLoss.addCover({});

		//////////////////////// add one pre practice by default //////////////////////////
		let prePracticeIndex = preSoilLoss.getPracticeCount();
		let div4 = document.createElement('div');
		div4.id = "prePracticeButton_" + prePracticeIndex + "-" + siteIndex;
		div4.innerHTML = ('<div class="input-group mb-3"><input id=prePValues_' + prePracticeIndex + "-" + siteIndex + ' type="text" class="form-control" placeholder="P: Erosion Control Practice" aria-label="P: Erosion Control Practice" aria-describedby="pre_p_button" disabled><button id=prePButton_' + prePracticeIndex + "-" + siteIndex + ' class="preSelectPBtn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#pre_p_modal">Select P</button></div>');
		var prePracticeSection = document.getElementById('prePracticeSection_' + siteIndex);
		prePracticeSection.appendChild(div4);
		preSoilLoss.addPractice({});

		///////////////////////// add one post practice by default ////////////////////////////
		let postPracticeIndex = postSoilLoss.getPracticeCount();
		let div5 = document.createElement('div');
		div5.id = "postPracticeButton_" + postPracticeIndex + "-" + siteIndex;
		div5.innerHTML = ('<div class="input-group mb-3"><input id=postPValues_' + postPracticeIndex + "-" + siteIndex + ' type="text" class="form-control" placeholder="P: Erosion Control Practice" aria-label="P: Erosion Control Practice" aria-describedby="post_p_button" disabled><button id=postPButton_' + postPracticeIndex + "-" + siteIndex + ' class="postSelectPBtn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#post_p_modal">Select P</button></div>');
		var postPracticeSection = document.getElementById('postPracticeSection_' + siteIndex);
		postPracticeSection.appendChild(div5);
		postSoilLoss.addPractice({});
	}
}

const MAX_PRE_COVERS = 2;
function addPreCoversButton(btnId) {
	let siteIndex = btnId.split("_")[1];

	let site = SITE_LIST[siteIndex];
	// let preCoverIndex = site.getPreCoverCount();
	let preSoilLoss = site.getPreSoilLoss();
	let preCoverIndex = preSoilLoss.getCoverCount();
	alert(preCoverIndex);

	if (preCoverIndex < MAX_PRE_COVERS) {
		let div = document.createElement('div');
		div.id = "preCoverButton_" + preCoverIndex + "-" + siteIndex;
		div.innerHTML = ('<div class="input-group mb-3"><input id=preCValues_' + preCoverIndex + "-" + siteIndex + ' type="text" class="form-control" placeholder="C: Cover Management" aria-label="C: Cover Management" aria-describedby="pre_c_button" disabled><button id=preCButton_' + preCoverIndex + "-" + siteIndex + ' class="preSelectCBtn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#pre_c_modal">Select C</button></div>');
		var preCoverSection = document.getElementById('preCoverSection_' + siteIndex);
		preCoverSection.appendChild(div);

		// Since we added empty precover section, add empty precover object and populate it when user enters information
		preSoilLoss.addCover({});
		//site.addPreCover({});
		// alert(JSON.stringify(SITE_LIST));
	}
}

// var k = 1;
const MAX_POST_COVERS = 2;
function addPostCoversButton(btnId) {

	let siteIndex = btnId.split("_")[1];

	let site = SITE_LIST[siteIndex];
	let postSoilLoss = site.getPostSoilLoss();
	let postCoverIndex = postSoilLoss.getCoverCount();

	if (postCoverIndex < MAX_POST_COVERS) {
		let div = document.createElement('div');
		div.id = "postCoverButton_" + postCoverIndex + "-" + siteIndex;

		div.innerHTML = ('<div class="input-group mb-3"><input id=postCValues_' + postCoverIndex + "-" + siteIndex + ' type="text" class="form-control" placeholder="C: Cover Management" aria-label="C: Cover Management" aria-describedby="post_c_button" disabled><button id=postCButton_' + postCoverIndex + "-" + siteIndex + ' class="postSelectCBtn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#post_c_modal">Select C</button></div>');
		var postCoverSection = document.getElementById('postCoverSection_' + siteIndex);
		postCoverSection.appendChild(div);

		// Since we added empty precover section, add empty precover object and populate it when user enters information
		postSoilLoss.addCover({});
		//site.addPreCover({});
		// alert(JSON.stringify(SITE_LIST));
	}

	/* if(k<10){	
		k++;
		let div = document.createElement('div');
		//div.innerHTML = document.getElementById('post_cover_button_1').innerHTML;
			div.id = "postCoverButton_"+k+"-"+btnIdIndex;
		div.innerHTML = ('<div class="input-group mb-3"><input id=postCValues_'+k+"-"+btnIdIndex+' type="text" class="form-control" placeholder="C: Cover Management" aria-label="C: Cover Management" aria-describedby="post_c_button" disabled><button id=postCButton_'+k+"-"+btnIdIndex+' class="postSelectCBtn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#post_c_modal">Select C</button></div>');
		var postCoverSection = document.getElementById('postCoverSection_'+ btnIdIndex);
			postCoverSection.appendChild(div);
	} */
}

// var m = 1;
const MAX_PRE_PRACTICES = 2;
function addPrePracticesButton(btnId) {

	let siteIndex = btnId.split("_")[1];

	let site = SITE_LIST[siteIndex];
	let preSoilLoss = site.getPreSoilLoss();
	let prePracticeIndex = preSoilLoss.getPracticeCount();

	if (prePracticeIndex < MAX_PRE_PRACTICES) {

		let div = document.createElement('div');
		div.id = "prePracticeButton_" + prePracticeIndex + "-" + siteIndex;
		div.innerHTML = ('<div class="input-group mb-3"><input id=prePValues_' + prePracticeIndex + "-" + siteIndex + ' type="text" class="form-control" placeholder="P: Erosion Control Practice" aria-label="P: Erosion Control Practice" aria-describedby="pre_p_button" disabled><button id=prePButton_' + prePracticeIndex + "-" + siteIndex + ' class="preSelectPBtn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#pre_p_modal">Select P</button></div>');
		var prePracticeSection = document.getElementById('prePracticeSection_' + siteIndex);
		prePracticeSection.appendChild(div);
		preSoilLoss.addPractice({});

		// alert(JSON.stringify(SITE_LIST));
	}

	/* if(m<10){		
		m++;
		let div = document.createElement('div');
		//div.innerHTML = document.getElementById('prePracticeButton_1').innerHTML;
		div.id = "prePracticeButton_"+m+"-"+btnIdIndex;
			div.innerHTML = ('<div class="input-group mb-3"><input id=prePValues_'+m+"-"+btnIdIndex+' type="text" class="form-control" placeholder="P: Erosion Control Practice" aria-label="P: Erosion Control Practice" aria-describedby="pre_p_button" disabled><button id=prePButton_'+m+"-"+btnIdIndex+' class="preSelectPBtn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#pre_p_modal">Select P</button></div>');
		var prePracticeSection = document.getElementById('prePracticeSection_'+ btnIdIndex);
			prePracticeSection.appendChild(div);
	} */
}

// var n = 1;
const MAX_POST_PRACTICES = 2;
function addPostPracticesButton(btnId) {

	let siteIndex = btnId.split("_")[1];

	let site = SITE_LIST[siteIndex];
	let postSoilLoss = site.getPostSoilLoss();
	let postPracticeIndex = postSoilLoss.getPracticeCount();

	if (postPracticeIndex < MAX_POST_PRACTICES) {

		let div = document.createElement('div');
		div.id = "postPracticeButton_" + postPracticeIndex + "-" + siteIndex;
		div.innerHTML = ('<div class="input-group mb-3"><input id=postPValues_' + postPracticeIndex + "-" + siteIndex + ' type="text" class="form-control" placeholder="P: Erosion Control Practice" aria-label="P: Erosion Control Practice" aria-describedby="post_p_button" disabled><button id=postPButton_' + postPracticeIndex + "-" + siteIndex + ' class="postSelectPBtn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#post_p_modal">Select P</button></div>');
		var postPracticeSection = document.getElementById('postPracticeSection_' + siteIndex);
		postPracticeSection.appendChild(div);
		postSoilLoss.addPractice({});

		// alert(JSON.stringify(SITE_LIST));
	}

	/* btnIdIndex = btnId.split("_")[1];
	if(n<10){	
		n++;
		let div = document.createElement('div');
		//div.innerHTML = document.getElementById('postPracticeButton_1').innerHTML;
			div.id = "postPracticeButton_"+n+"-"+btnIdIndex;
		div.innerHTML = ('<div class="input-group mb-3"><input id=postPValues_'+n+"-"+btnIdIndex+' type="text" class="form-control" placeholder="P: Erosion Control Practice" aria-label="P: Erosion Control Practice" aria-describedby="post_p_button" disabled><button id=postPButton_'+n+"-"+btnIdIndex+' class="postSelectPBtn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#post_p_modal">Select P</button></div>');
		var postPracticeSection = document.getElementById('postPracticeSection_'+ btnIdIndex);
			postPracticeSection.appendChild(div);
	} */
}
/////////////////////    Global variables    //////////////////////
var isLoading = false;
var buttonClicked;
const lsValueMap = new Map();
var rValueMap = new Map();
var cValueMap = new Map();
var refValueMap = new Map();
var pValueMap = new Map();

const lsMap = new Map();

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
	let site = SITE_LIST[siteId];
	let preSoilLoss = site.getPreSoilLoss();
	preSoilLoss.setLS(ls);
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
			lsValueMap.clear();
			for (var i = 0; i < lsList.length; i++) {
				var ls = lsList[i];
				slopeSet.add(ls.slope);
				slopeLengthSet.add(ls.slope_length);

				var key = constructLSMapKey(ls.slope, ls.slope_length);
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
	var lsValue = $("#post_ls_value").text();
	var lsSlope = $("#post_slope").val();
	var lsSlopeLength = $("#post_slope_length").val();
	var btnIdIndex = buttonClicked.split("_")[1];
	if (lsValue) {
		//$("#post_ls_button").text("LS: " + lsValue);
		$("#postLsValues_" + btnIdIndex).val(lsSlope + " | " + lsSlopeLength + " | " + lsValue);
	} else {
		//$("#post_ls_button").text("LS: Length/Steepness");
		$("#postLsValues_" + btnIdIndex).val("");
	}
}

// Common Construct Map key function //
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
			var locationSet = new Set();
			rValueMap.clear();
			for (var i = 0; i < rList.length; i++) {
				var r = rList[i];
				locationSet.add(r.location);

				var key = r.location;
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
	var prerValue = $('#pre_r_value_text').val();
	var preLoc = $('#pre_r_location_text').val();
	var btnIdIndex = buttonClicked.split("_")[1];
	if (prerValue && preLoc) {
		$("#preRValues_" + btnIdIndex).val(preLoc + " | " + prerValue);
	}
	else {
		$("#preRValues_" + btnIdIndex).val("");
	}
}

////////////// Load R Values for Post Construction //////////////
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
			var locationSet = new Set();
			rValueMap.clear();
			for (var i = 0; i < rList.length; i++) {
				var r = rList[i];
				locationSet.add(r.location);

				var key = r.location;
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
	$('#select_post_r_button').attr("disabled", (r == null));
}

function onSelectPostRButtonClick() {
	var postrValue = $('#post_r_value_text').val();
	var postLoc = $('#post_r_location_text').val();
	var btnIdIndex = buttonClicked.split("_")[1];
	if (postrValue && postLoc) {
		$("#postRValues_" + btnIdIndex).val(postLoc + " | " + postrValue);
	}
	else {
		$("#postRValues_" + btnIdIndex).val("");
	}
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
			var bmpSet = new Set();
			cValueMap.clear();
			refValueMap.clear();
			for (var i = 0; i < cList.length; i++) {
				var c = cList[i];
				bmpSet.add(c.bmp_name);

				var key = c.bmp_name;
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
	var cValue = $("#pre_c_value").text();
	var bmp = $("#pre_bmpName").val();
	var ref = $("#pre_c_reference").text();
	var percent = $("#pre_c_percent").val();
	var btnIdIndex = buttonClicked.split("_")[1];
	if (cValue && percent) {
		$("#preCValues_" + btnIdIndex).val(bmp + " | " + cValue + " | " + percent + " | " + ref);
	} else {
		$("#preCValues_" + btnIdIndex).val("");
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
			var bmpSet = new Set();
			cValueMap.clear();
			refValueMap.clear();
			for (var i = 0; i < cList.length; i++) {
				var c = cList[i];
				bmpSet.add(c.bmp_name);

				var key = c.bmp_name;
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
	var cValue = $("#post_c_value").text();
	var bmp = $("#post_bmpName").val();
	var ref = $("#post_c_reference").text();
	var percent = $("#post_c_percent").val();
	var btnIdIndex = buttonClicked.split("_")[1];
	if (cValue && percent) {
		$("#postCValues_" + btnIdIndex).val(bmp + " | " + cValue + " | " + percent + " | " + ref);
	} else {
		$("#postCValues_" + btnIdIndex).val("");
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
			var supportpracticesSet = new Set();
			pValueMap.clear();
			refValueMap.clear();
			for (var i = 0; i < pList.length; i++) {
				var p = pList[i];
				supportpracticesSet.add(p.supportpractices_name);

				var key = p.supportpractices_name;
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
	var pValue = $("#pre_p_value").text();
	var practice = $("#pre_supportpracticesName").val();
	var ref = $("#pre_p_reference").text();
	var percent = $("#pre_p_percent").val();
	var btnIdIndex = buttonClicked.split("_")[1];
	if (pValue && percent) {
		$("#prePValues_" + btnIdIndex).val(practice + " | " + pValue + " | " + percent + " | " + ref);
	} else {
		$("#prePValues_" + btnIdIndex).val("");
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
			var supportpracticesSet = new Set();
			pValueMap.clear();
			refValueMap.clear();
			for (var i = 0; i < pList.length; i++) {
				var p = pList[i];
				supportpracticesSet.add(p.supportpractices_name);

				var key = p.supportpractices_name;
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
	var pValue = $("#post_p_value").text();
	var practice = $("#post_supportpracticesName").val();
	var ref = $("#post_p_reference").text();
	var percent = $("#post_p_percent").val();
	var btnIdIndex = buttonClicked.split("_")[1];
	if (pValue && percent) {
		$("#postPValues_" + btnIdIndex).val(practice + " | " + pValue + " | " + percent + " | " + ref);
	} else {
		$("#postPValues_" + btnIdIndex).val("");
	}
}
