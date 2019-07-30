import datetime
import json
from module.models import User, BlacklistToken
from module import bcrypt, db, mail, app # todo: remove app on production
from module.users.utils import save_picture, send_reset_email
from flask import render_template, flash, request, session, Blueprint, redirect, make_response, jsonify
from flask_login import login_user, current_user, logout_user, login_required
from flask.views import MethodView

import logging, coloredlogs
coloredlogs.install()

users = Blueprint('users', __name__)

@users.route("/testconnection", methods=['GET', 'POST'])
def testconnection():
	print("in testconnection")
	if request.method == "GET":
		return "GET REQUEST"
	if request.method == "POST":
		return "POST REQUEST"


@users.route("/auth/login", methods=['POST'])
def login():
	post_data = json.loads(request.data)
	# app.logger.info(post_data['email']) <- this is how to log well in flask
	try:
		user = None
		for query in User.objects(email=post_data['email']): user = query
		if user and bcrypt.check_password_hash(user['password'], post_data['password']):
			auth_token = user.encode_auth_token(str(user.id))
			if auth_token:
				responseObject = {
					'status': 'success',
					'message': 'Successfully logged in.',
					'auth_token': auth_token.decode()
				}
				return make_response(jsonify(responseObject)), 200
		else:
			responseObject = {
				'status': 'fail',
				'message': 'User does not exist.'
			}
			return make_response(jsonify(responseObject)), 404
	except Exception as e:
		# app.logger.error(e)
		responseObject = {
			'status': 'fail',
			'message': 'Try again'
		}
		return make_response(jsonify(responseObject)), 500

'''
todo: do this function that saves profile pic to gcloud
'''
def save_profile_pic():
	pass


@users.route("/auth/signup", methods=['POST'])
def signup():
	if request.method == 'POST':
		post_data = json.loads(request.data)
		user = None
		for query in User.objects(email=post_data['email']): user = query
		if not user:
			try:
				hashed_password = bcrypt.generate_password_hash(post_data['password']).decode('utf-8')
				# app.logger.info(hashed_password)
				user = User(
					username=post_data['username'],
					email=post_data['email'],
					password=hashed_password
				).save()
				# app.logger.info(user)
				auth_token = user.encode_auth_token(str(user.id))    # jwt encoded object
				# app.logger.info(auth_token)
				responseObject = {
					'status': 'success',
					'message': 'Successfully registered.',
					'auth_token': auth_token.decode()
				}
				return make_response(jsonify(responseObject)), 201
			except Exception as e:
				# app.logger.error(e)
				responseObject = {
					'status': 'fail',
					'message': 'Some error occurred. Please try again.'
				}
				return make_response(jsonify(responseObject)), 401
		else:
			responseObject = {
				'status': 'fail',
				'message': 'User already exists. Please Log in.',
			}
			return make_response(jsonify(responseObject)), 202

'''
TODO: 
convert JSON -> Mongodb instance & save it.
write a generic function for User JSON -> mongodb instance and test it
'''
@users.route("/auth/register", methods=['POST'])
def register():
	print('in register!')
	responseObject = {
		'status': 'success'
	}
	return make_response(jsonify(responseObject)), 201

'''
todo: do proper auth for logout (blacklisttoken and stuff)
'''
@users.route("/auth/logout", methods=['POST'])
def logout():
	if request.method == 'POST':
		auth_header = request.headers.get('Authorization')
		if auth_header:
			auth_token = auth_header.split(" ")[1]
		else:
			auth_token = ''
		if auth_token:
			resp = User.decode_auth_token(auth_token)
			if isinstance(resp, str):
				# app.logger.info(auth_token)
				# todo: mark the token as blacklisted
				# blacklist_token = BlacklistToken(token=auth_token)
				try:
					# todo: insert the token to blacklist session
					responseObject = {
						'status': 'success',
						'message': 'Successfully logged out.'
					}
					return make_response(jsonify(responseObject)), 200
				except Exception as e:
					# app.logger.error(e)
					responseObject = {
						'status': 'fail',
						'message': e
					}
					return make_response(jsonify(responseObject)), 200
			else:
				responseObject = {
					'status': 'fail',
					'message': resp
				}
				return make_response(jsonify(responseObject)), 401
		else:
			responseObject = {
				'status': 'fail',
				'message': 'Provide a valid auth token.'
			}
			return make_response(jsonify(responseObject)), 403

	# logout_user()
	# return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

'''
TODO:
POST request: basically same thing as registration
'''
@users.route("/auth/account", methods=['GET','POST'])
#a@login_required
def account():
	if request.method == 'GET':
		# app.logger.info('in routes.py account get request')
		auth_header = str(request.headers.get('Authorization'))
		# app.logger.info(auth_header)
		if auth_header:
			try:
				auth_token = auth_header.split(" ")[1]
			except IndexError as e:
				# app.logger.error(e)
				responseObject = {
					'status': 'fail',
					'message': 'Bearer token malformed.'
				}
				return make_response(jsonify(responseObject)), 401
		else:
			auth_token = ''
		if auth_token:
			# app.logger.info(auth_token)
			resp = User.decode_auth_token(auth_token)
			# app.logger.info(resp)
			try:
				user = None
				for query in User.objects(id=resp): user = query
				# app.logger.info(user)
				if user:
					responseObject = {
						'status': 'success',
						'data': {
							'email': user.email
						}
					}
					return make_response(jsonify(responseObject)), 200
			except Exception as e:
				# app.logger.error(e)
				responseObject = {
					'status': 'fail',
					'message': e.message
				}
				return make_response(jsonify(responseObject)), 401
		else:
			responseObject = {
				'status': 'fail',
				'message': 'Provide a valid auth token.'
			}
			return make_response(jsonify(responseObject)), 401
	if request.method == 'POST':
		pass

'''
TODO:
do the same thing as GET for account, dont worry about test case
'''
@users.route("/profile/<string:user_id>", methods=['GET'])
def profile(user_id):
	if current_user.id == user_id:
		return redirect(url_for('users.account'))
	if request.method == 'GET':
		for query in User.objects(id=user_id): user = query
		image_file = url_for('static', filename="profile_pics/"+user.image_file)
		return render_template('profile.html', title='Profile', image_file=image_file, user=user)

'''
=====================don't worry========================
'''
@users.route("/reset_password", methods=['GET', 'POST'])
def reset_request():
	if current_user.is_authenticated:
		return redirect(url_for('main.home'))
	form = RequestResetForm()
	if form.validate_on_submit():
		for query in User.objects(email=form.email.data):
			user = query
			send_reset_email(user)
			flash("An email has been sent with instructions to reset your password", "info")
			return redirect(url_for('users.login'))
	return render_template('reset_request.html', title='Reset Password', form=form)

@users.route("/reset_password/<token>", methods=['GET', 'POST'])
def reset_token(token):
	if current_user.is_authenticated:
		return redirect(url_for('main.home'))
	user = User.verify_reset_token(token)
	
	if user is None:
		flash('That is an invalid or expired token', 'warning')
		return redirect(url_for('users.reset_request'))
	form = ResetPasswordForm()
	if form.validate_on_submit():
		hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
		User.objects(email=user.email).update_one(password=hashed_password)
		flash(f'Password has been updated', 'success')
		return redirect(url_for('main.home'))
	return render_template('reset_token.html', title='Reset Password', form=form)

