
from module.models import Hackathon, Team


def get_team_by_id(team_id):
	team = None
	for query in Team.objects(id=str(team_id)): team = query
	if team == None:
		raise ValueError('Team is not found')
	return team


def verify_user_in_team(user_id, team_id):
	team = get_team_by_id(team_id)
	if str(user_id) in team.members:
		return True
	else:
		return False

'''
	@param: user and hackathon object
	@returns True if user is in hackathon and not in a team assigned to this hackathon
'''
def verify_user_in_hackathon(user, hackathon):
	if (str(hackathon.id) in user.hackathons) or (hackathon.contain_hacker(str(user.id))): # user in hackathon
		print(user.teams)
		for team_id in user.teams:
			team = get_team_by_id(team_id)
			if str(team.hackathon) == str(hackathon.id):
				return False
		return True 




def modify_team(json_data, team_id):
	team = get_team_by_id(team_id)
	#json_data = json.loads(data)
	modify_details = {
		'interests': json_data['details']['interests'] or team['details']['interests'],
		'technologies': json_data['details']['technologies'] or team['details']['technologies'],
		'fields': json_data['details']['fields'] or team['details']['fields'],
		'languages': json_data['details']['languages'] or team['details']['languages'],
		'goals': json_data['details']['goals'] or team['details']['goals']
	}
	modify_name = json_data['name'] or team['name'] 
	modify_idea = json_data['idea'] or team['idea']
	team.update(
		name=modify_name,
		idea=modify_idea,
		details=modify_details
	)
	app.logger.info(team)