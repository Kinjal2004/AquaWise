from flask import Flask, request, jsonify
from flask_cors import CORS 
import tensorflow as tf
import numpy as np

app = Flask(__name__)
CORS(app)
TF_MODEL_FILE_PATH = 'model.tflite'

def load_model():
    interpreter = tf.lite.Interpreter(model_path=TF_MODEL_FILE_PATH)
    interpreter.allocate_tensors()
    return interpreter

model = load_model()
class_labels = [
    'Bacterial Red disease',
    'Bacterial diseases - Aeromoniasis',
    'Bacterial gill disease',
    'Fungal diseases Saprolegniasis',
    'Healthy Fish',
    'Parasitic diseases',
    'Viral diseases White tail disease'
]

def preprocess_image(img):
    img_array = tf.image.resize(img, (224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(img_array)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.route('/api/disease_prediction', methods=['POST'])
def image_size():
    # Check if the request contains a file
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'})

    file = request.files['file']

    # Check if the file is empty
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    img = tf.image.decode_image(file.read(), channels=3)
    img_array = preprocess_image(img)

    input_details = model.get_input_details()
    output_details = model.get_output_details()

    model.set_tensor(input_details[0]['index'], img_array)
    model.invoke()

    prediction = model.get_tensor(output_details[0]['index'])
    score = tf.nn.softmax(prediction)

    predict = {label: {'raw_score': float(prediction[0][i]), 'probability': float(score[0][i])} for i, label in enumerate(class_labels)}

    return jsonify({'predictions': predict})

if __name__ == '__main__':
    app.run(debug=False)
