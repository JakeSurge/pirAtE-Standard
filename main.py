from flask import Flask, request, jsonify, abort
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import json
import base64
import itertools
import hashlib

import wordset

app = Flask(__name__)

# Standard IV to use
DEFAULT_IV = b"0000000000000000"

# POST request for encryption
@app.route("/get-piratified-text/", methods=["POST"])
def get_encrypted_text():
    # Grab JSON and args
    try:
        data = request.get_json()
    except json.JSONDecodeError:
        return jsonify({'error': 'Invalid JSON format'}), 400
    
    plain_text = data.get("plaintext")
    key = data.get("key")

    # Validate data is not null
    if plain_text is None or key is None:
        return jsonify({'error': 'Missing JSON data'}), 400

    return __pirAtES__(plain_text, key)

# Function that does the encryption/pirate substitution
def __pirAtES__(plain_text, key):
    # Encode args so they play well with C
    byte_plain_text = plain_text.encode("utf-8")
    byte_key = key.encode("utf-8")
    
    # Create cipher
    cipher = AES.new(byte_key, AES.MODE_CBC, DEFAULT_IV)

    # Encrypt the text
    cipher_text = cipher.encrypt(pad(byte_plain_text, AES.block_size))

    # Hash the key used for pirate substitution
    hashed_key = hashlib.sha256(byte_key).hexdigest()

    # TODO: Add the actual substitution part of it
    # Generate substitution map
    pirate_dict = __generate_substitution_dict__(hashed_key)
    print(pirate_dict)

    # Make sure to decode to base256 so it translates well when copied
    return jsonify(base64.b64encode(cipher_text).decode("utf-8"), 200)

# POST request for decryption
@app.route("/get-plain-text/", methods=["POST"])
def get_decrypted_text():
    # Grab JSON and args
    try:
        data = request.json
    except json.JSONDecodeError:
        return jsonify({'error': 'Invalid JSON format'}), 400

    cipher_text = data.get("ciphertext")
    key = data.get("key")

    # Validate data is not null
    if cipher_text is None or key is None:
        return jsonify({'error': 'Missing JSON data'}), 400

    return __undo_pirAtES__(cipher_text, key)

# Function that undoes pirate substitution/decrypts
def __undo_pirAtES__(cipher_text, key):
    # Encode args so they play well with C
    byte_cipher_text = base64.b64decode(cipher_text)
    byte_key = key.encode("utf-8")

    # Create cipher
    cipher = AES.new(byte_key, AES.MODE_CBC, DEFAULT_IV)

    # Decrypt the text
    plain_text = unpad(cipher.decrypt(byte_cipher_text), AES.block_size)

    return jsonify(plain_text.decode("utf-8"), 200)

# Helper functions for pirate substitution
def __generate_possible_bytes__():
    # Use itertools to efficiently generate list of all possible bytes
    possible_bytes = itertools.product([0, 1], repeat=8)

    return possible_bytes

def __generate_substitution_dict__(hashed_key):
    #TODO: Get this actually randomized, for now get it operational without randomizing by hashed key
    # Create a substitution dict with bytes and pirate_terms
    substitution_dict = dict(zip(__generate_possible_bytes__(), wordset.pirate_terms))

    return substitution_dict

if __name__ == "__main__":
    app.run(debug=True)