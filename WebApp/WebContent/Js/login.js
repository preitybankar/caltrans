// TODO
// On Login buton click, send username and password to login API
// login GET -> POST
// login: select * from users where username = ? AND password = ?
// Response: true for authenticated user else false
// If true then load index.html
// {
//	"success" : true,
//	"id" : 1,
//	"name" : "",
//  "email" : "",
//  "user_role" : ""
/// }

// Sign Up
// On sign up button click, send username and password to signup API
// signup POST
// insert into
// Response


 

/////////Login//////////
$(document).on("click", "#login_button", function() {
// alert("@@@ Call login");
	var email = $('#email').val();
  	var password = $('#password').val();
  	$.ajax({
			type: "POST",
			url: "login",
			data : {  
					email: email,
	  				password: password 
		           }, 
	        async : true,
	}).done(function(response) {
	//alert(JSON.stringify(response));
		if (response.success==true) {
			window.location = 'index.html?id=' + response.id + '&status=' + response.success + '&user=' + response.email;
			document.cookie = respsonse.email +";path=/";
			alert(document.cookie);
		}
		else{
		$('#message').html("<div class=alert-dismissible fade show role=alert>" + 
			  "<strong>Error</strong> Login details are wrong. Please try again.</div>")	
			.addClass("alert alert-danger")
			.hide()
			.fadeIn(1500);
			
			setTimeout(function() {
				$('#message').fadeOut("Slow");
			}, 20000);
		}
		
	}).fail(function(response) {	
	//alert("@@ Failed");
		if(response.responseJSON.fail) {
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
  	
 	
  	

////////////// Registration //////////////
	 	  	
	 	  	
$(document).on("click", "#signup_button", function() {
		var reg_name = $('#name').val();
  		var reg_email = $('#email').val();
  		var reg_pass = $('#password').val();
  		//alert(reg_name);
  		if(!reg_name||!reg_email||!reg_pass)
  		{
  		$('#message').html("<div class=alert-dismissible fade show role=alert>" + 
			  "<strong>Error</strong> Please enter all the details.</div>")	
			.addClass("alert alert-danger")
			.hide()
			.fadeIn(1500);
			
			setTimeout(function() {
				$('#message').fadeOut("Slow");
			}, 20000);
  		}
  		
  		else{
		$.ajax({
			type: "POST",
			url: "registration",
			data : { 
                name :reg_name,
  				email: reg_email,
  		 		password: reg_pass 
            }, 
			async: true,
			}).done(function(response) {
	//alert(JSON.stringify(response));
	if (response.success==true) {
			window.location = 'index.html?id=' + response.id + '&status=' + response.success + '&user=' + response.email;
			document.cookie = respsonse.email +";path=/";
		//	alert(document.cookie);
		}
		else{
		$('#message').html("<div class=alert-dismissible fade show role=alert>" + 
			  "<strong>Error</strong> This email already exists. Please try again.</div>")	
			.addClass("alert alert-danger")
			.hide()
			.fadeIn(1500);
			
			setTimeout(function() {
				$('#message').fadeOut("Slow");
			}, 20000);
		}
			//window.location = 'index.html?id=' + response.id + '&status=' + response.success + '&user=' + response.email;
			
		
	}).fail(function(response) {	
	//alert("@@ Failed");
		if(response.responseJSON.fail) {
			$('#message').html("<span><strong>Please try again! </strong>" + response.responseJSON.message + "</span>")		
			.addClass("alert alert-danger")
			.hide()
			.fadeIn(1500);
			
			setTimeout(function() {
				$('#message').fadeOut("Slow");
			}, 20000);
			
		
		}
	});	}
});
	
	

 	