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

def get_hackathon_match_hackers(query):
	hackathon = None
	if ObjectId.is_valid(query):
		hackathon = get_hackathon_by_id(query)
	else:
		hackathon = get_hackathon(query)
	hackers_id = hackathon.match_hackers
	return hackers_id
