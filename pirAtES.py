from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import random

from wordset import PIRATE_TERMS

# Standard IV to use
DEFAULT_IV = b'0000000000000000'

# Function that does the encryption/pirate substitution
def pirAtES(plaintext, key):
    # Create cipher
    cipher = AES.new(key, AES.MODE_CBC, DEFAULT_IV)

    # Encrypt the text
    ciphertext = cipher.encrypt(pad(plaintext, AES.block_size))

    # Generate substitution map
    substitution_dict = __generate_substitution_array__(key)

    # Substitute
    piratified_text = __substitute_pirate__(ciphertext, substitution_dict)

    # Return pirate version - no need for encoding since it goes to string
    return piratified_text

# Function that undoes pirate substitution/decrypts
def unpirAtES(piratetext, key):
    # Generate unsubstitution map
    unsubstitution_dict = __generate_unsubstitution_dict__(key)

    # Get the piratetext to ciphertext to decrypt
    ciphertext = __unsubstitute_pirate__(piratetext, unsubstitution_dict)

    # Create cipher
    cipher = AES.new(key, AES.MODE_CBC, DEFAULT_IV)

    # Decrypt the text
    plaintext = unpad(cipher.decrypt(ciphertext), AES.block_size)

    return plaintext.decode()

def __substitute_pirate__(ciphertext, substitution_dict):
    # Loop through the ciphertext creating a new string object for the pirate version
    piratetext = ''
    for byte in ciphertext:
        piratetext += ' ' + substitution_dict[byte]
    
    # For a better look get rid of first space
    piratetext = piratetext[1:]
    
    return piratetext

def __unsubstitute_pirate__(piratetext, unsubstitution_dict):
    # Loop through the splitted piratetext and get it back to ciphertext
    ciphertext = b''
    for pirate_term in piratetext.split():
        ciphertext += unsubstitution_dict[pirate_term].to_bytes()
    
    return ciphertext

# Helper functions for pirate substitution
def __generate_substitution_array__(key):
    # Shuffle the wordset based off the hashed key and return it
    # NOTE: Since we are using int 0 - 255 to select our term we can just use an array index
    # instead of a dictionary key
    shuffled_pirate_terms = random.Random(key).sample(PIRATE_TERMS, len(PIRATE_TERMS))

    return shuffled_pirate_terms

def __generate_unsubstitution_dict__(key):
    # Shuffle the wordset based off the hashed key
    shuffled_pirate_terms = random.Random(key).sample(PIRATE_TERMS, len(PIRATE_TERMS))
    
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