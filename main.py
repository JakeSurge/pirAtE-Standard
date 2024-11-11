from flask import Flask, request, jsonify, abort
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import json
import hashlib
import random

from wordset import PIRATE_TERMS

app = Flask(__name__)

# Standard IV to use
DEFAULT_IV = b'0000000000000000'

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

    return __pirAtES__(plain_text, key)

# Function that does the encryption/pirate substitution
def __pirAtES__(plain_text, key):
    # Encode args so they play well with C
    byte_plain_text = plain_text.encode('utf-8')
    byte_key = key.encode('utf-8')
    
    # Create cipher
    cipher = AES.new(byte_key, AES.MODE_CBC, DEFAULT_IV)

    # Encrypt the text
    cipher_text = cipher.encrypt(pad(byte_plain_text, AES.block_size))

    # Hash the key used for pirate substitution
    hashed_key = hashlib.sha256(byte_key).digest()

    # Generate substitution map
    substitution_dict = __generate_substitution_dict__(hashed_key)

    # Substitute
    piratified_text = __substitute_pirate__(cipher_text, substitution_dict)

    # Return pirate version - no need for encoding since it goes to string
    return jsonify(piratified_text, 200)

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

    return __undo_pirAtES__(cipher_text, key)

# Function that undoes pirate substitution/decrypts
def __undo_pirAtES__(pirate_text, key):
    # Encode key so it plays well with C
    byte_key = key.encode('utf-8')
    
    # Hash the key for unsubstituting
    hashed_key = hashlib.sha256(byte_key).digest()
    
    # Generate unsubstitution map
    unsubstitution_dict = __generate_unsubstitution_dict__(hashed_key)

    # Get the pirate_text to cipher_text to decrypt
    cipher_text = __unsubstitute_pirate__(pirate_text, unsubstitution_dict)

    # Create cipher
    cipher = AES.new(byte_key, AES.MODE_CBC, DEFAULT_IV)

    # Decrypt the text
    plain_text = unpad(cipher.decrypt(cipher_text), AES.block_size)

    return jsonify(plain_text.decode('utf-8'), 200)

def __substitute_pirate__(cipher_text, substitution_dict):
    # Loop through the cipher_text creating a new string object for the pirate version
    pirate_text = ''
    for byte in cipher_text:
        pirate_text += ' ' + substitution_dict[bin(byte)]
    
    # Return pirate version
    return pirate_text

def __unsubstitute_pirate__(pirate_text, unsubstitution_dict):
    # Loop through the splitted pirate_text and get it back to cipher_text
    cipher_text = b''
    for pirate_term in pirate_text.split():
        cipher_text += bytes(int(unsubstitution_dict[pirate_term], 2))
    
    # Return cipher version
    return cipher_text

# Helper functions for pirate substitution
def __generate_substitution_dict__(hashed_key):
    # Shuffle the wordset based off the hashed key
    shuffled_pirate_terms = random.Random(hashed_key).sample(PIRATE_TERMS, len(PIRATE_TERMS))
    
    # Create a substitution dict with bytes and now shuffled pirate_terms
    substitution_dict = dict(zip(__generate_possible_bytes__(), shuffled_pirate_terms))

    return substitution_dict

def __generate_unsubstitution_dict__(hashed_key):
    # Shuffle the wordset based off the hashed key
    shuffled_pirate_terms = random.Random(hashed_key).sample(PIRATE_TERMS, len(PIRATE_TERMS))
    
    # Create a unsubstitution dict (for reversing it) with bytes and now shuffled pirate_terms
    substitution_dict = dict(zip(shuffled_pirate_terms, __generate_possible_bytes__()))

    return substitution_dict

def __generate_possible_bytes__():
    # For number 0 - 255 convert to byte therefore covering every byte possible
    possible_bytes = []
    for num in range(256):
        possible_bytes.append(bin(num))

    return possible_bytes

if __name__ == "__main__":
    app.run(debug=True)