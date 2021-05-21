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
	if (window.location.search.split('?').length > 1) {
		let paramsArray = window.location.search.split('?')[1].split('&');
		let id = paramsArray[0].split('=')[1];
		let statusResp = paramsArray[1].split('=')[1];
		let email = paramsArray[2].split('=')[1];

			if (statusResp) {
			$('#message').html("<span> Logged in successfully." + "</span>")
					.addClass("alert alert-success")
					.hide()
					.fadeIn(1500);
				setTimeout(function() {
					$('#message').fadeOut("Slow");
				}, 10000);
			}
				
		
			$.ajax({
				type: 'GET',
				url: 'login',
				data: { email: email },
				async: true,
			}).done(function(resp) {
			
			//alert(JSON.stringify(resp));
			
			$('#login_details').html('<span id="userEmail">' + resp.name + '</span> &nbsp;&nbsp;<a href="login.html" type="button" class="btn btn-warning">Sign Out</a>');
			
			document.cookie = resp.email +";path=/";
			//alert(document.cookie);
		});
	}
	
};