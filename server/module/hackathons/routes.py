import json
from module.models import User, Hackathon
from module import app # todo: remove app on production
from flask import Blueprint
from flask import render_template, url_for, flash, redirect, request, session, make_response, jsonify
from flask.views import MethodView
from module.hackathons.utils import get_hackathon
from module.users.utils import get_userid_from_auth, get_user_from_id

hackathons = Blueprint('hackathons', __name__)

'''
TODO: 
1) TEST CASE for all functions
2) Accurate handle exceptions
     For instance, how do you print out the exception messages in the bigger method that calls it? also need to wrap that message in a response object
'''



'''
	gets full user based on auth_token
'''
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

def get_minified_user(user):
	hacker = {
		'id': user.id,
		'firstname': user['firstname'],
		'lastname': user['lastname'],
		'email': user['email'],
		'profile': {
			"school": user['profile']['school'],
        	"major": user['profile']['major'],
        	"gradYear": user['profile']['gradYear'],
        	"numOfHackathons": user['profile']['numOfHackathons']
		},
		'preferences': {
	        'interests': user['preferences']['interests'],
	        'languages': user['preferences']['languages'],
	        'technologies': user['preferences']['technologies'],
	        'fields': user['preferences']['fields'],
	        "goals": user['preferences']['goals']
	    },
	    'social': {
	    	"profile_pic": user['social']['profile_pic']
	    }
	}
	return hacker




'''
	returns minified_matches
'''
def get_matches(user, hackers):
	return hackers

'''
	add current user to hackathon in url
	returns
'''
@hackathons.route('/hackathons/<string:hackathon_name>/addmatch', methods=['POST'])
def add_hacker_match(hackathon_name):
	try:
		hackathon = get_hackathon(hackathon_name)
		auth_header = str(request.headers.get('Authorization'))
		user = get_user(auth_header)
		if user.id in hackathon.match_hackers:
			responseObject = {
				'status': 'fail',
				'message': 'You are already registered!'
			}
			return make_response(jsonify(responseObject)), 400
		
		if user.id in hackathon.unmatch_hackers:
			updated_unmatch = hackathon.unmatch_hackers
			updated_unmatch.remove(user.id)
			hackathon.update(unmatch_hackers=updated_unmatch)

		updated_hackers = hackathon.match_hackers
		updated_hackers.append(user.id)
		hackathon.update(match_hackers=updated_hackers)
		responseObject = {
			'status': 'success',
			'message': 'You have been added to the hackathon!'
		}
		return make_response(jsonify(responseObject)), 200
	except IndexError:
		# current user is not authenticated, cannot match users
		responseObject = {
			'status': 'invalid user',
			'message': 'please log in to view matched hackers'
		}
		return make_response(jsonify(responseObject)), 401
	except Exception as error:
		app.logger.error(error.message)
		responseObject = {
			'status': 'fail',
			'message': error.message
		}
		return make_response(jsonify(responseObject)), 402

'''
	add current user to hackathon in url
	returns
'''
@hackathons.route('/hackathons/<string:hackathon_name>/addunmatch', methods=['POST'])
def add_hacker_unmatch(hackathon_name):
	try:
		hackathon = get_hackathon(hackathon_name)
		auth_header = str(request.headers.get('Authorization'))
		user = get_user(auth_header)
		if user.id in hackathon.match_hackers:
			responseObject = {
				'status': 'fail',
				'message': 'You are already registered!'
			}
			return make_response(jsonify(responseObject)), 400
		
		if user.id in hackathon.match_hackers:
			updated_match = hackathon.match_hackers
			updated_match.remove(user.id)
			hackathon.update(match_hackers=updated_match)

		updated_hackers = hackathon.unmatch_hackers
		updated_hackers.append(user.id)
		hackathon.update(unmatch_hackers=updated_hackers)
		responseObject = {
			'status': 'success',
			'message': 'You have been added to the hackathon!'
		}
		return make_response(jsonify(responseObject)), 200
	except IndexError:
		# current user is not authenticated, cannot match users
		responseObject = {
			'status': 'invalid user',
			'message': 'please log in to view matched hackers'
		}
		return make_response(jsonify(responseObject)), 401
	except Exception as error:
		app.logger.error(error.message)
		responseObject = {
			'status': 'fail',
			'message': error.message
		}
		return make_response(jsonify(responseObject)), 402




'''
	TODO: finish this function according to the documentation
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
		responseObject = {
			'status': 'success',
			'hackathon': hackathon.get_info()
		}
		return make_response(jsonify(responseObject)), 200
	except Exception as error:
		responseObject = {
			'status': 'fail',
			'message': 'please login to view matches'
		}
		return make_response(jsonify(responseObject)), 401

@hackathons.route('/hackathons/<string:hackathon_name>', methods=["GET"])
def get_matches(hackathon_name):
	try:
		auth_header = str(request.headers.get('Authorization'))
		user = get_user(auth_header)
		hackers_id = get_hackathon_match_hackers(hackathon_name)
		for hacker_id in hackers_id:
			other_hacker = get_user

	except Exception as e:
		app.logger.erorr(e)
		responseObject = {
			'status': 'fail',
			'message': e
		}
		return make_response(jsonify(responseObject)), 401


@hackathons.route('/hackathons')
def get_all_hackathons():
	hackathons = Hackathon.objects()
	results = []
	for hackathon in hackathons:
		results.append(hackathon.get_card())
	responseObject = {
		'status': 'success',
		'hackathons': results 
	}
	return make_response(jsonify(responseObject)), 200
