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