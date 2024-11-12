from flask import Flask, request, jsonify
import json

from pirAtES import pirAtES, unpirAtES

app = Flask(__name__)

# POST request for encryption
@app.route('/get-piratified-text/', methods=['POST'])
def get_encrypted_text():
    # Grab JSON and args
    try:
        data = request.get_json()
    except json.JSONDecodeError:
        return jsonify({'error': 'Invalid JSON format'}), 400
    
    plain_text = data.get('plaintext')
    key = data.get('key')

    # Validate data is not null
    if plain_text is None or key is None:
        return jsonify({'error': 'Missing JSON data'}), 400

    return jsonify(pirAtES(plain_text, key), 200)

# POST request for decryption
@app.route('/get-plain-text/', methods=['POST'])
def get_decrypted_text():
    # Grab JSON and args
    try:
        data = request.json
    except json.JSONDecodeError:
        return jsonify({'error': 'Invalid JSON format'}), 400

    cipher_text = data.get('ciphertext')
    key = data.get('key')

    # Validate data is not null
    if cipher_text is None or key is None:
        return jsonify({'error': 'Missing JSON data'}), 400

    return jsonify(unpirAtES(cipher_text, key), 200)

if __name__ == "__main__":
    app.run(debug=True)