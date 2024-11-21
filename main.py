from flask import Flask, request, jsonify
from flask_cors import CORS
import base64

from pirAtES import pirAtES, unpirAtES

app = Flask(__name__)
CORS(app)

# POST request for encryption
@app.route('/piratify', methods=['POST'])
def get_encrypted_text():
    # Grab JSON and args
    data = request.get_json()
    
    # Validate required arg data is there
    try:
        plaintext = data['plaintext']
        key = data['key']['keyValue']
        keyFormat = data['key']['keyFormat']
    except:
        return jsonify({'error': 'Missing JSON data'}), 400
    
    # Validate all data is string
    if type(plaintext) != str and type(key) != str and type(keyFormat) != str:
        return jsonify({'error', 'All required JSON values must be string'})
    
    # Get the key for both formats to byte object
    if keyFormat.lower() == 'utf-8':
        byte_key = key.encode()
    elif keyFormat.lower() == 'base64':
        try:
            byte_key = base64.b64decode(key)
        except:
            return jsonify({'error': 'Improper Base64 key. It is is not formatted correctly.'}), 400
    
    # Validate key length
    if len(byte_key) != 16 and len(byte_key) != 24 and len(byte_key) != 32:
        return jsonify({'error': 'Improper key length'}), 400

    return jsonify({'piratetext': pirAtES(plaintext.encode(), byte_key)}), 200

# POST request for decryption
@app.route('/unpiratify', methods=['POST'])
def get_decrypted_text():
    # Grab JSON and args
    data = request.get_json()

    # Validate required arg data is there
    try:
        piratetext = data['piratetext']
        key = data['key']['keyValue']
        keyFormat = data['key']['keyFormat']
    except:
        return jsonify({'error': 'Missing JSON data'}), 400
    
    # Validate all data is string
    if type(piratetext) != str and type(key) != str and type(keyFormat) != str:
        return jsonify({'error', 'All required JSON values must be string'})
    
    # Get the key for both formats to byte object
    if keyFormat.lower() == 'utf-8':
        byte_key = key.encode()
    elif keyFormat.lower() == 'base64':
        try:
            byte_key = base64.b64decode(key)
        except:
            return jsonify({'error': 'Improper Base64 key. It is is not formatted correctly.'}), 400
    
    # Validate key length
    if len(byte_key) != 16 and len(byte_key) != 24 and len(byte_key) != 32:
        return jsonify({'error': 'Improper key length'}), 400

    # Decrypt with try in case wrong password is used etc.
    try:
        plaintext = unpirAtES(piratetext, byte_key)
    except:
        return (
            jsonify(
                {'error': 'An error ocurred while decrypting. This could indicate improper credentials were used.'}), 
                500)
    
    return jsonify({'plaintext': plaintext}), 200

if __name__ == "__main__":
    app.run(debug=True)