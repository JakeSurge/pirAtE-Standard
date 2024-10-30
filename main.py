from flask import Flask, request, jsonify
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
    
    
    return "piratified_text"

if __name__ == "__main__":
    app.run(debug=True)