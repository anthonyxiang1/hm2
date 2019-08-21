import numpy as np
from numpy import array
def load_constants(file_name):
	f = open(file_name, 'r')
	arr = f.readlines()
	constants = []
	for x in arr:
		s = x.replace("\n", '');
		constants.append(s)
	return constants

def one_hot_encode(user_preferences, constants_arr):
	one_hot_encode = [0] * len(constants_arr)
	for preference in user_preferences:
		if isinstance(preference, str):
			#preference = preference.replace('\n', '')
			idx = constants_arr.index(preference)
			one_hot_encode[idx] = 1
		else:
			#print(preference)
			#preference['name'] = preference['name'].replace('\n', '')
			idx = constants_arr.index(preference['name'])
			one_hot_encode[idx] = float(preference['skill']) / 10.0
	return one_hot_encode

def compute_preference_score(user_preference, opponent_preference, constants_arr):
	user = array(one_hot_encode(user_preference, constants_arr))
	opponent = array(one_hot_encode(opponent_preference, constants_arr))
	result = np.multiply(user, opponent)
	common_preferences = []
	for idx, preference in enumerate(result):
		if preference > 0:
			common_preferences.append(constants_arr[idx])

	return result, common_preferences

def score_arr_to_scalar(score_arr):
	total = 0
	for score in score_arr:
		if score > 0: total += score
	return total

def match(user, other_user, care_score):
	interests = load_constants('/Users/admin/Desktop/Projects/hm2/server/module/hackathons/interests.txt')
	languages = load_constants('/Users/admin/Desktop/Projects/hm2/server/module/hackathons/languages.txt')
	fields = load_constants('/Users/admin/Desktop/Projects/hm2/server/module/hackathons/fields.txt')
	technologies = load_constants('/Users/admin/Desktop/Projects/hm2/server/module/hackathons/technologies.txt')

	interests_score_arr = [] 
	languages_score_arr = [] 
	technology_score_arr = [] 
	field_score_arr = []

	interest_score_arr, common_interests = compute_preference_score(user['interests'], other_user['interests'], interests)
	language_score_arr, common_languages = compute_preference_score(user['languages'], other_user['languages'], languages)
	technology_score_arr, common_technologies = compute_preference_score(user['technologies'], other_user['technologies'], technologies)
	field_score_arr, common_fields = compute_preference_score(user['fields'], other_user['fields'], fields)

	commons = []
	for preference in common_interests:
		commons.append(preference)
	for preference in common_languages:
		commons.append(preference)
	for preference in common_technologies:
		commons.append(preference)
	for preference in common_fields:
		commons.append(preference)
	

	interest_score = score_arr_to_scalar(interests_score_arr)
	language_score = score_arr_to_scalar(languages_score_arr)
	technology_score = score_arr_to_scalar(technology_score_arr)
	field_score = score_arr_to_scalar(field_score_arr)

	similiarity_score = care_score['interests'] * interest_score / 10.0 + care_score['languages'] * language_score + care_score['technologies'] * technology_score / 10.0 + care_score['fields'] * field_score
	return similiarity_score, commons
