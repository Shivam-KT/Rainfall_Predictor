from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import os
import numpy as np
import pickle

app = Flask(__name__)
load_dotenv()

# Load trained model
with open('model/model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    try:
        features = np.array([
            data['MinTemp'], data['MaxTemp'],
            data['Humidity9am'], data['Humidity3pm'],
            data['Temp9am'], data['Temp3pm'],
            data['Pressure9am'], data['Pressure3pm']
        ]).reshape(1, -1)
        prediction = model.predict(features)
        return jsonify({'predicted_rainfall': round(prediction[0], 2)})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

