import datetime
import json
from flask import Blueprint
from flask import render_template, url_for, flash, redirect, request, session
from server import bcrypt, db, mail
from server.models import User
from flask_login import login_user, current_user, logout_user, login_required
from flaskblog.server.utils import save_picture, send_reset_email

users = Blueprint('users', __name__)

@users.route("/login", methods=['POST'])
def login():
    if current_user.is_authenticated:
        return None
    if request.method == 'POST':
        data = json.loads(request.data)
        email = data['email']
        pw = data['password']
        user = None
        for query in User.objects(email=email): 
            user = query
        if user:
            if bcrypt.check_password_hash(user.password, password):
                login_user(user, remember=form.remember.data)
                next_page = request.args.get("next")    # gets next param in url link
                return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 
            else:
                return json.dumps({'success':False}), 400, {'ContentType':'application/json'}     
        else:
            return json.dumps({'success':False}), 400, {'ContentType':'application/json'} 
    
    return json.dumps({'success':False}), 400, {'ContentType':'application/json'}

@users.route("/register", methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return None
    if request.method == 'POST':
        data = json.loads(request.data)
        email = data['email']
        user = None
        for query in User.objects(email=email): user = query
        if user:
            # todo: email exists
            return json.dumps({'success':False}), 400, {'ContentType':'application/json'}
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user = User(username=data['username'], email=data['email'],password=hashed_password).save()
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 
    
    return json.dumps({'success':False}), 400, {'ContentType':'application/json'}




@users.route("/logout")
def logout():
    logout_user()
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 



@users.route("/account", methods=['GET','POST'])
@login_required
def account():
    if request.method == 'GET':
        # parse current user to json
        return current_user
    if request.method == 'POST':
        pass
    # if form.validate_on_submit():
    #     #check if there's picture data
    #     if form.picture.data:
    #         picture_file = save_picture(form.picture.data)
    #         current_user.image_file = picture_file
    #         User.objects(email=current_user.email).update_one(image_file=picture_file)
    #     current_user.username = form.username.data
    #     current_user.email = form.email.data
    #     User.objects(email=current_user.email).update_one(
    #         username=form.username.data,
    #         email=form.email.data
    #         )
    #     flash('account updated', 'success')
    #     return redirect(url_for('users.account'))
    # elif request.method == 'GET':
    #     # populate form fields 
    #     form.username.data = current_user.username
    #     form.email.data = current_user.email
    # image_file = url_for('static', filename="profile_pics/"+current_user.image_file)
    # return render_template('account.html', title='Account', image_file=image_file, form=form)

@users.route("/profile/<string:user_id>", methods=['GET'])
def profile(user_id):
    if current_user.id == user_id:
        return redirect(url_for('users.account'))
    if request.method == 'GET':
        for query in User.objects(id=user_id): user = query
        image_file = url_for('static', filename="profile_pics/"+user.image_file)
        return render_template('profile.html', title='Profile', image_file=image_file, user=user)

@users.route("/reset_password", methods=['GET', 'POST'])
def reset_request():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = RequestResetForm()
    if form.validate_on_submit():
        for query in User.objects(email=form.email.data):
            user = query
            send_reset_email(user)
            flash("An email has been sent with instructions to reset your password", "info")
            return redirect(url_for('users.login'))
    return render_template('reset_request.html', title='Reset Password', form=form)

@users.route("/reset_password/<token>", methods=['GET', 'POST'])
def reset_token(token):
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    user = User.verify_reset_token(token)
    
    if user is None:
        flash('That is an invalid or expired token', 'warning')
        return redirect(url_for('users.reset_request'))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        User.objects(email=user.email).update_one(password=hashed_password)
        flash(f'Password has been updated', 'success')
        return redirect(url_for('main.home'))
    return render_template('reset_token.html', title='Reset Password', form=form)

