from flask import Flask
import os

def create_app():
    app = Flask(__name__)
    from .views import main_blueprint
    from .save_code import save_blueprint
    
    app.register_blueprint(main_blueprint)
    app.register_blueprint(save_blueprint)
    
    return app

if __name__ == '__main__':
    create_app()