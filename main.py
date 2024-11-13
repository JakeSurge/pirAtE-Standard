from flask import Flask, request, jsonify
import json

from pirAtES import pirAtES, unpirAtES

app = Flask(__name__)

# POST request for encryption
@app.route('/piratify', methods=['POST'])
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
    # Validate key length
    elif len(key) != 16 and len(key) != 24 and len(key) != 32:
        return jsonify({'error': 'Improper key length only 16, 24, and 32 characters are supported'}), 400

    return jsonify(pirAtES(plain_text, key), 200)

# POST request for decryption
@app.route('/unpiratify', methods=['POST'])
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
    # Validate key length
    elif len(key) != 16 and len(key) != 24 and len(key) != 32:
        return jsonify({'error': 'Improper key length only 16, 24, and 32 characters are supported'}), 400

    return jsonify(unpirAtES(cipher_text, key), 200)

if __name__ == "__main__":
    app.run(debug=True)