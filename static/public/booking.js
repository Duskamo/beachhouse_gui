/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Search
5. Init Date Picker
6. Init Custom Select
7. Init Milestones
8. Init Calendar
9. Init Book Call


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var ctrl = new ScrollMagic.Controller();

	setHeader();
	initMenu();
	initSearch();
	initDatePicker();
	initCustomSelect();
	initMilestones();
	initBookCall();

	$(window).on('resize', function()
	{
		setHeader();

		setTimeout(function()
		{
			$(window).trigger('resize.px.parallax');
		}, 375);
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		var logoOverlay = $('.logo_overlay');
		var menuOverlay = $('.menu_overlay');

		if($(window).scrollTop() > 290)
		{
			logoOverlay.addClass('scrolled');
			menuOverlay.addClass('scrolled');
		}
		else
		{
			logoOverlay.removeClass('scrolled');
			menuOverlay.removeClass('scrolled');
		}
	}

	/* 

	3. Init Menu

	*/

	function initMenu()
	{
		if($('.menu').length && $('.hamburger').length)
		{
			var menu = $('.menu');
			var hamburger = $('.hamburger');

			hamburger.on('click', function()
			{
				menu.toggleClass('active');
			});
		}
	}

	/* 

	4. Init Search

	*/

	function initSearch()
	{
		if($('.search_panel').length)
		{
			var panel = $('.search_panel');
			var btn = $('.search_button');
			var close = $('.search_close');

			btn.on('click', function()
			{
				panel.addClass('active');
			});

			close.on('click', function()
			{
				panel.removeClass('active');
			});
		}
	}

	/* 

	5. Init Date Picker

	*/

	function initDatePicker()
	{
		if($('.datepicker').length)
		{
			var datePickers = $('.datepicker');
			datePickers.each(function()
			{
				var dp = $(this);
				// Uncomment to use date as a placeholder
				// var date = new Date();
				// var dateM = date.getMonth() + 1;
				// var dateD = date.getDate();
				// var dateY = date.getFullYear();
				// var dateFinal = dateM + '/' + dateD + '/' + dateY;
				var placeholder = dp.data('placeholder');
				dp.val(placeholder);
				dp.datepicker();
			});
		}
	}

	/* 

	6. Init Date Picker

	*/

	function initCustomSelect()
	{
		var x, i, j, selElmnt, a, b, c;
		x = document.getElementsByClassName("custom-select");
		
		for (i = 0; i < x.length; i++)
		{
			selElmnt = x[i].getElementsByTagName("select")[0];
			a = document.createElement("DIV");
			a.setAttribute("class", "select-selected");
			a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
			x[i].appendChild(a);
			b = document.createElement("DIV");
			b.setAttribute("class", "select-items select-hide");
			for (j = 1; j < selElmnt.length; j++)
			{
				c = document.createElement("DIV");
				c.innerHTML = selElmnt.options[j].innerHTML;
				c.addEventListener("click", function(e)
				{
					var y, i, k, s, h;
					s = this.parentNode.parentNode.getElementsByTagName("select")[0];
					h = this.parentNode.previousSibling;
					for (i = 0; i < s.length; i++)
					{
						if (s.options[i].innerHTML == this.innerHTML)
						{
							s.selectedIndex = i;
							h.innerHTML = this.innerHTML;
							y = this.parentNode.getElementsByClassName("same-as-selected");
							for (k = 0; k < y.length; k++)
							{
								y[k].removeAttribute("class");
							}
							this.setAttribute("class", "same-as-selected");
							break;
						}
					}
					h.click();
				});
				b.appendChild(c);
			}
			x[i].appendChild(b);
			a.addEventListener("click", function(e)
			{
				e.stopPropagation();
				closeAllSelect(this);
				this.nextSibling.classList.toggle("select-hide");
				this.classList.toggle("select-arrow-active");
			});
		}

		function closeAllSelect(elmnt)
		{
			var x, y, i, arrNo = [];
			x = document.getElementsByClassName("select-items");
			y = document.getElementsByClassName("select-selected");
			for (i = 0; i < y.length; i++)
			{
				if (elmnt == y[i])
				{
					arrNo.push(i)
				}
				else
				{
					y[i].classList.remove("select-arrow-active");
				}
			}
			for (i = 0; i < x.length; i++)
			{
				if (arrNo.indexOf(i))
				{
					x[i].classList.add("select-hide");
				}
			}
		}

		document.addEventListener("click", closeAllSelect);	
	}

	/* 

	7. Init Milestones

	*/

	function initMilestones()
	{
		if($('.milestone_counter').length)
		{
			var milestoneItems = $('.milestone_counter');

	    	milestoneItems.each(function(i)
	    	{
	    		var ele = $(this);
	    		var endValue = ele.data('end-value');
	    		var eleValue = ele.text();

	    		/* Use data-sign-before and data-sign-after to add signs
	    		infront or behind the counter number */
	    		var signBefore = "";
	    		var signAfter = "";

	    		if(ele.attr('data-sign-before'))
	    		{
	    			signBefore = ele.attr('data-sign-before');
	    		}

	    		if(ele.attr('data-sign-after'))
	    		{
	    			signAfter = ele.attr('data-sign-after');
	    		}

	    		var milestoneScene = new ScrollMagic.Scene({
		    		triggerElement: this,
		    		triggerHook: 'onEnter',
		    		reverse:false
		    	})
		    	.on('start', function()
		    	{
		    		var counter = {value:eleValue};
		    		var counterTween = TweenMax.to(counter, 4,
		    		{
		    			value: endValue,
		    			roundProps:"value", 
						ease: Circ.easeOut, 
						onUpdate:function()
						{
							document.getElementsByClassName('milestone_counter')[i].innerHTML = signBefore + counter.value + signAfter;
						}
		    		});
		    	})
			    .addTo(ctrl);
	    	});
		}
	}

	/* 

	9. Init Book Call

	*/

	function initBookCall()
	{
		var bookingButton = $("#booking_submit");

		var dp1 = $("#dp1");
		var dp2 = $("#dp2");
		var s1 = $("#s1");
		var s2 = $("#s2");

		var modalButton = $("#modalButton");

		bookingButton.on("click", function() {
			var bookingData = {
				"startDate" : dp1.val(),
				"endDate" : dp2.val(),
				"adultCount" : s1.val(),
				"childrenCount" : s2.val()
			};
			
			$.ajax({
				url: '/book',
				type: 'post',
				datatype: 'json',
				contentType: 'application/json',
				data: JSON.stringify(bookingData),
				success: function(data) {
					console.log(data);
					if (data == "Success") {
						bindDatesToModalFromBooking();
						calculatePaymentFromBooking();
						modalButton.click();
					} else if (data == "Failure") {
						updateBookingGUIFailure();
					}
				},
				error: function(xhr) {
					console.log(xhr)
				}
			});
		});
	}

	function bindDatesToModalFromBooking() {
		$('#arrivalDate').attr("placeholder", "Arrive: " + $("#dp1").val());
		$('#departDate').attr("placeholder", "Depart: " + $("#dp2").val());
		$('#nightsCount').attr("placeholder", "Nights: " + days_between(new Date($("#dp2").val()),new Date($("#dp1").val())));
		$('#guestCount').attr("placeholder", "Guest: " + (parseInt($("#s2").val()) + parseInt($("#s1").val())));
	} 
	function bindDatesToModal(arrivalDate, departDate, nightsCount, guestCount) {
		$('#arrivalDate').attr("placeholder", "Arrive: " + arrivalDate);
		$('#departDate').attr("placeholder", "Depart: " + departDate);
		$('#nightsCount').attr("placeholder", "Nights: " + nightsCount);
		$('#guestCount').attr("placeholder", "Guest: " + guestCount);

	} 

	function days_between(date1, date2) {

	    // The number of milliseconds in one day
	    var ONE_DAY = 1000 * 60 * 60 * 24;

	    // Convert both dates to milliseconds
	    var date1_ms = date1.getTime();
	    var date2_ms = date2.getTime();

	    // Calculate the difference in milliseconds
	    var difference_ms = Math.abs(date1_ms - date2_ms);

	    // Convert back to days and return
	    return Math.round(difference_ms/ONE_DAY);
	}
	
	function calculatePaymentFromBooking() {
		var nightlyRate = 200.00;
		var nights = days_between(new Date($("#dp2").val()),new Date($("#dp1").val()));
		var cleaningRate = 25.00;
		var serviceRate = 30.00;
		var lodgingRate = 35.00;

		var paymentTitle = $('#paymentTitle');
		var calculatedPayment = $('#calculatedPayment');
		var cleaningFee = $('#cleaningFee');
		var serviceFee = $('#serviceFee');			
		var lodgingFee = $('#lodgingFee');
		var totalPayment = $('#totalPayment');

		paymentTitle.append(nightlyRate + " x " + nights + " nights");
		calculatedPayment.append("$" + nightlyRate * nights);
		cleaningFee.append("$" + cleaningRate * nights);
		serviceFee.append("$" + serviceRate * nights);
		lodgingFee.append("$" + lodgingRate * nights);
		totalPayment.append(((nightlyRate * nights) + (cleaningRate * nights) + (serviceRate * nights) + (lodgingRate * nights)));	
	}
	function calculatePayment(nightsCount) {
		var nightlyRate = 200.00;
		var nights = nightsCount;
		var cleaningRate = 25.00;
		var serviceRate = 30.00;
		var lodgingRate = 35.00;

		var paymentTitle = $('#paymentTitle');
		var calculatedPayment = $('#calculatedPayment');
		var cleaningFee = $('#cleaningFee');
		var serviceFee = $('#serviceFee');			
		var lodgingFee = $('#lodgingFee');
		var totalPayment = $('#totalPayment');

		paymentTitle.append(nightlyRate + " x " + nights + " nights");
		calculatedPayment.append("$" + nightlyRate * nights);
		cleaningFee.append("$" + cleaningRate * nights);
		serviceFee.append("$" + serviceRate * nights);
		lodgingFee.append("$" + lodgingRate * nights);
		totalPayment.append(((nightlyRate * nights) + (cleaningRate * nights) + (serviceRate * nights) + (lodgingRate * nights)));	
	}

	function updateBookingGUIFailure() {
		$('#bookDatesFailureMessage').css('display','block');	
	}

	function validationMessageHandler() {
		if (localStorage.getItem('bookDatesFailureMessage')) {
			$('#bookDatesFailureMessage').css('display','block');
			localStorage.clear();
		} else if (localStorage.getItem('bookingIndexSuccessMessage')) {
			bindDatesToModal(localStorage.getItem('arrivalDate'),localStorage.getItem('departDate'),localStorage.getItem('nightsCount'),localStorage.getItem('guestCount'));
			calculatePayment(localStorage.getItem('nightsCount'));
			modalButton.click();
			localStorage.clear();
		}
	}
	validationMessageHandler();
});


