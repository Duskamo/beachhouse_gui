$j(document).ready(function()
{
	initCalendar();

	function initCalendar() 
	{
		// Fetch Booked Dates
		$j.ajax({
			url: "/get_calendar_info",
			dataType: "json",
			success: function(data,status,xhr) {
				initCalendarWithData(data);
			}, 
			error: function(xhr,textStatus,errorMessage) {
				console.log(errorMessage);
			}
		});
	}
	
	function initCalendarWithData(data) {
		// Parse data and create calendarEvents list
		var bookedDates = JSON.parse(data['bookingDates']);
		var bookingRates = JSON.parse(data['bookingRates']);

		var years = parseDate('y',bookedDates);
		var months = parseDate('m',bookedDates);
		var days = parseDate('d',bookedDates);

		var calendarEvents = [];

		console.log(bookingRates);

		for (var i = 0; i < bookingRates.length; i++) {
			calendarEvents.push({
				id: 999,
				title: '$' + bookingRates[i].rate,
				start: new Date(bookingRates[i].date),
				end: new Date(bookingRates[i].date)
			});
		}

		for (var i = 0; i < bookedDates.length; i++) {
			calendarEvents.push({
				id: 999,
				title: 'Booked',
				start: new Date(years[i].start, months[i].start, days[i].start),
				end: new Date(years[i].end, months[i].end, days[i].end),
				className: 'success'
			});
		}
		
		/*  className colors

		className: default(transparent), important(red), chill(pink), success(green), info(blue)

		*/


		/* initialize the external events
		-----------------------------------------------------------------*/

		$j('#external-events div.external-event').each(function() {

			// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
			// it doesn't need to have a start or end
			var eventObject = {
				title: $j.trim($j(this).text()) // use the element's text as the event title
			};

			// store the Event Object in the DOM element so we can get to it later
			$j(this).data('eventObject', eventObject);

			// make the event draggable using jQuery UI
			$j(this).draggable({
				zIndex: 999,
				revert: true,      // will cause the event to go back to its
				revertDuration: 0  //  original position after the drag
			});

		});


		/* initialize the calendar
		-----------------------------------------------------------------*/

		var calendar =  $j('#calendar').fullCalendar({
			header: {
				left: 'title',
				center: '',
				right: 'prev,next today'
			},
			editable: false,
			firstDay: 1, //  1(Monday) this can be changed to 0(Sunday) for the USA system
			selectable: false,
			defaultView: 'month',

			axisFormat: 'h:mm',
			columnFormat: {
		        month: 'ddd',    // Mon
		        week: 'ddd d', // Mon 7
		        day: 'dddd M/d',  // Monday 9/7
		        agendaDay: 'dddd d'
		    },
		    titleFormat: {
		        month: 'MMMM yyyy', // September 2009
		        week: "MMMM yyyy", // September 2009
		        day: 'MMMM yyyy'                // Tuesday, Sep 8, 2009 
		    },
			allDaySlot: true,
			selectHelper: true,
			select: function(start, end, allDay) {
				var title = prompt('Event Title:');
				if (title) {
					calendar.fullCalendar('renderEvent',
						{
							title: title,
							start: start,
							end: end,
							allDay: allDay
						},
						true // make the event "stick"
					);
				}
				calendar.fullCalendar('unselect');
			},
			droppable: true, // this allows things to be dropped onto the calendar !!!
			drop: function(date, allDay) { // this function is called when something is dropped

				// retrieve the dropped element's stored Event Object
				var originalEventObject = $j(this).data('eventObject');

				// we need to copy it, so that multiple events don't have a reference to the same object
				var copiedEventObject = $j.extend({}, originalEventObject);

				// assign it the date that was reported
				copiedEventObject.start = date;
				copiedEventObject.allDay = allDay;

				// render the event on the calendar
				// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
				$j('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

				// is the "remove after drop" checkbox checked?
				if ($j('#drop-remove').is(':checked')) {
					// if so, remove the element from the "Draggable Events" list
					$j(this).remove();
				}

			},

			events: calendarEvents
		});
	}

	function parseDate(type, data) {
		var startDates = [];
		var endDates = [];

		for (var i = 0; i < data.length; i++) {
			startDates.push(new Date(data[i].startDate));
			endDates.push(new Date(data[i].endDate));
		}

		var years = [];
		var months = [];
		var days = [];
		
		for (var i = 0; i < data.length; i++) {
			years.push( {"start":startDates[i].getFullYear(), "end":endDates[i].getFullYear()} );
			months.push( {"start":startDates[i].getMonth(), "end":endDates[i].getMonth()} );
			days.push( {"start":startDates[i].getDate(), "end":endDates[i].getDate()} );
 		}

		if (type == 'y') {
			return years;
																																								
		} else if (type == 'm') {
			return months;
		} else {
			return days;
		}		
	}
});
