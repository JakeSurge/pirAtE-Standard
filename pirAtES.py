from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import hashlib
import random

from wordset import PIRATE_TERMS

# Standard IV to use
DEFAULT_IV = b'0000000000000000'

# Function that does the encryption/pirate substitution
def pirAtES(plain_text, key):
    # Encode args so they play well with C
    byte_plain_text = plain_text.encode()
    byte_key = key.encode()
    
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
    return piratified_text

# Function that undoes pirate substitution/decrypts
def unpirAtES(pirate_text, key):
    # Encode key so it plays well with C
    byte_key = key.encode()
    
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

    return plain_text.decode()

def __substitute_pirate__(cipher_text, substitution_dict):
    # Loop through the cipher_text creating a new string object for the pirate version
    pirate_text = ''
    for byte in cipher_text:
        pirate_text += ' ' + substitution_dict[byte]
    
    # Return pirate version
    return pirate_text

def __unsubstitute_pirate__(pirate_text, unsubstitution_dict):
    # Loop through the splitted pirate_text and get it back to cipher_text
    cipher_text = b''
    for pirate_term in pirate_text.split():
        cipher_text += unsubstitution_dict[pirate_term].to_bytes()
    
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
    # Generate list of number 0 - 255
    # NOTE: Do note need to convert this to byte data type since iterating through
    # a byte object turns the individual bytes to integers
    possible_bytes = []
    for num in range(256):
        possible_bytes.append(num)

    return possible_bytes