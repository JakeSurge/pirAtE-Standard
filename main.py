from flask import Flask, request, jsonify, abort
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
    plaintext, key, aes_mode, iv = __validate_and_format_data__(data, 'plaintext')

    # Piratify the plaintext
    piratetext, iv_used = pirAtES(plaintext.encode(), key, aes_mode, iv)

    # Return piratetext and IV in Base64 so it is guaranteed to work
    return jsonify({'piratetext': piratetext, 'iv': base64.b64encode(iv_used).decode()}), 200

# POST request for decryption
@app.route('/unpiratify', methods=['POST'])
def get_decrypted_text():
    # Grab JSON and args
    data = request.get_json()

    # Validate and encode data
    piratetext, key, aes_mode, iv = __validate_and_format_data__(data, 'piratetext')

    # Set IV to value if not set to anything
    if iv == None:
        iv = b'0000000000000000'

    # Decrypt with try in case wrong password is used etc.
    try:
        plaintext = unpirAtES(piratetext, key, aes_mode, iv)
    except:
        abort(
            500,
            'An error occurred while decrypting. Improper credentials or piratetext were most likely used.'
            )
    
    return jsonify({'plaintext': plaintext}), 200

# Function for validating and formatting JSON data sent for POST requests
def __validate_and_format_data__(data, text_key):
    # Validate required arg data is there
    try:
        text = data[text_key]
        aes_mode = data['aesMode']
        key = data['key']['keyValue']
        keyFormat = data['key']['keyFormat']
    except:
        abort(400, 'Missing JSON data')
    
    # Validate all required data is string
    if type(text) != str or type(aes_mode) != str or type(key) != str or type(keyFormat) != str:
        abort(400, 'Text, mode, and key JSON values must be string')
    
    # Validate AES mode and return value accordingly
    if aes_mode.lower() == 'ecb':
        aes_mode_num = 1
    elif aes_mode.lower() == 'cbc':
        aes_mode_num = 2
    else:
        abort(400, "Improper AES mode specified. Use ECB or CBC")

    # Get the key to byte object
    byte_key = __value_to_byte__(keyFormat, key)
    
    # Validate key length
    if len(byte_key) != 16 and len(byte_key) != 24 and len(byte_key) != 32:
        abort(400, 'Improper key length. Must be 16, 24, or 32 bytes long')
    
    # Now check for optional IV data
    try:
        iv = data['iv']['ivValue']
        ivFormat = data['iv']['ivFormat']
    except:
        app.logger.info('Missing IV data will use default value instead')
        byte_iv = None
    else:
        # Verify data type
        if type(iv) != str or type(ivFormat) != str:
            abort(400, 'IV JSON values must be string')
        
        # Get the IV to byte object
        byte_iv = __value_to_byte__(ivFormat, iv)
        
        # Validate the IV length
        if len(byte_iv) != 16:
            abort(400, 'Improper IV length. Must be 16 bytes long')

    # Return validated data
    return text, byte_key, aes_mode_num, byte_iv

# Function for taking JSON values and converting to byte object with given format
def __value_to_byte__(format, value):
    # Get the value for both formats to byte object
        if format.lower() == 'utf-8':
            byte_value = value.encode()
        elif format.lower() == 'base64':
            try:
                byte_value = base64.b64decode(value)
            except:
                abort(400, 'Improper Base64 value. It is is not formatted correctly.')
        else:
            abort(400, 'Improper format specified. Use Base64 or UTF-8')
        
        return byte_value


if __name__ == "__main__":
    app.run()