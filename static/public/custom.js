/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Search
5. Init Date Picker
6. Init Custom Select
7. Init Gallery
8. Init Rooms Slider
9. Init Discover Slider
10. Init Testimonials Slider
11. Init Book Through Index Call


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	setHeader();
	initMenu();
	initSearch();
	initDatePicker();
	initCustomSelect();
	initGallery();
	initRoomsSlider();
	initDiscoverSlider();
	initTestSlider();
	initBookThroughIndexCall();

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

	6. Init Custom Select

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

	7. Init Gallery

	*/

	function initGallery()
	{
		if($('.gallery_slider').length)
		{
			var gallerySlider = $('.gallery_slider');
			gallerySlider.owlCarousel(
			{
				items:4,
				loop:true,
				autoplay:true,
				nav:false,
				dots:false,
				smartSpeed:1200,
				margin:30,
				responsive:
				{
					0:
					{
						items:1
					},
					481:
					{
						items:2,
						margin:20
					},
					768:
					{
						items:3,
						margin:30
					},
					992:
					{
						items:4
					}
				}
			});
		}
	}

	/* 

	8. Init Rooms Slider

	*/

	function initRoomsSlider()
	{
		if($('.rooms_slider').length)
		{
			var roomsSlider = $('.rooms_slider');
			roomsSlider.owlCarousel(
			{
				items:1,
				loop:true,
				autoplay:true,
				nav:false,
				smartSpeed:1200
			});
		}
	}

	/* 

	9. Init Discover Slider

	*/

	function initDiscoverSlider()
	{
		if($('.discover_slider').length)
		{
			var discoverSlider = $('.discover_slider');
			discoverSlider.owlCarousel(
			{
				items:3,
				loop:true,
				autoplay:true,
				dots:false,
				nav:false,
				smartSpeed:1200,
				responsive:
				{
					0:
					{
						items:1
					},
					768:
					{
						items:2
					},
					1200:
					{
						items:3
					}
				}
			});
		}
	}

	/* 

	10. Init Testimonials Slider

	*/

	function initTestSlider()
	{
		if($('.testimonials_slider').length)
		{
			var testSlider = $('.testimonials_slider');
			testSlider.owlCarousel(
			{
				items:1,
				loop:true,
				autoplay:true,
				nav:false,
				smartSpeed:1200
			});
		}
	}

	/* 

	11. Init Book Through Index Call

	*/

	function initBookThroughIndexCall()
	{
		var bookingButton = $("#booking_submit");

		var dp1 = $("#dp1");
		var dp2 = $("#dp2");
		var s1 = $("#s1");
		var s2 = $("#s2");

		bookingButton.on("click", function() {
			var bookingData = {
				"startDate" : dp1.val(),
				"endDate" : dp2.val(),
				"adultCount" : s1.val(),
				"childrenCount" : s2.val()
			};
			
			$.ajax({
				url: '/book_through_index',
				type: 'post',
				datatype: 'json',
				contentType: 'application/json',
				data: JSON.stringify(bookingData),
				success: function(data) {
					if (data == "Success") {
						updateGUISuccess();
					} else if (data == "Failure") {
						updateGUIFailure();
					}
				},
				error: function(xhr) {
					console.log(xhr)
				}
			});
		});
	}

	function updateGUISuccess() {
		// Show successful validation message to client
		localStorage.setItem("bookingIndexSuccessMessage",true);

		// Save booking info to local storage system
		localStorage.setItem("arrivalDate",$("#dp1").val());
		localStorage.setItem("departDate",$("#dp2").val());
		localStorage.setItem("nightsCount",days_between(new Date($("#dp2").val()),new Date($("#dp1").val())));
		localStorage.setItem("guestCount",(parseInt($("#s2").val()) + parseInt($("#s1").val())));

		// Go to booking page and display modal with correct values
		window.location.href = "/booking";		
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
	
	function updateGUIFailure() {
		// Show failure validation message to client
		localStorage.setItem("bookingFailureMessage",true);

		// Refresh page from server to update calendar with new dates
		location.reload(true);		
	}

	function validationMessageHandler() {
		if (localStorage.getItem('bookingFailureMessage')) {
			$('#bookingFailureMessage').css('display','block');
			localStorage.clear();
		}
	}
	validationMessageHandler();
});
