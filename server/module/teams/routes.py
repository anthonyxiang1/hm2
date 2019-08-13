import json
from module.models import Hackathon, Team
from module import app # todo: remove app on production
from module.users.utils import get_userid_from_auth
from flask import Blueprint
from flask import render_template, url_for, flash, redirect, request, session, make_response, jsonify
from flask.views import MethodView

teams = Blueprint('teams', __name__)


def get_team_by_id(team_id):
	team = None
	for query in Team.objects(id=str(team_id)): team = query
	if team == None:
		raise ValueError('Team is not found')
	return team

def verify_user(user_id, team_id):
	team = get_team_by_id(team_id)
	if str(user_id) in team.members:
		return True
	else:
		return False

def modify_team(data, team_id):
	team = get_team_by_id(team_id)
	json_data = json.loads(data)
	modify_details = {
		'interests': json_data['details']['interests'] or team['details']['interests'],
		'technologies': json_data['details']['technologies'] or team['details']['technologies'],
		'fields': json_data['details']['fields'] or team['details']['fields'],
		'languages': json_data['details']['languages'] or team['details']['languages'],
		'goals': json_data['details']['goals'] or team['details']['goals']
	}
	modify_name = json_data['name'] or team['name'] 
	modify_idea = json_data['idea'] or team['idea']
	team.name = modify_name
	team.idea = modify_idea
	team.details = modify_details
	app.logger.info(team)
	team.save()


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
				'data': jsonify(team)
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
	@param: array of user ids
	@return: a team is created in db
'''
@teams.route('/teams/new', methods=['POST'])
def create_team():
	pass


'''
	add a member to a team that current user is in
	@param: auth_header, user_id to add to team
		1. check that user of auth_header is in team_id
		2. check that capacity is not reached
		3. check user_id is not registered for team in same hackathon
		4. add user to team
'''
@teams.route('/teams/<string:team_id>/add', methods=['POST'])
def add_to_team(team_id):
	pass


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
	pass
