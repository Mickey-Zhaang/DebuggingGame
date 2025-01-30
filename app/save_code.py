from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
import os
import subprocess

save_blueprint = Blueprint('save', __name__)

CORS(save_blueprint, resources={r"/save-code": {"origins": "http://localhost:5173"}})
CORS(save_blueprint, resources={r"/run-code": {"origins": "http://localhost:5173"}})


@save_blueprint.route('/save-code', methods=['POST'])
def save_code():
    data = request.get_json()
    user_code = data.get('code')

    # filepath to output folder and name user input 'user_code.py'
    output_dir = os.path.join(os.path.dirname(__file__), 'output')
    file_path = os.path.join(output_dir, 'user_code.py')

    try:
        os.makedirs(output_dir, exist_ok=True)

        # Save the code to a file
        with open(file_path, 'w') as file:
            file.write(user_code)
        return jsonify({"success": True, "message": "File saved successfully"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


@save_blueprint.route('/run-code', methods=['POST'])
def run_code():
    # Define the output directory and file path
    output_dir = os.path.join(os.path.dirname(__file__), 'output')
    file_path = os.path.join(output_dir, 'user_code.py') 

    try:
        # Check if the file exists
        if not os.path.exists(file_path):
            return jsonify({
                "success": False,
                "message": "No code file found. Please save the code first."
            }), 404

        # Execute the saved Python file
        result = subprocess.run(['python', file_path], capture_output=True, text=True)

        # Print the output and errors to the console
        print("=== Execution Output ===")
        print(result.stdout)  # Print standard output
        if result.stderr:
            print("=== Execution Errors ===")
            print(result.stderr)  # Print standard error

        # Check if the execution was successful
        if result.returncode == 0:
            return jsonify({
                "success": True,
                "message": "Code executed successfully",
                "output": result.stdout
            })
        else:
            return jsonify({
                "success": False,
                "message": "Code execution failed",
                "error": result.stderr
            }), 500

    except Exception as e:
        print("=== Exception ===")
        print(str(e))  # Print any exceptions to the console
        return jsonify({"success": False, "message": str(e)}), 500