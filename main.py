from flask import Flask, request, jsonify
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

import wordset

app = Flask(__name__)

# Get request example
@app.route("/get-piratified-text/")
def get_encrypted_text():
    plain_text = request.args.get("plaintext")
    key = request.args.get("key")

    return jsonify(__pirAtES__(plain_text, key)), 200

# Function that actually does the encryption/pirate substitution
def __pirAtES__(plain_text, key):
    # Create cipher
    # TODO: Set custom IV since we do not know what default is
    cipher = AES.new(key, AES.MODE_CBC)

    # Encrypt the text
    cipher_text = cipher.encrypt(pad(plain_text, AES.block_size))
    
    return cipher_text

if __name__ == "__main__":
    app.run(debug=True)