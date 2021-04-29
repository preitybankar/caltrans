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
	
	
		
	/////////////R VALUE for Pre Construction Custom///////	
			
	var rCustom =false;
	var rdatabase =false;
			
	$(document).ready(function() {
	  $("#btn-rcustom").click(function() {
	    $("#form-rcustom").show();
	    $("#form-rdatabase").hide();
	    rCustom =true;
	    rdatabase =false; 
	  });
	});

	///////////// Load R Values for Pre Construction Database //////////////

	var rValueMap = new Map(); // Global variable
	var durValueMap = new Map(); // Global variable
	var isLoading = false;	// Global variable
	var locationKey; 	
	$(document).ready(function() {
	  $("#btn-database").click(function() {
	    $("#form-rdatabase").show();
	    $("#form-rcustom").hide();
	    rCustom =false;
	    rdatabase =true;
	   
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
			    	durValueMap.clear();
			    	for (var i = 0; i < rList.length ; i++ ) {
			    		var r = rList[i];
			    		locationSet.add(r.location);	    		
		
			    		var key = r.location;
			    		rValueMap[key] = r.r_value;
			    		durValueMap[key] = r.duration;
			    	}
			    	locationSet.forEach(function(location) {
			    		$("#pre_r_location_select").append("<option value='"+location+"'>"+location+"</option>");
			    	});	
			    	// Update Pre R
			    	var location = $("#pre_r_location_select").val();
			    	locationKey=location;
			    	setPreRValue(location);
			    	isLoading = false;	
			    }).fail(function(response) {
			    	alert(response.responseText);
			    });      
		   	}  	
		  });
		});

	////////////// Update/Set Database R for Pre-Construction //////////////

	$(document).on('change', '#pre_r_location_select', function() {
			setPreRValue(this.value);
		});
			
		function setPreRValue(location) {
			var key = location;
			locationKey=location;
			var r = rValueMap[key];
			var dur = durValueMap[key];
			
			$("#pre_r_value_select").text((r == null) ? "" : r);
			$("#pre_r_duration_select").text((dur == null) ? "" : dur);	
		}		

		function onSelectPreRButtonClick() {
  			var prerValue_text = $('#pre_r_value_text').val();
  			var preLoc_text = $('#pre_r_location_text').val();
  			var prerdur_text = $('#pre_r_duration_text').val();
  			var prerValue_select = $('#pre_r_value_select').text();
  			var preLoc_select = $('#pre_r_location_select').text();
  			var prerdur_select = $('#pre_r_duration_select').text();
  		
			if(rCustom && !rdatabase){
  				var pre_r_str="R: " + preLoc_text + "| " + prerValue_text + "| " +prerdur_text + " months";
  			}
  			else if (rdatabase && !rCustom){
  				var pre_r_str= "R: " + locationKey + "| " + prerValue_select + "| " +prerdur_select+ " months"; 
  			}
  			else {
  				var pre_r_str= "R: Erosivity" ;
  			}
  		
  			$("#pre_r_button").text(pre_r_str);
  		}
  		
  	
 	/////////////R VALUE for Post Construction Custom///////	
			
	var rCustom =false;
	var rdatabase =false;
			
	$(document).ready(function() {
	  $("#btn-rcustompost").click(function() {
	    $("#form-rcustompost").show();
	    $("#form-rdatabasepost").hide();
	    rCustom =true;
	    rdatabase =false; 
	  });
	});

	///////////// Load R Values for Post Construction Database //////////////

	var rValueMap = new Map(); // Global variable
	var durValueMap = new Map(); // Global variable
	var isLoading = false;	// Global variable
	var locationKey; 	
	$(document).ready(function() {
	  $("#btn-databasepost").click(function() {
	    $("#form-rdatabasepost").show();
	    $("#form-rcustompost").hide();
	    rCustom =false;
	    rdatabase =true;
	   
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
			    	durValueMap.clear();
			    	for (var i = 0; i < rList.length ; i++ ) {
			    		var r = rList[i];
			    		locationSet.add(r.location);	    		
		
			    		var key = r.location;
			    		rValueMap[key] = r.r_value;
			    		durValueMap[key] = r.duration;
			    	}
			    	locationSet.forEach(function(location) {
			    		$("#post_r_location_select").append("<option value='"+location+"'>"+location+"</option>");
			    	});	
			    	// Update Pre R
			    	var location = $("#post_r_location_select").val();
			    	locationKey=location;
			    	setPreRValue(location);
			    	isLoading = false;	
			    }).fail(function(response) {
			    	alert(response.responseText);
			    });      
		   	}  	
		  });
		});

	////////////// Update/Set Database R for Post-Construction //////////////

	$(document).on('change', '#post_r_location_select', function() {
			setPostRValue(this.value);
		});
			
		function setPostRValue(location) {
			var key = location;
			locationKey=location;
			var r = rValueMap[key];
			var dur = durValueMap[key];
			
			$("#post_r_value_select").text((r == null) ? "" : r);
			$("#post_r_duration_select").text((dur == null) ? "" : dur);	
		}		

		function onSelectPostRButtonClick() {
  			var postrValue_text = $('#post_r_value_text').val();
  			var postLoc_text = $('#post_r_location_text').val();
  			var postrdur_text = $('#post_r_duration_text').val();
  			var postrValue_select = $('#post_r_value_select').text();
  			var postLoc_select = $('#post_r_location_select').text();
  			var postrdur_select = $('#post_r_duration_select').text();
  		
			if(rCustom && !rdatabase){
  				var post_r_str="R: " + postLoc_text + "| " + postrValue_text + "| " +postrdur_text + " months";
  			}
  			else if (rdatabase && !rCustom){
  				var post_r_str= "R: " + locationKey + "| " + postrValue_select + "| " +postrdur_select+ " months"; 
  			}
  			else {
  				var post_r_str= "R: Erosivity" ;
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
	
	
			////////////// Load P Values for Pre Construction //////////////
	
	var pValueMap = new Map(); // Global variable
	var refValueMap = new Map(); // Global variable
	var isLoading = false;	// Global variable
	
	$(document).on("click", "#pre_p_button", function () {
		if (!isLoading) {
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
  		if(pValue) {
  			$("#pre_p_button").text("P: " + pValue);
  		} else {
  			$("#pre_p_button").text("P: Erosion Control Practice");
  		}
 	}
 	
 	////////////// Load P Values for Post Construction //////////////
	
	$(document).on("click", "#post_p_button", function () {
		if (!isLoading) {
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
  		if(pValue) {
  			$("#post_p_button").text("P: " + pValue);
  		} else {
  			$("#post_p_button").text("P: Erosion Control Practice");
  		}
 	}
 	
 	/////////////////////////////////////////////////////////////////////////////
	
	$( "#pre_cons_calculate_btn" ).click(function() {
	  	var pre_r_value = parseFloat($("#pre_r_button").text().split(" ")[1]);
	  	var pre_k_value = parseFloat($("#pre_k_value").val());
	  	var pre_ls_value = parseFloat($("#pre_ls_button").text().split(" ")[1]);
	  	var pre_c_value = parseFloat($("#pre_c_button").text().split(" ")[1]);
	  	var pre_p_value = parseFloat($("#pre_p_button").text().split(" ")[1]);
		
		var pre_const_soil_loss = (pre_r_value * pre_k_value * pre_ls_value * pre_c_value * pre_p_value);
	  	
	  	$("#pre_cons_result").val(pre_const_soil_loss);
	});
	
	/////////////////////////////////////////////////////////////////////////////
	
	$( "#post_cons_calculate_btn" ).click(function() {
	  	var post_r_value = parseFloat($("#post_r_button").text().split(" ")[1]);
	  	var post_k_value = parseFloat($("#post_k_value").val());
	  	var post_ls_value = parseFloat($("#post_ls_button").text().split(" ")[1]);
	  	var post_c_value = parseFloat($("#post_c_button").text().split(" ")[1]);
	  	var post_p_value = parseFloat($("#post_p_button").text().split(" ")[1]);
		
		var post_const_soil_loss = (post_r_value * post_k_value * post_ls_value * post_c_value * post_p_value);
	  	
	  	$("#post_cons_result").val(post_const_soil_loss);
	});

