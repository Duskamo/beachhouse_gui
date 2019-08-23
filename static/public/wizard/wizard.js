$(document).ready(function(){

	// ****************************************** Stripe Functions BEGIN *************************************************

	// Create a Stripe client.
	var stripe = Stripe('pk_test_7mAWzNf0nNgcE0rZN7N9e09d00gS50v4CO');

	// Create an instance of Elements.
	var elements = stripe.elements();

	// Custom styling can be passed to options when creating an Element.
	// (Note that this demo uses a wider set of styles than the guide below.)

	var style = {
	  base: {
	    color: '#32325d',
	    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
	    fontSmoothing: 'antialiased',
	    fontSize: '16px',
	    '::placeholder': {
	      color: '#aab7c4'
	    }
	  },
	  invalid: {
	    color: '#fa755a',
	    iconColor: '#fa755a'
	  }
	};

	// Create an instance of the card Element.
	var card = elements.create('card', {style: style});

	// Add an instance of the card Element into the `card-element` <div>.
	card.mount('#card-element');

	// Handle real-time validation errors from the card Element.
	card.addEventListener('change', function(event) {
	  var displayError = document.getElementById('card-errors');
	  if (event.error) {
	    displayError.textContent = event.error.message;
	  } else {
	    displayError.textContent = '';
	  }
	});

	// Submit the form with the token ID.
	function stripeTokenHandler(token) {
	  // Insert the token ID into the form so it gets submitted to the server
	  var form = document.getElementById('payment-form');
	  var hiddenInput = document.createElement('input');
	  hiddenInput.setAttribute('type', 'hidden');
	  hiddenInput.setAttribute('name', 'stripeToken');
	  hiddenInput.setAttribute('value', token.id);
	  form.appendChild(hiddenInput);

	  // Submit the form
	  form.submit();
	}

    // ****************************************** Wizard Functions BEGIN *************************************************
    // Step show event
    $("#smartwizard").on("showStep", function(e, anchorObject, stepNumber, stepDirection, stepPosition) {
       //alert("You are on step "+stepNumber+" now");
       if(stepPosition === 'first'){
           $("#prev-btn").addClass('disabled');
       }else if(stepPosition === 'final'){
           $("#next-btn").addClass('disabled');
       }else{
           $("#prev-btn").removeClass('disabled');
           $("#next-btn").removeClass('disabled');
       }
    });

    // Step leave event
    $("#smartwizard").on("leaveStep", function(e, anchorObject, stepNumber, stepDirection) {
       
	// Step 2 Validation
	//return generalInfoValidation(stepNumber);
	var firstName = $("#firstName");
	var lastName = $("#lastName");
	var email = $("#email");
	var phone = $("#phone");

	var errorValidation = [];
	var errorMessage = "Please enter ";

	if (stepNumber == 1) {
		if (firstName.val() == "") {
			errorValidation.push("First Name");
		}

		if (lastName.val() == "") {
			errorValidation.push("Last Name");
		}

		if (email.val() == "") {
			errorValidation.push("Email");
		}

		if (phone.val() == "") {
			errorValidation.push("Phone");
		}

		for (var i = 0; i < errorValidation.length; i++) {
			errorMessage += errorValidation[i] + ", ";
		}

		if (errorValidation.length > 0) {
			alert(errorMessage);
			return false;
		}
	}

	// Step 3 Validation
	//return privacyPolicyValidation(stepNumber);
	var cb = $("#cb");

	var errorValidation = [];
	var errorMessage = "Please select ";

	if (stepNumber == 2) {
		if (cb.is(":not(:checked)")) {
			errorValidation.push("the privacy policy and rules check box.");
		}

		for (var i = 0; i < errorValidation.length; i++) {
			errorMessage += errorValidation[i] + ", ";
		}

		if (errorValidation.length > 0) {
			alert(errorMessage);
			return false;
		}
	}
	
    });

    // Toolbar extra buttons
    var btnFinish = $('<button></button>').text('Finish')
                                     .addClass('btn btn-info')
                                     .on('click', function(){ 
					// Validate last fields have data
					isValidated = finalStepValidation();

					// Stripe Validation and post request with modal data
					stripe.createToken(card).then(function(result) {
					    if (result.error) {
					      // Inform the user if there was an error.
					      var errorElement = document.getElementById('card-errors');
					      errorElement.textContent = result.error.message;
					    } else {
					      sendDataToBackend(result.token);
					      //alert(result.token.id);
					    }
					  });

					// Close Modal
					if (isValidated) {
						$("#modalButton").click();
					}
					
					});

    // Smart Wizard 1
    $('#smartwizard').smartWizard({
            selected: 0,
            theme: 'arrows',
            transitionEffect:'fade',
            showStepURLhash: false,
            toolbarSettings: {toolbarPosition: 'bottom',
                              toolbarExtraButtons: [btnFinish]
                            }
    });

	// Private methods
	function generalInfoValidation(stepNumber) {
		var firstName = $("#firstName");
		var lastName = $("#lastName");
		var email = $("#email");
		var phone = $("#phone");

		var errorValidation = [];
		var errorMessage = "Please enter ";

		if (stepNumber == 1) {
			if (firstName.val() == "") {
				errorValidation.push("First Name");
			}

			if (lastName.val() == "") {
				errorValidation.push("Last Name");
			}

			if (email.val() == "") {
				errorValidation.push("Email");
			}

			if (phone.val() == "") {
				errorValidation.push("Phone");
			}

			for (var i = 0; i < errorValidation.length; i++) {
				errorMessage += errorValidation[i] + ", ";
			}

			if (errorValidation.length > 0) {
				alert(errorMessage);
				return false;
			}
		}
	}

	function privacyPolicyValidation(stepNumber) {
		var cb = $("#cb");

		var errorValidation = [];
		var errorMessage = "Please select ";

		if (stepNumber == 2) {
			if (cb.is(":not(:checked)")) {
				errorValidation.push("the privacy policy and rules check box.");
			}

			for (var i = 0; i < errorValidation.length; i++) {
				errorMessage += errorValidation[i] + ", ";
			}

			if (errorValidation.length > 0) {
				alert(errorMessage);
				return false;
			}
		}
	}

	function finalStepValidation() {
		var cardNumber = $("#cardNumber");
		var expDate = $("#expDate");
		var securityCode = $("#securityCode");
		var firstNameOnCard = $("#firstNameOnCard");
		var lastNameOnCard = $("#lastNameOnCard");
		var street = $("#street");
		var country = $("#country");
		var city = $("#city");
		var state = $("#state");
		var zip = $("#zip");

		var errorValidation = [];
		var errorMessage = "Please enter ";

		if (cardNumber.val() == "") {
			errorValidation.push("Card Number");
		}

		if (expDate.val() == "") {
			errorValidation.push("Expiration Date");
		}

		if (securityCode.val() == "") {
			errorValidation.push("Security Code");
		}

		if (firstNameOnCard.val() == "") {
			errorValidation.push("First Name");
		}

		if (lastNameOnCard.val() == "") {
			errorValidation.push("Last Name");
		}

		if (street.val() == "") {
			errorValidation.push("Street");
		}

		if (country.val() == "") {
			errorValidation.push("Country");
		}

		if (city.val() == "") {
			errorValidation.push("City");
		}

		if (state.val() == "") {
			errorValidation.push("State");
		}

		if (zip.val() == "") {
			errorValidation.push("Zip");
		}

		for (var i = 0; i < errorValidation.length; i++) {
			errorMessage += errorValidation[i] + ", ";
		}

		if (errorValidation.length > 0) {
			alert(errorMessage);
			return false;
		} else {
			return true;
		}
	}

	function sendDataToBackend(token) {
		// Send Data to backend for proccessing	
		var bookingInfo = {
			"contactInfo": {
				"firstName":$("#firstName").val(),
				"lastName":$("#lastName").val(),
				"email":$("#email").val(),
				"phone":$("#phone").val()
			},
			"termsCB":$("#cb").val(),
			"paymentInfo": {
				"tokenId":token.id,
				"firstNameOnCard":$("#firstNameOnCard").val(),
				"lastNameOnCard":$("#lastNameOnCard").val(),
				"paymentAmount":"60000",
				"receiptEmail":$("#email").val()
			},
			"billingInfo": {
				"street":$("#street").val(),
				"country":$("#country").val(),
				"city":$("#city").val(),
				"state":$("#state").val(),
				"zip":$("#zip").val()
			}				
		};

		$.ajax({
			url: '/book_payment',
			type: 'post',
			datatype: 'json',
			contentType: 'application/json',
			data: JSON.stringify(bookingInfo),
			success: function(data) {
				console.log(data);
			},
			error: function(xhr) {
				console.log(xhr)
			}
		});
	}

});
