from module.models import Hackathon
from bson import ObjectId



def get_hackathon(name):
	hackathon = None
	for query in Hackathon.objects(name=name): hackathon = query
	if hackathon == None: raise ValueError('the url is invalid')
	else: return hackathon

def get_hackathon_by_id(hackathon_id):
	hackathon = None
	for query in Hackathon.objects(id=hackathon_id): hackathon = query
	if hackathon == None: raise ValueError('the url is invalid')
	else: return hackathon

def get_hackathon_users(hackathon_id):
	if isinstance(hackathon_id, basestring):
		if ObjectId.is_valid(hackathon_id):
			hackathon = get_hackathon_by_id(hackathon_id)
