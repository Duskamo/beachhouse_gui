from flask import Flask, request, render_template
import datetime
import requests
import threading
import os
import json
app = Flask(__name__)

# Page Requests
@app.route('/')
def index():
	return render_template('index.html')

@app.route('/about')
def about():
	return render_template('about.html')

@app.route('/blog')
def blog():
	return render_template('blog.html')

@app.route('/contact')
def contact():
	return render_template('contact.html')

@app.route('/booking')
def booking():
	return render_template('booking.html')

@app.route('/rooms')
def rooms():
	return render_template('rooms.html')

@app.route('/elements')
def elements():
	return render_template('elements.html')

@app.route('/calendar')
def calendar():
	return render_template('fullcalendar.html')


# Data Requests
@app.route('/request_calendar_info', methods=['GET']) # Dispatched on CRON Service
def request_calendar_info():
	# Fetch and return booked dates from booking microservice
	bookingDatesServiceUrl = "http://localhost:5002/request_calendar_dates"
	bookingDates = requests.get(bookingDatesServiceUrl)

	return bookingDates.text

@app.route('/get_calendar_info', methods=['GET'])
def get_calendar_info():
	# Fetch and return booked dates from booking microservice
	bookingDatesServiceUrl = "http://localhost:5002/get_reserved_dates"
	bookingDates = requests.get(bookingDatesServiceUrl)

	# Fetch and return rates for non-booked dates from booking microservice
	bookingRatesServiceUrl = "http://localhost:5002/get_rates_by_date"
	bookingRates = requests.get(bookingRatesServiceUrl)

	calendarDates = {
		'bookingDates':bookingDates.text,
		'bookingRates':bookingRates.text
	}

	return calendarDates

@app.route('/get_nightly_rates_by_booked_date', methods=['POST'])
def get_nightly_rates_by_booked_date():
	# Gather booking request data
	bookingInfo = request.json

	print("yo: ")
	print(bookingInfo)

	# Fetch and return rates booked dates
	bookingRatesServiceUrl = "http://localhost:5002/get_nightly_rates_by_booked_date"
	bookingRates = requests.get(bookingRatesServiceUrl,json=bookingInfo)

	print(bookingRates.text)

	# Return booked rates to wizard for processing
	return bookingRates.text

@app.route('/send_contact', methods=['POST'])
def send_contact():
	# Gather Data
	contactInfo = request.json

	# Process Data
	contactServiceUrl = "http://localhost:5001/contact"
	requests.post(contactServiceUrl,json=contactInfo)

	# Return status code
	return "200"

@app.route('/book', methods=['POST'])
def book():
	# Gather booking request data
	bookingInfo = request.json

	# Process Data
	bookingServiceUrl = "http://localhost:5002/booking_availability"
	resp = requests.post(bookingServiceUrl,json=bookingInfo)

	# Return user to booking page with dates pre-booked if available, if not then return error message to user
	if (resp.text == "available"):
		return "Success"
	else:
		return "Failure"

@app.route('/book_through_index', methods=['POST'])
def book_through_index():
	# Gather booking request data
	bookingInfo = request.json

	# Process Data
	bookingServiceUrl = "http://localhost:5002/booking_availability"
	resp = requests.post(bookingServiceUrl,json=bookingInfo)

	# Return user to booking page with dates pre-booked if available, if not then return error message to user 
	if (resp.text == "available"):
		return "Success"
	else:
		return "Failure"

@app.route('/book_payment', methods=['POST'])
def book_payment():
	# Gather booking request data
	bookingInfo = request.json

	# Format booking data to match VRBO styled data, %m/%d/%Y to %Y-%m-%d
	bookingInfo['rentalInfo']['arrivalDate'] = datetime.datetime.strptime(bookingInfo['rentalInfo']['arrivalDate'],"%m/%d/%Y").strftime('%Y-%m-%d')
	bookingInfo['rentalInfo']['departDate'] = datetime.datetime.strptime(bookingInfo['rentalInfo']['departDate'],"%m/%d/%Y").strftime('%Y-%m-%d')	

	# Send Data to payment microservice for scheduling payment to client
	paymentInfo = bookingInfo['paymentInfo']
	paymentServiceUrl = "http://localhost:5003/pay"
	resp = requests.post(paymentServiceUrl,json=paymentInfo)
	isPaymentSuccessful = resp.text
	
	# If payment was successful
	if (isPaymentSuccessful == "Success"):
		# Store newly booked dates to database
		bookingDatabaseServiceUrl = "http://localhost:5002/save_booked_information_to_database"
		resp = requests.post(bookingDatabaseServiceUrl,json=bookingInfo)

		# Save newly booked dates to Reservations file
		bookingSaveToReservationsServiceUrl = "http://localhost:5002/save_booked_information_to_reservations"
		resp = requests.post(bookingSaveToReservationsServiceUrl,json=bookingInfo)

		# Send email to recipients list confirming the booking went through successfully
		emailBookingConfirmationUrl = "http://localhost:5001/email_booking_confirmation_to_owner"
		resp = requests.post(emailBookingConfirmationUrl,json=bookingInfo)

		# Send text to recipients list confirming the booking went through successfully
		#textBookingConfirmationUrl = "http://localhost:5001/text_booking_confirmation_to_owner"
		#resp = requests.post(textBookingConfirmationUrl,json=bookingInfo)

		# Send newly booked dates to VRBO to prevent double booking
		#t = threading.Thread(target=fireSaveRequests,args=[bookingInfo])
		#t.start()

		# Return user to booking page with dates booked and successful confirmation message on success, error message if error
		rentalInfo = bookingInfo['rentalInfo']
		return rentalInfo

	else:
		return "failure"

# Background Processes
def fireSaveRequests(bookingInfo):
	bookingSendToVRBOServiceUrl = "http://localhost:5002/send_booked_information_to_vrbo"
	resp = requests.post(bookingSendToVRBOServiceUrl,json=bookingInfo)

	
# Run app on 0.0.0.0:5000
#if __name__ == "__main__":
#	port = int(os.environ.get('PORT', 5000))
#	app.run(host='0.0.0.0', port=port)
