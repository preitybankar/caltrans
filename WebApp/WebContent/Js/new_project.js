/**
 * 
 */

	//////////////////////// Datepicker ///////////////////////////////////
	$(document).ready(function(){

  		$('.datepicker').datepicker({
  		format: 'dd-mm-yyyy',
  		autoclose: true,
  		disableTouchKeyboard: true
  		});

	});
	
	class K {
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
		/*constructor() {
			this.reference = "";
			this.value = 0;
			this.percentage = 0;
  		}*/

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
		/*constructor() {
			this.reference = "";
			this.value = 0;
			this.percentage = 0;
		}*/
		
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
		
	}
	
	class SoilLoss {
		constructor() {
			this.coverList = [];
			this.practiceList = [];
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
			this.coverList.push(c);
		}
		
		getCoverCount() {
			return this.coverList.length;
		}
		
		addPractice(p) {
			this.practiceList.push(p);
		}
		
		getPracticeCount() {
			return this.practiceList.length;
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
			this.preSoilLoss = preSoilLoss;
		}
		
		getPreSoilLoss() {
			return this.preSoilLoss;
		}
		
		setPostSoilLoss(postSoilLoss) {
			this.postSoilLoss = postSoilLoss;
		}
		
		getPostSoilLoss() {
			return this.postSoilLoss;
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
			this.siteList = [];
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
			this.siteList.push(site);
		}
		
		getSite(siteId) {
			// return site by id from siteList
			return this.siteList[siteId];
		}
	}
	  		
	var i = 0;
	const PROJECT = new Project();
	const SITE_LIST = [];
	const MAX_SITES = 2;
	function createSiteAccordion() {
		if(SITE_LIST.length < MAX_SITES) {
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
	
			$("#addPreCoversBtn").prop("id", "addPreCoversBtn_" + siteIndex);
   		  	$("#addPostCoversBtn").prop("id", "addPostCoversBtn_" + siteIndex);
 		  	$("#addPrePracticesBtn").prop("id", "addPrePracticesBtn_" + siteIndex);
 		  	$("#addPostPracticesBtn").prop("id", "addPostPracticesBtn_" + siteIndex);
			$("#headingOne_" + siteIndex).html("<button id= accordion_button_" + siteIndex +" class=accordion-button type=button data-bs-toggle=collapse data-bs-target=#collapseOne_" + siteIndex + " aria-expanded=true aria-controls=collapseOne_" + siteIndex + ">" + "Site #" + siteIndex + "</button>");
	
	
			let site = new Site();
			site.setName("" + siteIndex);
			// Since we added empty precover section, add empty precover object and populate it when user enters information
			site.setPreSoilLoss(new SoilLoss());
			site.setPostSoilLoss(new SoilLoss());
			//site.addPreCover(new C());
			SITE_LIST[siteIndex] = site;
			// alert(siteList[siteIndex].getName());
		}
	
	
	 	/*if(i<10){
		  i++;
		  let div = document.createElement('div');
		  div.innerHTML = document.getElementById('accordionExampleHtml').innerHTML;
		  div.id = "accordion-item-"+i;
		  div.className = "accordion-item";
		  var accordionExample = document.getElementById('accordionExample');
		  accordionExample.appendChild(div);
		  $("#headingOne").prop("id", "headingOne_"+i);
	  	  $("#collapseOne").prop("id", "collapseOne_"+i);
		  $("#preCoverSection").prop("id", "preCoverSection_"+i);
		  $("#postCoverSection").prop("id", "postCoverSection_"+i);
		  $("#prePracticeSection").prop("id", "prePracticeSection_"+i);
		  $("#postPracticeSection").prop("id", "postPracticeSection_"+i);
 		 
		  $("#addPreCoversBtn").prop("id", "addPreCoversBtn_"+i);
   		  $("#addPostCoversBtn").prop("id", "addPostCoversBtn_"+i);
 		  $("#addPrePracticesBtn").prop("id", "addPrePracticesBtn_"+i);
 		  $("#addPostPracticesBtn").prop("id", "addPostPracticesBtn_"+i);
			
  	  	 $("#headingOne_"+i).html("<button id= accordion_button_"+i +" class=accordion-button type=button data-bs-toggle=collapse data-bs-target=#collapseOne_"+i +" aria-expanded=true aria-controls=collapseOne_"+i+">"+"Site #"+i+"</button>");
		}*/
	}
	
	const MAX_PRE_COVERS = 2;
	function addPreCoversButton(btnId) {
		let siteIndex = btnId.split("_")[1];
		
		let site = SITE_LIST[siteIndex];
		// let preCoverIndex = site.getPreCoverCount();
		let preSoilLoss = site.getPreSoilLoss();
		let preCoverIndex = preSoilLoss.getCoverCount();
		
		if(preCoverIndex < MAX_PRE_COVERS) {
			let div = document.createElement('div');
			div.id = "preCoverButton_" + preCoverIndex + "-" + siteIndex;
		  	div.innerHTML = ('<div class="input-group mb-3"><input id=preCValues_' + preCoverIndex + "-" + siteIndex + ' type="text" class="form-control" placeholder="C: Cover Management" aria-label="C: Cover Management" aria-describedby="pre_c_button" disabled><button id=preCButton_' + preCoverIndex + "-" + siteIndex + ' class="preSelectCBtn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#pre_c_modal">Select C</button></div>');
			var preCoverSection = document.getElementById('preCoverSection_'+ siteIndex);
		  	preCoverSection.appendChild(div);
	
			// Since we added empty precover section, add empty precover object and populate it when user enters information
			preSoilLoss.addCover(new C());
			//site.addPreCover(new C());
		}

		/*if(j<10){
			j++;
			let div = document.createElement('div');
			//div.innerHTML = document.getElementById('pre_cover_button_1').innerHTML;
			div.id = "preCoverButton_"+j+"-"+btnIdIndex;
		  	div.innerHTML = ('<div class="input-group mb-3"><input id=preCValues_'+j+"-"+btnIdIndex+' type="text" class="form-control" placeholder="C: Cover Management" aria-label="C: Cover Management" aria-describedby="pre_c_button" disabled><button id=preCButton_'+j+"-"+btnIdIndex+' class="preSelectCBtn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#pre_c_modal">Select C</button></div>');
			var preCoverSection = document.getElementById('preCoverSection_'+ btnIdIndex);
		  	preCoverSection.appendChild(div);
		}*/
	}

	var k = 1;
	function addPostCoversButton(btnId) {
		btnIdIndex = btnId.split("_")[1];
		if(k<10){	
			k++;
			let div = document.createElement('div');
			//div.innerHTML = document.getElementById('post_cover_button_1').innerHTML;
		  	div.id = "postCoverButton_"+k+"-"+btnIdIndex;
			div.innerHTML = ('<div class="input-group mb-3"><input id=postCValues_'+k+"-"+btnIdIndex+' type="text" class="form-control" placeholder="C: Cover Management" aria-label="C: Cover Management" aria-describedby="post_c_button" disabled><button id=postCButton_'+k+"-"+btnIdIndex+' class="postSelectCBtn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#post_c_modal">Select C</button></div>');
			var postCoverSection = document.getElementById('postCoverSection_'+ btnIdIndex);
		  	postCoverSection.appendChild(div);
		}
	}

	var m = 1;
	function addPrePracticesButton(btnId) {
		btnIdIndex = btnId.split("_")[1];
		if(m<10){		
			m++;
			let div = document.createElement('div');
			//div.innerHTML = document.getElementById('prePracticeButton_1').innerHTML;
			div.id = "prePracticeButton_"+m+"-"+btnIdIndex;
		  	div.innerHTML = ('<div class="input-group mb-3"><input id=prePValues_'+m+"-"+btnIdIndex+' type="text" class="form-control" placeholder="P: Erosion Control Practice" aria-label="P: Erosion Control Practice" aria-describedby="pre_p_button" disabled><button id=prePButton_'+m+"-"+btnIdIndex+' class="preSelectPBtn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#pre_p_modal">Select P</button></div>');
			var prePracticeSection = document.getElementById('prePracticeSection_'+ btnIdIndex);
		  	prePracticeSection.appendChild(div);
		}
	}

	var n = 1;
	function addPostPracticesButton(btnId) {
		btnIdIndex = btnId.split("_")[1];
		if(n<10){	
			n++;
			let div = document.createElement('div');
			//div.innerHTML = document.getElementById('postPracticeButton_1').innerHTML;
		  	div.id = "postPracticeButton_"+n+"-"+btnIdIndex;
			div.innerHTML = ('<div class="input-group mb-3"><input id=postPValues_'+n+"-"+btnIdIndex+' type="text" class="form-control" placeholder="P: Erosion Control Practice" aria-label="P: Erosion Control Practice" aria-describedby="post_p_button" disabled><button id=postPButton_'+n+"-"+btnIdIndex+' class="postSelectPBtn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#post_p_modal">Select P</button></div>');
			var postPracticeSection = document.getElementById('postPracticeSection_'+ btnIdIndex);
		  	postPracticeSection.appendChild(div);
		}
	}
	/////////////////////    Global variables    //////////////////////
	var isLoading = false;
	var buttonClicked;
	var lsValueMap = new Map();
	var rValueMap = new Map();
	var cValueMap = new Map();
	var refValueMap = new Map();
	var pValueMap = new Map();
	
	////////////// Load LS Values for Pre Construction //////////////
	$(document).on("click", "#pre_ls_button", function () {
		if (!isLoading) {
	        $("#pre_slope").empty();
	        $("#pre_slope_length").empty();
	        isLoading = true;   
	        $.ajax({
				type: 'GET',
		        url: 'ls',
		        async : true,
		    }).done(function(lsList) {
		    	var slopeSet = new Set();
		    	var slopeLengthSet = new Set();
		    	lsValueMap.clear();
		    	for (var i = 0; i < lsList.length ; i++ ) {
		    		var ls = lsList[i];
		    		slopeSet.add(ls.slope);
		    		slopeLengthSet.add(ls.slope_length);
		    		
		    		var key = constructLSMapKey(ls.slope, ls.slope_length);
		    		lsValueMap[key] = ls.ls_value;
		    	}
		    	slopeSet.forEach(function(slope) {
		    		$("#pre_slope").append("<option value='"+slope+"'>"+slope+"</option>");
		    	});
		    	slopeLengthSet.forEach(function(slope_length) {
		    		$("#pre_slope_length").append("<option value='"+slope_length+"'>"+slope_length+"</option>");
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
  		var lsValue = $("#pre_ls_value").text();
  		var lsSlope = $("#pre_slope").val();
  		var lsSlopeLength = $("#pre_slope_length").val();
  		if(lsValue) {
  			$("#pre_ls_values").val(lsSlope+" | "+lsSlopeLength+" | "+lsValue);
  		} else {
  			$("#pre_ls_values").val("");
  		}
 	}
	
	////////////// Load LS Values for Post - Construction ////////////////
	$(document).on("click", "#post_ls_button", function () {
	    if (!isLoading) {
	        $("#post_slope").empty();
	        $("#post_slope_length").empty();
	        isLoading = true;
	       	$.ajax({
				type: 'GET',
		        url: 'ls',
		        async : true,
		    }).done(function(lsList) {
		    	var slopeSet = new Set();
		    	var slopeLengthSet = new Set();
		    	lsValueMap.clear();
		    	for (var i = 0; i < lsList.length ; i++ ) {
		    		var ls = lsList[i];
		    		slopeSet.add(ls.slope);
		    		slopeLengthSet.add(ls.slope_length);
		    		
		    		var key = constructLSMapKey(ls.slope, ls.slope_length);
		    		lsValueMap[key] = ls.ls_value;
		    	}
		    	slopeSet.forEach(function(slope) {
		    		$("#post_slope").append("<option value='"+slope+"'>"+slope+"</option>");
		    	});
		    	slopeLengthSet.forEach(function(slope_length) {
		    		$("#post_slope_length").append("<option value='"+slope_length+"'>"+slope_length+"</option>");
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
  		if(lsValue) {
  			//$("#post_ls_button").text("LS: " + lsValue);
			$("#post_ls_values").val(lsSlope+" | "+lsSlopeLength+" | "+lsValue);
  		} else {
  			//$("#post_ls_button").text("LS: Length/Steepness");
			$("#post_ls_values").val("");
  		}
 	}

	// Common Construct Map key function //
	function constructLSMapKey(slope, slopeLength) {
		return slope.toString() + "-" + slopeLength.toString();
	}
	
	///////////// Load R Values for Pre Construction //////////////
	$(document).on("click", "#pre_r_button", function () {
		if (!isLoading) {
	        $("#pre_r_location_select").empty();
	        isLoading = true;   
	        $.ajax({
				type: 'GET',
		        url: 'r',
		        async : true,
		    }).done(function(rList) {
		    	var locationSet = new Set();
		    	rValueMap.clear();
		    	for (var i = 0; i < rList.length ; i++ ) {
		    		var r = rList[i];
		    		locationSet.add(r.location);
		    		
		    		var key = r.location;
		    		rValueMap[key] = r.r_value;
		    	}
		    	locationSet.forEach(function(location) {
		    		$("#pre_r_location_select").append("<option value='"+location+"'>"+location+"</option>");
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
	
  		if(prerValue && preLoc){
			$("#pre_r_values").val(preLoc+" | "+prerValue);
  		}
  		else{
			$("#pre_r_values").val("");
  		}
  	}
  	
  	////////////// Load R Values for Post Construction //////////////
	$(document).on("click", "#post_r_button", function () {
		if (!isLoading) {
	        $("#post_r_location_select").empty();
	        isLoading = true;   
	        $.ajax({
				type: 'GET',
		        url: 'r',
		        async : true,
		    }).done(function(rList) {
		    	var locationSet = new Set();
		    	rValueMap.clear();
		    	for (var i = 0; i < rList.length ; i++ ) {
		    		var r = rList[i];
		    		locationSet.add(r.location);
		    		
		    		var key = r.location;
		    		rValueMap[key] = r.r_value;
		    	}
		    	locationSet.forEach(function(location) {
		    		$("#post_r_location_select").append("<option value='"+location+"'>"+location+"</option>");
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
	
  		if(postrValue && postLoc){
			$("#post_r_values").val(postLoc+" | "+postrValue);
  		}
  		else{
			$("#post_r_values").val("");
  		}
  	}
	 	
  	////////////// Load C Values for Pre Construction //////////////	
	$(document).on('click', ".preSelectCBtn", function () {
		if (!isLoading) {
			buttonClicked = this.id;
	        $("#pre_bmpName").empty();
	        isLoading = true;   
	        $.ajax({
				type: 'GET',
		        url: 'c',
		        async : true,
		    }).done(function(cList) {
		    	var bmpSet = new Set();
		    	cValueMap.clear();
		    	refValueMap.clear();
		    	for (var i = 0; i < cList.length ; i++ ) {
		    		var c = cList[i];
		    		bmpSet.add(c.bmp_name);
		    		
		    		var key = c.bmp_name;
		    		cValueMap[key] = c.c_value;
		    		refValueMap[key] = c.reference;
		    	}
		    	bmpSet.forEach(function(bmp_name) {
		    		$("#pre_bmpName").append("<option value='"+bmp_name+"'>"+bmp_name+"</option>");
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
  		if(cValue && percent) {
			 $("#preCValues_"+btnIdIndex).val(bmp+" | "+cValue +" | "+percent+" | "+ref);	
  		} else {
			 $("#preCValues_"+btnIdIndex).val("");
  		}
 	}
 	
 	////////////// Load C Values for Post Construction //////////////
	$(document).on("click", ".postSelectCBtn", function () {
		if (!isLoading) {
			buttonClicked = this.id;
	        $("#post_bmpName").empty();
	        isLoading = true;   
	        $.ajax({
				type: 'GET',
		        url: 'c',
		        async : true,
		    }).done(function(cList) {
		    	var bmpSet = new Set();
		    	cValueMap.clear();
		    	refValueMap.clear();
		    	for (var i = 0; i < cList.length ; i++ ) {
		    		var c = cList[i];
		    		bmpSet.add(c.bmp_name);
		    		
		    		var key = c.bmp_name;
		    		cValueMap[key] = c.c_value;
		    		refValueMap[key] = c.reference;
		    	}
		    	bmpSet.forEach(function(bmp_name) {
		    		$("#post_bmpName").append("<option value='"+bmp_name+"'>"+bmp_name+"</option>");
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
  		if(cValue && percent) {
			$("#postCValues_"+btnIdIndex).val(bmp+" | "+cValue +" | "+percent+" | "+ref);	
  		} else {
			$("#postCValues_"+btnIdIndex).val("");
  		}
 	}
	
	////////////// Load P Values for Pre Construction //////////////
	$(document).on("click", ".preSelectPBtn", function () {
		if (!isLoading) {
			buttonClicked = this.id;
	        $("#pre_supportpracticesName").empty();
	        isLoading = true;   
	        $.ajax({
				type: 'GET',
		        url: 'p',
		        async : true,
		    }).done(function(pList) {
		    	var supportpracticesSet = new Set();
		    	pValueMap.clear();
		    	refValueMap.clear();
		    	for (var i = 0; i < pList.length ; i++ ) {
		    		var p = pList[i];
		    		supportpracticesSet.add(p.supportpractices_name);
		    		
		    		var key = p.supportpractices_name;
		    		pValueMap[key] = p.p_value;
		    		refValueMap[key] = p.reference;
		    	}
		    	supportpracticesSet.forEach(function(supportpractices_name) {
		    		$("#pre_supportpracticesName").append("<option value='"+supportpractices_name+"'>"+supportpractices_name+"</option>");
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
  		if(pValue && percent) {
			$("#prePValues_"+btnIdIndex).val(practice +" | "+ pValue + " | "+ percent +" | " + ref);	
  		} else {
			$("#prePValues_"+btnIdIndex).val("");	
  		}
 	}
 	

 	////////////// Load P Values for Post Construction //////////////
	$(document).on("click", ".postSelectPBtn", function () {
		if (!isLoading) {
			buttonClicked = this.id;
	        $("#post_supportpracticesName").empty();
	        isLoading = true;   
	        $.ajax({
				type: 'GET',
		        url: 'p',
		        async : true,
		    }).done(function(pList) {
		    	var supportpracticesSet = new Set();
		    	pValueMap.clear();
		    	refValueMap.clear();
		    	for (var i = 0; i < pList.length ; i++ ) {
		    		var p = pList[i];
		    		supportpracticesSet.add(p.supportpractices_name);
		    		
		    		var key = p.supportpractices_name;
		    		pValueMap[key] = p.p_value;
		    		refValueMap[key] = p.reference;
		    	}
		    	supportpracticesSet.forEach(function(supportpractices_name) {
		    		$("#post_supportpracticesName").append("<option value='"+supportpractices_name+"'>"+supportpractices_name+"</option>");
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
  		if(pValue && percent) {
			$("#postPValues_"+btnIdIndex).val(practice +" | "+ pValue + " | "+ percent +" | " + ref);	
  		} else {
			$("#postPValues_"+btnIdIndex).val("");	
  		}
 	}
	