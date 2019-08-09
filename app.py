from flask import Flask, session, redirect, url_for, escape, request, render_template
import json
import os
app = Flask(__name__)

# Site root url
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

@app.route('/rooms')
def rooms():
	return render_template('rooms.html')

@app.route('/elements')
def elements():
	return render_template('elements.html')


# Run app on 0.0.0.0:5000
if __name__ == "__main__":
	port = int(os.environ.get('PORT', 5000))
	app.run(host='0.0.0.0', port=port)
