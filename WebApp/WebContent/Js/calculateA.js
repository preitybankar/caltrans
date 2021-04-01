/**
 * 
 */
var lsValueMap = new Map();
	$(document).ready(function() {
		$.ajax({
			type: 'GET',
	        url: 'ls',
	        async : false,
	    }).done(function(lsList) {
	    	//alert("Hi");
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
	    		$("#slope").append("<option value='"+slope+"'>"+slope+"</option>");
	    	});
	    	slopeLengthSet.forEach(function(slope_length) {
	    		$("#slope_length").append("<option value='"+slope_length+"'>"+slope_length+"</option>");
	    	});
	    	
	    	// Update LS value for the current slope and length
	    	var slope = $("#slope").val();
	    	var slopeLength = $("#slope_length").val();
	    	setLSValue(slope, slopeLength);
	    }).fail(function(response) {
	    	alert(response.responseText);
	    });
	});
	
	$(document).on('change', '#slope', function() {
		var slopeLength = $("#slope_length").val();
		setLSValue(this.value, slopeLength);
	});
	
	$(document).on('change', '#slope_length', function() {
		var slope = $("#slope").val();
		setLSValue(slope, this.value);
	});
	
	function setLSValue(slope, slopeLength) {
		var key = constructLSMapKey(slope, slopeLength);
		var ls = lsValueMap[key];
		if(ls == null) {
			$("#ls_value").text("");
			$('#select_ls_button').attr("disabled", true);
		} else {
			$("#ls_value").text(ls);
			$('#select_ls_button').attr("disabled", false);
		}
	}
	
	function constructLSMapKey(slope, slopeLength) {
		return slope.toString() + "-" + slopeLength.toString();
	}
	
	function onSelectLSButtonClick() {
  		var lsValue = $("#ls_value").text();
  		if(lsValue) {
  			$("#ls_button").text("LS: " + lsValue);
  		} else {
  			$("#ls_button").text("LS: Length/Steepness");
  		}
 	}

// javascript for POP-UP MODEL
function onLSButtonClick() {
        document.getElementById("modalOne").style.display = "block";
      }
      function lsSubmit(e) {
    	  e.preventDefault();
    	  document.getElementById("modalOne").style.display = "none";
    	  return false;
      }
      let closeBtns = [...document.querySelectorAll(".close")];
      closeBtns.forEach(function(btn) {
        btn.onclick = function() {
          let modal = btn.closest('.modal');
          modal.style.display = "none";
        }
      });
      window.onclick = function(event) {
        if(event.target.className === "modal") {
          event.target.style.display = "none";
        }
      }