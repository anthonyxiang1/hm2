'''server/app.py - main api app declaration'''
from flask import Flask
app = Flask(__name__, static_folder='../build')
from flask_cors import CORS
from mongoengine import *
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_mail import Mail
from flask_socketio import SocketIO
from .config import Config

'''Main wrapper for app creation'''
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
CORS(app)
connect(db='testflask', 
    username='jenny_xu',
    password='qwerty123',
    host='mongodb://hackersmatcher:HackersMatcherInc@cluster0-shard-00-00-n7gco.mongodb.net:27017,cluster0-shard-00-01-n7gco.mongodb.net:27017,cluster0-shard-00-02-n7gco.mongodb.net:27017/testflask?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true')

db = get_db()
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'users.login'		# tells manager where login route is located after @login_required is invoked
login_manager.login_message_category = 'info'	# sets categegory for login message
mail = Mail(app)
socketio = SocketIO(app)

# import routes
from module.users.routes import users
from module.chats.routes import chats
from module.hackathons.routes import hackathons
app.register_blueprint(users)
app.register_blueprint(chats)
app.register_blueprint(hackathons)

##
# API routes
##

@app.route('/api/items', methods=['GET', 'POST'])
def items():
  if request.method == "POST":
  	print('yoooooo', request.data)
  	return jsonify([{'title': 'A'}, {'title': 'B'}])
  if request.method =="GET":
  	return jsonify([{'title': 'A'}, {'title': 'B'}])

##
# View route
##

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def index(path):
#   '''Return index.html for all non-api routes'''
#   #pylint: disable=unused-argument
#   return send_from_directory(app.static_folder, 'index.html')