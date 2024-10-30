from flask import Flask, request, jsonify
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad

import wordset

app = Flask(__name__)

# Get request for encryption
@app.route("/get-piratified-text/")
def get_encrypted_text():
    plain_text = request.args.get("plaintext")
    key = request.args.get("key")

    return __pirAtES__(plain_text, key)

# Function that does the encryption/pirate substitution
def __pirAtES__(plain_text, key):
    # Encode args so they play well with C
    byte_plain_text = bytes(plain_text, "utf-8")
    byte_key = bytes(key, "utf-8")
    
    # Create cipher
    cipher = AES.new(byte_key, AES.MODE_CBC, b"0000000000000000")

    # Encrypt the text
    cipher_text = cipher.encrypt(pad(byte_plain_text, AES.block_size))
    
    return cipher_text, 200

# Get request for decryption
@app.route("/get-plain-text/")
def get_decrypted_text():
    cipher_text = request.args.get("ciphertext")
    key = request.args.get("key")

    return __undo_pirAtES__(cipher_text, key)

# Function that undoes pirate substitution/decrypts
def __undo_pirAtES__(cipher_text, key):
    # Encode args so they play well with C
    byte_cipher_text = bytes(cipher_text, "utf-8")
    byte_key = bytes(key, "utf-8")

    # Create cipher
    cipher = AES.new(byte_key, AES.MODE_CBC, b"0000000000000000")

    # Decrypt the text
    plain_text = unpad(cipher.decrypt(bytearray(cipher_text)), AES.block_size)

    return plain_text, 200


if __name__ == "__main__":
    app.run(debug=True)