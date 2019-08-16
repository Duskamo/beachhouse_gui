from flask import Flask, request, render_template
import requests
import os
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
	bookingServiceUrl = "http://localhost:5002/request_calendar_dates"
	bookingDates = requests.get(bookingServiceUrl)

	return bookingDates.text

@app.route('/get_calendar_info', methods=['GET'])
def get_calendar_info():
	# Fetch and return booked dates from booking microservice
	bookingServiceUrl = "http://localhost:5002/get_calendar_dates"
	bookingDates = requests.get(bookingServiceUrl)

	return bookingDates.text

@app.route('/send_contact', methods=['POST'])
def send_contact():
	# Gather Data
	contactInfo = request.json

	# Process Data
	contactServiceUrl = "http://localhost:5001/contact"
	requests.post(contactServiceUrl,json=contactInfo)

	# Return status code
	return "200"

@app.route('/book_through_index', methods=['POST'])
def book_through_index():
	# Gather booking request data
	bookingInfo = request.json

	# Process Data
	bookingServiceUrl = "http://localhost:5002/booking_availability"
	resp = requests.post(bookingServiceUrl,json=bookingInfo)

	# Return user to booking page with dates pre-booked if available, if not then return error message to user ***HERE***
	return resp.text


# Run app on 0.0.0.0:5000
if __name__ == "__main__":
	port = int(os.environ.get('PORT', 5000))
	app.run(host='0.0.0.0', port=port)
