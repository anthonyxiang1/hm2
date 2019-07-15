import os
import unittest
import coverage

from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

# todo: what is this?
COV = coverage.coverage(
	branch=True,
	include='module/*',
	omit=[
		'tests/*',
		'module/config.py',
		'module/*/__init__.py'
	]
)
COV.start()

from module import app, db, models

migrate = Migrate(app, db)
manager = Manager(app)

#migrations
manager.add_command('db', MigrateCommand)

#manager.add_command("runserver", Server(host=app.config['HOST'], port=app.config['PORT']))

@manager.command
def test():
	"""Runs the unit tests without test coverage."""
	tests = unittest.TestLoader().discover('tests', pattern='test*.py')
	result = unittest.TextTestRunner(verbosity=2).run(tests)
	if result.wasSuccessful():
		return 0
	return 1

@manager.command
def cov():
	"""Runs the unit tests with coverage."""
	tests = unittest.TestLoader().discover('tests')
	result = unittest.TextTestRunner(verbosity=2).run(tests)
	if result.wasSuccessful():
		COV.stop()
		COV.save()
		print('Coverage Summary:')
		COV.report()
		basedir = os.path.abspath(os.path.dirname(__file__))
		covdir = os.path.join(basedir, 'tmp/coverage')
		COV.html_report(directory=covdir)
		print('HTML version: file://%s/index.html' % covdir)
		COV.erase()
		return 0
	return 1

if __name__ == '__main__':
	manager.run()