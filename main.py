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

    # Validate and encode data
    args = __validate_and_format_data__(data, 'plaintext')

    # If there was an error than return that
    if type(args[1]) == int:
        return args
    
    # Grab formatted data
    iv = None
    if len(args) == 2:
        plaintext, key = args
    else:
        plaintext, key, iv = args

    return jsonify({'piratetext': pirAtES(plaintext.encode(), key, iv)}), 200

# POST request for decryption
@app.route('/unpiratify', methods=['POST'])
def get_decrypted_text():
    # Grab JSON and args
    data = request.get_json()

    # Validate and encode data
    args = __validate_and_format_data__(data, 'piratetext')

    # If there was an error than return that
    if type(args[1]) == int:
        return args
    
    # Grab formatted data
    iv = None
    if len(args) == 2:
        piratetext, key = args
    else:
        piratetext, key, iv = args


    # Decrypt with try in case wrong password is used etc.
    try:
        plaintext = unpirAtES(piratetext, key, iv)
    except:
        return (
            jsonify(
                {'error': 'An error occurred while decrypting. Improper credentials or piratetext were most likely used.'}), 
                500)
    
    return jsonify({'plaintext': plaintext}), 200

# Function for validating and formatting JSON data sent for POST requests
def __validate_and_format_data__(data, text_key):
    # Validate required arg data is there
    try:
        text = data[text_key]
        key = data['key']['keyValue']
        keyFormat = data['key']['keyFormat']
    except:
        return jsonify({'error': 'Missing JSON data'}), 400
    
    # Validate all required data is string
    if type(text) != str and type(key) != str and type(keyFormat) != str:
        return jsonify({'error', 'All required JSON values must be string'}), 400
    
    # Get the key for both formats to byte object
    if keyFormat.lower() == 'utf-8':
        byte_key = key.encode()
    elif keyFormat.lower() == 'base64':
        try:
            byte_key = base64.b64decode(key)
        except:
            return jsonify({'error': 'Improper Base64 key. It is is not formatted correctly'}), 400
    else:
        return jsonify({'error': 'Improper keyFormat specified. Use Base64 or UTF-8'}), 400
    
    # Validate key length
    if len(byte_key) != 16 and len(byte_key) != 24 and len(byte_key) != 32:
        return jsonify({'error': 'Improper key length. Must be 16, 24, or 32 bytes long'}), 400
    
    # Now check for optional IV data
    try:
        iv = data['iv']['ivValue']
        ivFormat = data['iv']['ivFormat']
    except:
        print('No IV data given will use default IV value')
    else:
        # Verify data type
        if type(iv) != str and type(ivFormat) != str:
            return jsonify({'error': 'IV data must be string'}), 400
        
        # Get the key for both formats to byte object
        if ivFormat.lower() == 'utf-8':
            byte_iv = iv.encode()
        elif ivFormat.lower() == 'base64':
            try:
                byte_iv = base64.b64decode(iv)
            except:
                return jsonify({'error': 'Improper Base64 key. It is is not formatted correctly.'}), 400
        else:
            return jsonify({'error': 'Improper ivFormat specified. Use Base64 or UTF-8'}), 400
        
        # Validate the IV length
        if len(byte_iv) != 16:
            return jsonify({'error': 'Improper IV length. Must be 16 bytes long'}), 400
        
        # Return with iv
        return text, byte_key, byte_iv

    # Return validated data
    return text, byte_key


if __name__ == "__main__":
    app.run(debug=True)