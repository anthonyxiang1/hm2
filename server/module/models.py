import jwt
import datetime
import json
from mongoengine import *
from module import login_manager, app, bcrypt
from flask_login import UserMixin
from bson.json_util import loads, dumps
from bson import ObjectId
from mongoengine import StringField, IntField, EmailField, DateTimeField, ListField, ObjectIdField, URLField, DictField

from randomuser import RandomUser
# @login_manager.user_loader
# def load_user(user_id):
#     for query in User.objects(id=user_id):
#         print('models.py 11', query, user_id) 
#         return query


class User(Document, UserMixin):
    firstname = StringField(max_length=60, required=True)
    lastname = StringField(max_length=60, required=True)
    email = EmailField(required=True,unique=True)
    password = StringField(max_length=70)
    profile_pic = StringField(default='default.jpg')
    profile = DictField(default={
        "gender": "",
        "school": "",
        "major": "",
        "gradYear": "",
        "numOfHackathons": ""
    })
    preferences = DictField(default={
        'interests': [],
        'languages': [],
        'technologies': [],
        'fields': [],
        "goals": 0
    })
    social = DictField(default={
        "website": '',
        'devpost': '',
        'linkedin': '',
        'github': '',
        'slack': '',
        'facebook': '',
        'instagram': ''
    })
    carescores = DictField(default={
        'interests': '5',
        'languages': '5',
        'technologies': '5',
        'fields': '5'
    })
    teams = ListField(default=[])           #list of teamIds
    hackathons = ListField(default=[])      #list of hackathonIDs

    def encode_auth_token(self, user_id):
        """
        Validates the auth token
        :param auth_token:
        :return: integer|string <- auth token that client stores & sends it along with all subsequent requests to API
        given a user id, this method creates and returns a token from the payload and the secret key set in the config.py file. 
        The payload is where we add metadata about the token and information about the user. 
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=0),  # expiration time of token
                'iat': datetime.datetime.utcnow(),                                          # time the token is generated
                'sub': user_id                                                              # subject of the token (user whom it identifies)
            }
            return jwt.encode(
                payload,
                app.config.get('SECRET_KEY'),
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        We need to decode the auth token with every API request and verify its signature to be sure of the user’s authenticity. 
        To verify the auth_token, we used the same SECRET_KEY used to encode a token.
        If the auth_token is valid, we get the user id from the sub index of the payload.
        If invalid, there could be two exceptions:
            1. Expired Signature: When the token is used after it’s expired, it throws a ExpiredSignatureError exception. This means the time specified in the payload’s exp field has expired.
            2. Invalid Token: When the token supplied is not correct or malformed, then an InvalidTokenError exception is raised.
        """
        try:
            payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
            return payload['sub']   # subject of the token
        except jwt.ExpiredSignatureError as err:
            err.message='Signature expired. Please log in again.'
            raise
            # return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError as err:
            err.message='Invalid token. Please log in again.'
            raise
            # return 'Invalid token. Please log in again.'


    def get_reset_token(self, expires_sec=1800):
        #s = Serializer(app.config['SECRET_KEY'], expires_sec)
        return dumps({'user_id': self.id})#.decode('utf-8')

    @staticmethod       # tell python we don't need self as token
    def verify_reset_token(token):
        #s = Serializer(app.config['SECRET_KEY'])
        try:
            # print("models.py 30", token)
            user_id = loads(token)['user_id']
            # print(user_id)
        except:
            return None
        for query in User.objects(id=user_id):
            return query

    def get_card(self):
        user = {
            'id': str(self.id),
            'firstname': self.firstname,
            'lastname' : self.lastname,
            'email': self.email,
            'profile_pic': self.profile_pic,
            'school': self.profile['school'],
            'major': self.profile['major'],
            'goals': self.preferences['goals'],
            'preferences': self.get_preferences_list()
            # todo: for matches, get common preferences
        }
        return json.dumps(user)

    def get_profile(self):
        profile = DictField(default={
            "gender":  self.gender,
            "school": self.school,
            "major": self.major,
            "gradYear": self.gradYear,
            "numOfHackathons":  self.numOfHackathons
        })
        return json.dumps(profile)

    def get_preferences(self):
        preferences = {
            'interests': self.preferences['interests'],
            'languages': self.preferences['languages'],
            'technologies': self.preferences['technologies'],
            'fields': self.preferences['fields'],
            'goals': 0
        }
        return json.dumps(preferences)

    def get_preferences_list(self):
        commons = []
        for preference in self.preferences['interests']:
            commons.append(preference)
        for preference in self.preferences['languages']:
            commons.append(preference['name'])
        for preference in self.preferences['technologies']:
            commons.append(preference['name'])
        for preference in self.preferences['fields']:
            commons.append(preference)
        return commons

    def __str__(self):
        return f"User('{self.firstname}','{self.email}')"

