import os

basedir = os.path.abspath(os.path.dirname(__file__))


class BaseConfig:
	"""Base configuration."""
	SECRET_KEY = '5791628bb0b13ce0c676dfde280ba245' #os.getenv('SECRET_KEY', 'my_precious')
	DEBUG = False
	BCRYPT_LOG_ROUNDS = 13
	MAIL_SERVER = 'smtp.googlemail.com'
	MAIL_PORT = 587
	MAIL_USE_TLS = True
	MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
	MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')



class DevelopmentConfig(BaseConfig):
	"""Development configuration."""
	DEBUG = True
	BCRYPT_LOG_ROUNDS = 4
	MONGODB_DATABASE_URI = database_host
	MONGODB_DATABASE_NAME = database_name
	MONGODB_DATABASE_USERNAME = database_name
	MONGODB_DATABASE_PASSWORD =database_password


class TestingConfig(BaseConfig):
	"""Testing configuration."""
	DEBUG = True
	TESTING = True
	BCRYPT_LOG_ROUNDS = 4
	MONGODB_DATABASE_URI = database_host
	MONGODB_DATABASE_NAME = database_name
	MONGODB_DATABASE_USERNAME = database_name
	MONGODB_DATABASE_PASSWORD =database_password
	PRESERVE_CONTEXT_ON_EXCEPTION = False


class ProductionConfig(BaseConfig):
	"""Production configuration."""
	SECRET_KEY = 'my_precious'
	DEBUG = False
	MONGODB_DATABASE_URI = database_host
	MONGODB_DATABASE_NAME = database_name
	MONGODB_DATABASE_USERNAME = database_name
	MONGODB_DATABASE_PASSWORD =database_password

