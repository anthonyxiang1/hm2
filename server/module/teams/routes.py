import json
from module.models import Hackathon, Team
from module import app # todo: remove app on production
from module.users.utils import get_userid_from_auth, get_user_from_id
from flask import Blueprint
from flask import render_template, url_for, flash, redirect, request, session, make_response, jsonify
from flask.views import MethodView
from module.teams.utils import get_team_by_id, verify_user_in_team, modify_team, verify_user_in_hackathon
from module.hackathons.utils import get_hackathon_by_id, get_hackathon

teams = Blueprint('teams', __name__)


'''
	GET: gets team profile according to team id
	POST:
		1) verifies requester is in team
		2) modify team

'''
@teams.route('/teams/<string:team_id>', methods=['GET', 'POST'])
def get_team(team_id):
	if request.method == 'GET':
		try:
			team = get_team_by_id(team_id)
			responseObject = {
				'status': 'success',
				'data': team.to_json()
			}
			return make_response(jsonify(responseObject)), 200
		except ValueError:
			responseObject = {
				'status': 'fail',
				'message': 'URL is invalid'
			}
			return make_response(jsonify(responseObject)), 404
	elif request.method == 'POST':
		try:
			auth_header = request.headers.get('Authorization')
			user_id = get_userid_from_auth(auth_header)
			if user_id == None:
				responseObject = {
					'status': 'fail',
					'message': 'user must be logged in'
				}
				return make_response(jsonify(responseObject)), 400
			if verify_user(user_id, team_id):
				data = json.loads(request.data)
				modify_team(data, team_id)
			else:
				responseObject = {
					'status': 'fail',
					'message': 'user is not authorized'
				}
				return make_response(jsonify(responseObject)), 400
		except IndexError as e:
			responseObject = {
				'status': 'fail',
				'message': e.message
			}
			return make_response(jsonify(responseObject)), 401
		except Exception as e:
			responseObject = {
				'status': 'fail',
				'message': e.message
			}
			return make_response(jsonify(responseObject)), 402
			

'''
	create a new team
	@param: array of user ids & corresponding hackathon; name, idea, details object
	@return: a team is created in db
	1. verify all members are in hackathon
	2. verify all members are not registered for another team in this hackathon
	3. verify team members does not exceed capacity
	4. create team

'''
@teams.route('/teams/new', methods=['POST'])
def create_team():
	auth_header = str(request.headers.get('Authorization'))
	user_id = get_userid_from_auth(auth_header)

	post_data = json.loads(request.data)
	hackathon_id = post_data['hackathon']
	hackathon = get_hackathon(hackathon_id)
	members_id = post_data['members']
	members_id.append(str(user_id))
	if len(members_id) > post_data['capacity']:
		responseObject = {
			'status': 'failure',
			'message': 'members exceeded capactiy'
		}
		return make_response(jsonify(responseObject)), 401
	for member_id in members_id:
		user = get_user_from_id(member_id)
		if not verify_user_in_hackathon(user, hackathon):
			responseObject = {
				'status': 'failure',
				'message': 'one or more users are not registered for this hackathon or is in another team in this hackathon'
			}
			return make_response(jsonify(responseObject)), 402

	# create team
	new_team = Team(members=members_id, hackathon=str(hackathon.id)).save()
	#modify_team(post_data, str(new_team.id))

	#modify users
	for member_id in members_id:
		user = get_user_from_id(member_id)
		updated_teams = user.teams
		updated_teams.append(str(new_team.id))
		user.update(teams=updated_teams)

	responseObject = {
		'status': 'success',
		'team_id': str(new_team.id)
	}
	return make_response(jsonify(responseObject)), 200

'''
	add a member to a team that current user is in, team_id
	@param: auth_header, members_id to add to team
		1. check that user of auth_header is in team_id
		2. check that capacity is not reached
		3. check user_id is not registered for team in same hackathon
		4. add user to team
'''
@teams.route('/teams/<string:team_id>/add', methods=['POST'])
def add_to_team(team_id):
	auth_header = str(request.headers.get('Authorization'))
	user_id = get_userid_from_auth(auth_header)
	post_data = json.loads(request.data)
	if verify_user_in_team(user_id, post_data['team']):
		team = get_team_by_id(post_data['team'])
		members_id = post_data['members']
		if (len(members_id)+len(team.members)) > team.capacity:
			responseObject = {
				'status': 'failure',
				'message': 'team capactiy reached'
			}
			return make_response(jsonify(responseObject)), 401

		hackathon = get_hackathon_by_id(team.hackathon)
		for member_id in members_id:
			member = get_user_from_id(members_id)
			if not verify_user_in_hackathon(member, hackathon):
				responseObject = {
					'status': 'failure',
					'message': 'one or more users are not registered for this hackathon or is in another team in this hackathon'
				}
				return make_response(jsonify(responseObject)), 401
		# verification done
		updated_members = team.members
		for member_id in members_id:
			updated_members.append(member_id)
			user = get_user_from_id(member_id)
			updated_teams = user.teams
			updated_teams.append(str(new_team.id))
			user.update(teams=updated_teams)

		team.update(members=updated_members)
		responseObject = {
			'status': 'success',
			'message': 'New members have been added!'
		}
		return make_response(jsonify(responseObject)), 200
	else:
		responseObject = {
			'status': 'failure',
			'message': 'unauthorized request'
		}
		return make_response(jsonify(responseObject)), 402



'''
	remove a member from a team that current user is in
	@param: auth_header, user_id to remove
		1. check user of auth_header is in team_id
		2. check user_id is in team
		3. kick user
			if user kicks himself out of team, remove the team object from db
'''
@teams.route('/teams/<string:team_id>/remove', methods=['POST'])
def remove_from_team(team_id):
	auth_header = str(request.headers.get('Authorization'))
	user_id = get_userid_from_auth(auth_header)
	post_data = json.loads(request.data)
	if verify_user_in_team(user_id, post_data['team']):
		member_id = post_data['member']
		team = get_team_by_id(post_data['team'])
		updated_members = team.members
		updated_members.remove(member_id)
		team.update(members=updated_members)
		responseObject = {
			'status': 'success',
			'message': 'Member has been removed'
		}
		return make_response(jsonify(responseObject)), 200
	else:
		responseObject = {
			'status': 'failure',
			'message': 'unauthorized request'
		}
		return make_response(jsonify(responseObject)), 402