class BlacklistToken(Document):
    token = StringField(unique=True, nullable=False) 
    blacklisted_on = DateTimeField(default=datetime.datetime.now())

    def __init__(self, token):
        self.token = token
        self.blacklisted_on = datetime.datetime.now()

    def __repr__(self):
        return '<id: token: {}'.format(self.token)

class Hackathon(Document):
    name = StringField(required=True, max_length=60, unique=True)
    start_date = DateTimeField(required=True)
    end_date = DateTimeField(required=True)
    state = StringField(required=True)
    city = StringField(required=True)
    address = StringField(required=True)
    url = URLField()
    about = StringField(default='')
    logo = StringField()
    school = StringField()
    match_hackers = ListField()   #todo: remove
    unmatch_hackers = ListField()
    teams = ListField()     #todo: remove

    def __str__(self):
        return f"Hackathon('{self.name}','{self.start_date}')"


    def contain_hacker(self, user_id):
        if isinstance(user_id, str):
            if ObjectId.is_valid(user_id):
                oid = ObjectId(user_id)
                if oid in self.match_hackers or oid in self.unmatch_hackers: return True
                else: return False
        else:
            raise ValueError('invalid parameter or user')

    def get_info(self):
        hackathon = {
            'name': self.name,
            'start_date': self.start_date.strftime('%m/%d'),
            'end_date' : self.end_date.strftime('%m/%d'),
            'state': self.state,
            'city': self.city,
            'address': self.address,
            'url': self.url,
            'about': self.about,
            'logo': self.logo,
            'school': self.school
        }
        return json.dumps(hackathon)

    def get_card(self):
        card = {
            'id': str(self.id),
            'name': self.name,
            'start_date': self.start_date.strftime('%m-%d-%Y'),
            'end_date' : self.end_date.strftime('%m-%d-%Y'),
            'state': self.state,
            'city': self.city
        }
        return json.dumps(card)


'''
    # todo: get hackathon season based on start_date: f2017
    def get_season(self):
        if start_date.month <= 6: season = "s"
        else: season = "f"
        return season, start_date.year

    # returns the url_id for this hackathon, used as hackathon_id in url
    # hackathon_name+hackathon_season
    def get_url_id(self):
        season, year = get_season(self)
        return self.name+season+year
'''
   
 
class Team(Document):
    name = StringField()
    members = ListField(required=True)
    capacity = IntField(default=4)
    idea = StringField()
    hackathon = StringField(required=True)           #hackathonID that team is assigned to
    details = DictField(default={
        'interests': ListField(default=[]),
        'language': ListField(default=[]),
        'technologies': ListField(default=[]),
        'fields': ListField(default=[]),
        'goals': 0
    })

    def is_empty(self):
        return len(members) == 0
    def is_full(self):
        return len(members) == capacity
    def get_card(self):
        members_pics = []
        for member in self.members:
            random_user = RandomUser()
            members_pics.append(random_user.get_picture())
        card = {
            'id': str(self.id),
            'name': self.name,
            'idea': self.idea,
            'members': members_pics
        }
        return json.dumps(card)


class Conversation(Document):
    participants = ListField(StringField())
    last_active_date = DateTimeField(default=datetime.datetime.now())

    # fetches all messages associated with this conversation
    # returns a sorted list of messages ordered by message time
    def fetch_messages(self):
        return None

# TODO: modify conversationId and sender field to objectId fields instead of string
class Message(Document):
    content = StringField(required=True)
    created_date = DateTimeField(default=datetime.datetime.now())
    conversationId = StringField(required=True)
    sender = StringField(required=True)
    

class Post(Document):
    title = StringField(required=True, max_length=200)
    content = StringField(required=True)
    author = StringField(required=True, max_length=50)
    date_posted = DateTimeField(default=datetime.datetime.now())

    def __str__(self):
        return f"Post('{self.title}', '{self.date_posted}')"

#ross = Post(title='noo@example.com', content='what the heck', author='noo').save()
