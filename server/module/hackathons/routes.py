from flask import Blueprint
from flask import render_template, url_for, flash, redirect, request, session
from module import app
from module.models import User, Hackathon
from flask_login import current_user

hackathons = Blueprint('hackathons', __name__)

'''
TODO: 
1) TEST CASE for all functions
2) Accurate handle exceptions
     For instance, how do you print out the exception messages in the bigger method that calls it? also need to wrap that message in a response object
'''

def get_hackathon(name):
	hackathon = None
	for query in Hackathon.object(name=name): hackathon = query
	if hackathon == None: raise Exception('the url is invalid')
	else: return hackathon

def get_user(auth_header):
	if auth_header:
		try:
			auth_token = auth_header.split(" ")[1]
		except IndexError as e:
			raise IndexError('Bearer token malformed')
	else:
		auth_token = ''
	if auth_token:
		resp = User.decode_auth_token(auth_token)
		try:
			user = None
			for query in User.objects(id=resp): user = query
			if user:
				return user
		except Exception as e:
			raise IndexError(e.message)
	else:
		raise IndexError('Provide a valid auth token')

def get_hackathon_users(hackers_ids):
	if len(hackers_ids) == 0:
		return None
	hackers = []
	for hacker_id in hackers_ids:
		hacker = None
		for query in User.objects(id=hacker): hacker = query
		if hacker == None: continue
		else: hackers.append(hacker)
	return hackers

'''
	returns minified_matches
'''
def get_matches(user, hackers):
	return hackers

'''
	TODO: finish this function according to the documentation
   gethackathon
   gets the hackathon based on name, computes matches, return the hackathon itself and its matches
   @returns: hackathon object, matching users
   @exceptions
	   invalid_url: display this hackathon does not exist
	   invalid_matching:
		  1. user did not fill out preferences
		  2. there isn't any users in the hackathon
		  3. there is less than 10 users with preferences filled out that registered for the hackathon
		  4. server_error: display server_error & display random 10 users
'''
@hackathons.route('/hackathons/<string:hackathon_name>', methods=["GET"])
def hackathon(hackathon_name):
	try:
		hackathon = get_hackathon(hackathon_name)
		auth_header = str(request.headers.get('Authorization'))
		user = get_user(auth_header)
		hackers = get_hackathon_users(hackathon.hackers)
		matches = get_matches(user, hackathon.hackers)
		responseObject = {
			'status': 'success',
			'hackathon': {
				'name': hackathon.name,
				'start_date': hackathon.start_date,
				'end_date': hackathon.end_date
			},
			'matches': matches
		}
		return make_response(jsonify(responseObject)), 200
	except IndexError:
		# current user is not authenticated, cannot match users
		responseObject = {
			'status': 'invalid user',
			'message': 'please log in to view matched hackers'
		}
		return make_response(jsonify(responseObject)), 200
	except Exception as error:
		# raise
		responseObject = {
			'status': 'fail',
			'message': error.message
		}
		return make_response(jsonify(responseObject)), 401