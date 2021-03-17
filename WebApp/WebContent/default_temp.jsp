<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
	font-family: Arial, Helvetica, sans-serif;
}

* {
	box-sizing: border-box;
}

input[type=text], select, textarea {
	width: 100%;
	padding: 12px;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
	margin-top: 6px;
	margin-bottom: 16px;
	resize: vertical;
}

input[type=submit] {
	background-color: #4CAF50;
	color: white;
	padding: 12px 20px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

input[type=submit]:hover {
	background-color: #45a049;
}

.container {
	border-radius: 5px;
	background-color: #f2f2f2;
	padding: 20px;
}

div {
	margin: 0 auto;
	width: 500px;
	height: 450px
}
</style>

<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script>
	var lsValueMap = new Map();
	$(document).ready(function() {
		$.ajax({
			type: 'GET',
	        url: 'ls',
	        async : false,
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
	    		$("#slope").append("<option value='"+slope+"'>"+slope+"</option>");
	    	});
	    	slopeLengthSet.forEach(function(slope_length) {
	    		$("#slope_length").append("<option value='"+slope_length+"'>"+slope_length+"</option>");
	    	});
	    	
	    	// Update LS value for the current slope and length
	    	var slope = $("#slope").val();
	    	var slopeLength = $("#slope_length").val();
	    	setLSValue(slope, slopeLength);
	    }).error(function(response) {
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
			ls = "";
		}
		$("#ls_value").text(ls);
	}
	
	function constructLSMapKey(slope, slopeLength) {
		return slope.toString() + "-" + slopeLength.toString();
	}

</script>
</head>

<body>

	<div class="container">
		<form action="/action_page.php">

			<h3 style="text-align: center;">Select LS factor to calulate
				soil loss (A)
			</h3>
			
			</br> </br>
			
			<label for="slope"> Select Average Watershed Slope (%)</label>
			</tb>
			<select id="slope" name="slope" style="width: 50px;">
			</select>
			
			</br> </br>
			
			<label for="slope_length">Select Sheet Flow Length (ft)</label>
			</tb>
			<select id="slope_length" name="slope_length" style="width: 50px;">
			</select>
			
			</br> </br>
			
			<label for="ls_value">LS factor value</label>
			<label id="ls_value" name="ls_value"></label>
			</br> </br>
			<input type="submit" value="SUBMIT" style="font: bold;" class="center">
		</form>
	</div>

</body>
</html>