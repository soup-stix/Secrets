from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import math
import datetime
import firebase_admin
from firebase_admin import db
from firebase_admin import credentials
from essential_generators import DocumentGenerator

cred = credentials.Certificate("src\secrets-8bd1f-firebase-adminsdk-z2m6u-811c29b5a4.json")
firebase_admin.initialize_app(cred, {
	'databaseURL':'https://secrets-8bd1f-default-rtdb.asia-southeast1.firebasedatabase.app/'
	})

x = datetime.datetime.now()
gen = DocumentGenerator()

app = Flask(__name__)
CORS(app)

ref_code = db.reference('code/')
ref_text = db.reference('text/')

@app.route('/send')
def send():
    return jsonify({'code':"test", 'text':'test'})

@app.route('/read',methods=['POST'])
def read():
    if request.method == 'POST':
        request_data = request.data
        data = json.loads(request_data.decode('utf-8'))
        print(data)
        code = data['code'] 
        fake = data['text']
        text = ref_code.child(code).child(fake).get()
        print(text)
        return jsonify(text)

@app.route('/write',methods=['POST'])
def write():
    if request.method == 'POST':
        request_data = request.data
        data = json.loads(request_data.decode('utf-8'))
        fake = gen.sentence()
        print(data, fake)
        code = data['code'] 
        text = data['text']
        ref_code.child(code).set({fake:text})

        return jsonify(fake)

@app.route('/insert-one', methods=['GET'])
def insertOne():
    if ref_code.child('anand'):
        print("Already exists")
    else:    
        ref_code.set({
            'anand': {
                "public": "hello",
                "private": "world"
            }
        })
    return "Query inserted...!!!"

if __name__ == '__main__':
    app.run(debug = True)
    #app.run(host='0.0.0.0',debug=True)