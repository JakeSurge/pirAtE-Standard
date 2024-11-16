from flask import Flask, request, jsonify
from flask_cors import CORS

from pirAtES import pirAtES, unpirAtES

app = Flask(__name__)
CORS(app)

# POST request for encryption
@app.route('/piratify', methods=['POST'])
def get_encrypted_text():
    # Grab JSON and args
    data = request.get_json()
    
    plain_text = data.get('plaintext')
    key = data.get('key')

    # Validate data is not null
    if plain_text is None or key is None:
        return jsonify({'error': 'Missing JSON data'}), 400
    # Validate key length
    elif len(key) != 16 and len(key) != 24 and len(key) != 32:
        return jsonify({'error': 'Improper key length only 16, 24, and 32 characters are supported'}), 400

    return jsonify({'piratetext': pirAtES(plain_text, key)}), 200

# POST request for decryption
@app.route('/unpiratify', methods=['POST'])
def get_decrypted_text():
    # Grab JSON and args
    data = request.get_json()

    cipher_text = data.get('ciphertext')
    key = data.get('key')

    # Validate data is not null
    if cipher_text is None or key is None:
        return jsonify({'error': 'Missing JSON data'}), 400
    # Validate key length
    elif len(key) != 16 and len(key) != 24 and len(key) != 32:
        return jsonify({'error': 'Improper key length only 16, 24, and 32 characters are supported'}), 400

    # Decrypt with try in case wrong password is used etc.
    try:
        plain_text = unpirAtES(cipher_text, key)
    except:
        return (
            jsonify(
                {'error': 'An error ocurred while decrypting. This could indicate improper credentials were used.'}), 
                500)
    
    return jsonify({'plaintext': plain_text}), 200

if __name__ == "__main__":
    app.run(debug=True)