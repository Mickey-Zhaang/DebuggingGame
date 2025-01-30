from flask import Flask, request, jsonify, render_template, send_from_directory, Blueprint
import os

main_blueprint = Blueprint('main', __name__)

# Route for the home page
@main_blueprint.route('/')
def serve_index():
    return send_from_directory('.', 'index')

# Route for the game page
@main_blueprint.route('/game')
def game():
    return render_template('game.html')

# Route for the signup page
@main_blueprint.route('/signup')
def signup():
    return render_template('signup.html')

# Route for the test page
@main_blueprint.route('/test')
def test():
    return render_template('test.html')

# Route for the code editor page
@main_blueprint.route('/codeEmbed')
def code_embed():
    return render_template('codeEmbed.html')