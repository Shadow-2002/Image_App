from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

logged_in = False

@app.route('/api/login-status')
def get_login_status():
  return jsonify({'loggedIn': logged_in})


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username == 'user' and password == 'pass':
        return jsonify({'message': 'Success'})
    else:
        global logged_in
        logged_in = True
        # return jsonify({'message': 'Failure'})
        return jsonify({'message': 'Success'})

@app.route("/api/upload-image", methods=["POST"])
def upload_image():
    image = request.files.get('image')
    # filename = secure_filename(image.filename)
    # image.save(os.path.join("./uploads", filename))
    print(image)
    return jsonify({'message': 'mEUSNId1Hfc'})

@app.route('/')
def index():
    return jsonify({'message': 'Success'})

if __name__ == '__main__':
    app.run(host="192.168.244.26",port="3000",debug=True)
