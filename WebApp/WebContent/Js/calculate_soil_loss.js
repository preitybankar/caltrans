/**
 * 
 */
 	////////////// Load LS Values for Pre Construction //////////////
	
	var lsValueMap = new Map(); // Global variable
	var isLoading = false;	// Global variable
	
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
  		if(lsValue) {
  			$("#pre_ls_button").text("LS: " + lsValue);
  		} else {
  			$("#pre_ls_button").text("LS: Length/Steepness");
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
  		if(lsValue) {
  			$("#post_ls_button").text("LS: " + lsValue);
  		} else {
  			$("#post_ls_button").text("LS: Length/Steepness");
  		}
 	}
	
	// Common Construct Map key function //
	
	function constructLSMapKey(slope, slopeLength) {
		return slope.toString() + "-" + slopeLength.toString();
	}
	
	
		
	////////////// Setting R Value for Pre - Construction //////////////

	function onSelectPreRButtonClick() {
  		var prerValue = $('#pre_r_value').val();
  		var preLoc = $('#pre_r_location').val();
  		if(prerValue && preLoc){
  		var pre_r_str="R: " + prerValue ;
  		}
  		else{
  		var pre_r_str= "R: Erosivity"; 
  		}
  		$("#pre_r_button").text(pre_r_str);
  	}
  	
  	 ////////////// Setting R Value for Post - Construction //////////////

	function onSelectPostRButtonClick() {
  		var postrValue = $('#post_r_value').val();
  		var postLoc = $('#post_r_location').val();
  		if(postrValue && postLoc){
  		var post_r_str="R: " + postrValue ;
  		}
  		else{
  		var post_r_str= "R: Erosivity"; 
  		}
  		$("#post_r_button").text(post_r_str);
  	}
  	
  	////////////// Load C Values for Pre Construction //////////////
	
	var cValueMap = new Map(); // Global variable
	var refValueMap = new Map(); // Global variable
	var isLoading = false;	// Global variable
	
	$(document).on("click", "#pre_c_button", function () {
		if (!isLoading) {
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
  		if(cValue) {
  			$("#pre_c_button").text("C: " + cValue);
  		} else {
  			$("#pre_c_button").text("C: Cover Management");
  		}
 	}
 	
 	////////////// Load C Values for Post Construction //////////////
	
	$(document).on("click", "#post_c_button", function () {
		if (!isLoading) {
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
  		if(cValue) {
  			$("#post_c_button").text("C: " + cValue);
  		} else {
  			$("#post_c_button").text("C: Cover Management");
  		}
 	}