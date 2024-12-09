# pirAtE Standard: Additional Substitution Layer for AES Encryption
The basic idea for this project was to add a substitution layer after some form of block cipher encryption had been performed such as AES (hence the name). This is not just any substitution layer, but a pirate substitution layer to abstract it more (and because its funny). AES-128, AES-192, and AES-256 with Electronic Code Book (ECB) and Cipher Block Chaining (CBC) (as provided by the PyCryptodome Python module) are the supported encryption alogrithms and there is custom IV support for CBC. At a high level an S-box of sorts is made from shuffling a pirate wordset psuedorandomly using the same key used to encrypt with AES. The AES encrypted bytes are substituted out for pirate terms using this S-box making it "piratey".
# Local Setup
### Back End
1. After cloning the repository locally, install the needed dependencies by using this command globally (**NOT RECOMMENDED**) or in a Python virtual environment located in the root folder of the repository (**Recommended**)

    ```pip install -r requirements.txt```
2. Next to start the Flask app (the API) simply run ```main.py```. If using a Python virtual environment make sure to run ```main.py``` in the activated environment.

    ```python main.py```
### Front End
1. Go into the React project (```\walktheplank\```) in the repository and run the following npm command to install the needed dependencies.

    ```npm install```
2. After this in the same directory run the following command to start the React app (**WARNING**: Before starting the React app make sure the back end is up and running)

    ```npm start```

# API Documentation
| Endpoint  | Purpose |
| ------------- | ------------- |
| ```POST``` [/piratify](#piratify)  | Returns JSON of provided plaintext in piratetext (encryption) and an IV if used  |
| ```POST``` [/unpiratify](#unpiratify)  | Returns JSON of provided piratetext in plaintext (decryption)  |

## /piratify
This is the call for blah blah blah
### Request Example:
```
{
    "plaintext": "I’m dishonest, and a dishonest man you can always trust to be dishonest. Honestly. It’s the honest ones you want to watch out for, because you can never predict when they’re going to do something incredibly … stupid.",
    "key": {
        "keyValue": "MTIzNDU2NzgxMjM0NTY3ODEyMzQ1Njc4MTIzNDU2Nzg=",
        "keyFormat": "base64"
    },
    "aesMode": "cbc",
    "iv": {
        "ivValue": "MTIzNDU2NzgxMjM0NTY3OA==",
        "ivFormat": "base64"
    }
}
```
### Response Example:
```
{
    "iv": "MTIzNDU2NzgxMjM0NTY3OA==",
    "piratetext": "Sink Lurker Harbormaster Holdfast Watch Anchor Rum-pirate Bilge Deadeye Buoy Shrouds Salty-sea Land-ho! Avast Hold High-seas Sea-Dog Rip Black-Pearl Lanyard Avast Flag Jamboree Billet Christopher-Condent Shipmate Christopher-Condent Blackbeard Foil Calico-Jack Scud High-seas Corsair Doldrums Dead-men-tell-no-tales Picaroon Barque Barnacle Nest Windward Galleon Rover Rigger Rum Swindle Quay Coast Lurker Yawl Sternchaser Dhow Deadeye Briny Spyglass Black-flag Scuttlebutt First-mate Chum Ghost-ship Briny Reef-parrot Shackle Salty-sea Maroon Sink Rip Blackbeard Blackbeard Shrouds Stave Treasure Windjammer Anne-Bonny Shipmate Sea-Dog Galleon Rumrunner Crowbar Bottom Shipmate Sea-serpent Loop Capstan Topmast Yarrrrrrrrrrrrrrrrrrrrrrr First-mate Mast Another-Ship-Of-William-Kidd Tiller Treachery Black-flag Sloop Rigging Sabre Foul-weather Yarr Black-Pearl Jetsam Sloop Quarter Barnacle Ransom Bilge Land-ho! Skallywag Edward-England Avast Sea-spray Harbormaster Christopher-Condent Sea-serpent Dead-men’s-chest Scavenger Rigging Fortune Booty Edward-England Shipmate Sea-spray Tiller Lurker Quarter Weather Swindle Sea-king Queen-Annes-Revenge Loop Lantern Spinnaker Nautical-chart Marooner Cutlass Fathom Sternchaser Jib Yarrrrrrrrrr Deck Windward Tidal-wave Matey Picaroon Another-Ship-Of-William-Kidd Beacon Chainshot Sternchaser Malarkey Sea-serpent Siren Fluke Smuggler Foil Land-ho! Jibboom Skallywag Dancing-Molly Watch Ye Billet Barbados Broadside Parley Ye Sea-king Dead-men-tell-no-tales Ransack Pillage Tonnage Rack Aye Matey Lagoon Siren Rum Cutlass Lootin’ Broadside Rip Breech Trove Grub Plunder Quay Chum Watch Foil Shiver-me-timbers Swashbuckler Christopher-Condent Swab Barnacle-Bill Flagship Bottom Barnacle-Bill Hash Rum Sternchaser Luff Claw Hightide Jamboree Scallywag Swindle Bart-Roberts Deck Sea-chest Lootin’ Scud Windjammer Sabre Yaw Sternchaser Dead-men-tell-no-tales Stowaway Watch Long-Ben Quartermaster Richard-Worley Fortune Whydah Jetsam Ledger Whaler Crate Foul-weather Starboard Man-the-cannons Black-Pearl Calypso Yawl Hoist Topmast Yarr Malarkey Mainsail Scavenger Jetsam Stern Spinnaker Reef-parrot Crowbar"
}
```
## /unpiratify
This is the call for blah blah blah
### Request Example:
```
{
    "piratetext": "Sink Lurker Harbormaster Holdfast Watch Anchor Rum-pirate Bilge Deadeye Buoy Shrouds Salty-sea Land-ho! Avast Hold High-seas Sea-Dog Rip Black-Pearl Lanyard Avast Flag Jamboree Billet Christopher-Condent Shipmate Christopher-Condent Blackbeard Foil Calico-Jack Scud High-seas Corsair Doldrums Dead-men-tell-no-tales Picaroon Barque Barnacle Nest Windward Galleon Rover Rigger Rum Swindle Quay Coast Lurker Yawl Sternchaser Dhow Deadeye Briny Spyglass Black-flag Scuttlebutt First-mate Chum Ghost-ship Briny Reef-parrot Shackle Salty-sea Maroon Sink Rip Blackbeard Blackbeard Shrouds Stave Treasure Windjammer Anne-Bonny Shipmate Sea-Dog Galleon Rumrunner Crowbar Bottom Shipmate Sea-serpent Loop Capstan Topmast Yarrrrrrrrrrrrrrrrrrrrrrr First-mate Mast Another-Ship-Of-William-Kidd Tiller Treachery Black-flag Sloop Rigging Sabre Foul-weather Yarr Black-Pearl Jetsam Sloop Quarter Barnacle Ransom Bilge Land-ho! Skallywag Edward-England Avast Sea-spray Harbormaster Christopher-Condent Sea-serpent Dead-men’s-chest Scavenger Rigging Fortune Booty Edward-England Shipmate Sea-spray Tiller Lurker Quarter Weather Swindle Sea-king Queen-Annes-Revenge Loop Lantern Spinnaker Nautical-chart Marooner Cutlass Fathom Sternchaser Jib Yarrrrrrrrrr Deck Windward Tidal-wave Matey Picaroon Another-Ship-Of-William-Kidd Beacon Chainshot Sternchaser Malarkey Sea-serpent Siren Fluke Smuggler Foil Land-ho! Jibboom Skallywag Dancing-Molly Watch Ye Billet Barbados Broadside Parley Ye Sea-king Dead-men-tell-no-tales Ransack Pillage Tonnage Rack Aye Matey Lagoon Siren Rum Cutlass Lootin’ Broadside Rip Breech Trove Grub Plunder Quay Chum Watch Foil Shiver-me-timbers Swashbuckler Christopher-Condent Swab Barnacle-Bill Flagship Bottom Barnacle-Bill Hash Rum Sternchaser Luff Claw Hightide Jamboree Scallywag Swindle Bart-Roberts Deck Sea-chest Lootin’ Scud Windjammer Sabre Yaw Sternchaser Dead-men-tell-no-tales Stowaway Watch Long-Ben Quartermaster Richard-Worley Fortune Whydah Jetsam Ledger Whaler Crate Foul-weather Starboard Man-the-cannons Black-Pearl Calypso Yawl Hoist Topmast Yarr Malarkey Mainsail Scavenger Jetsam Stern Spinnaker Reef-parrot Crowbar",
    "key": {
        "keyValue": "MTIzNDU2NzgxMjM0NTY3ODEyMzQ1Njc4MTIzNDU2Nzg=",
        "keyFormat": "base64"
    },
    "aesMode": "cbc",
    "iv": {
        "ivValue": "MTIzNDU2NzgxMjM0NTY3OA==",
        "ivFormat": "base64"
    }
}
```
### Response Example:
```
{
    "plaintext": "I’m dishonest, and a dishonest man you can always trust to be dishonest. Honestly. It’s the honest ones you want to watch out for, because you can never predict when they’re going to do something incredibly … stupid."
}
```
<br>
<div align="center">
<pre>                                                
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⠀⠀⢀⣠⣤⣶⣶⣶⣶⣶⣶⣶⣦⣤⣀⠀⠀⠀⠀⠀⢀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⡔⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢟⣫⣯⣷⣾⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣷⡙⢿⣿⣿⣿⣿⣿⣿⡿⢋⣵⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣙⠿⠿⠿⢟⣫⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⢹⣿⣿⣿⣿⣿⣿⣿⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢸⣿⣿⣿⡏⠉⠙⢿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⣿⡿⡍⠳⣄⡀⢀⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢿⣿⢿⡄⠸⡿⢄⠛⣘⢠⣼⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀
⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡞⣼⡻⡄⠳⡤⠽⠾⠿⠿⠿⢛⣻⣿⣿⣿⣷⡀⠀⠀⠀
⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣄⠙⢶⣶⣶⣶⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀
⠀⠀⠀⠀⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠛⠉⢉⣁⣀⣀⣀⣀⣀⣉⡉⠙⠛⠻⢿⣿⣿⣿⣿⣿⣯⣻⣍⡲⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀
⠀⢀⡀⣶⣤⣌⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⣁⣤⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣤⣈⠛⢿⣿⣿⣿⣿⣿⣷⣾⣿⣿⣿⣿⣿⡿⠟⠛⠛⠁⠀⠀
⣰⣿⣿⣿⣿⣿⣿⣿⣝⢿⣿⣿⣿⣿⣿⣿⣟⣡⣶⠿⢛⣛⣉⣭⣭⣤⣤⡴⠶⠶⠶⠶⢲⣴⣤⠭⠭⡭⣟⠻⠦⣝⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⢉⣀⣠⣶⣿⣆⠀⠀
⠹⣿⣿⣿⣿⣿⣿⣙⠻⣿⣮⣛⠿⣿⣿⣿⣫⣵⡶⠟⣛⣋⣭⣭⣶⣶⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣾⣮⣽⣿⣿⣿⠿⠟⠛⠉⢀⣴⣿⣿⣿⣿⣿⣿⣶⡀
⠀⠈⠙⠋⠁⠀⠈⠉⠛⠳⣭⣛⢷⣦⣸⣿⣯⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⣿⠀⠀⠀⣀⣴⣾⣿⣿⣿⣿⡟⣿⣿⣿⣿⡇
⠀⠀⠀⠀⠀⠀⢀⣠⣾⣿⣿⠿⠿⢿⣹⣿⣧⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢸⡏⣀⣴⣾⣿⣿⠿⠛⠉⠀⠀⠀⠈⠛⠛⠉⠀
⠀⠀⠀⠀⢀⣴⠿⠛⠋⠁⠀⠀⠀⢀⣯⢿⣿⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⣿⠣⣟⡻⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⢀⣀⣴⣾⣿⠈⡿⣿⠃⠀⠀⠀⠈⠉⠛⠻⠿⣿⣿⣿⣿⣿⠿⠛⠉⠉⠀⠈⠉⠛⣿⣽⡟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣠⣤⣶⣾⣿⣿⣿⣿⣿⣀⣼⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⣹⡟⣻⣿⡃⠀⠀⠀⠀⠀⠀⠀⠀⢹⣷⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⡿⢹⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⣰⣿⢣⡇⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠟⠋⠙⠛⠻⣿⣿⣿⣿⣿⠏⠀⠈⢿⣿⣿⣿⣦⣄⣀⣀⣀⣠⣴⣿⣏⡞⢻⣸⣿⣷⣄⠀⠀⣀⣤⠴⣾⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⠃⠀⠀⠀⠈⢿⣿⣵⣾⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣶⠾⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣏⠀⠀⠀⠀⠀⣀⣼⣿⡛⢿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⠟⣡⣾⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠀⠀⢠⣶⣿⣿⣯⣿⡇⠀⢹⣿⣿⣿⣿⣷⣤⣤⣦⣶⣿⣿⣿⣿⣿⡇⠀⣿⣿⢸⣿⣶⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣄⣠⣴⣾⣿⣟⣿⠟⠁⣿⡇⠀⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⡇⢀⣿⣿⠙⢮⣛⠿⣷⣦⣄⣀⣀⣀⣠⣀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣴⣶⣶⣾⣿⣿⡿⣛⣽⠞⠋⠀⠀⠀⣿⣷⠀⣍⠇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠉⡄⣸⣿⡿⠀⠀⠈⠙⠮⣟⠿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣹⣿⣿⣿⢵⡿⠋⠀⠀⠀⠀⠀⠀⢿⣿⣦⣿⡷⣄⠙⠿⣿⢹⣿⣿⢼⡿⠋⣡⣶⣳⣿⣿⣿⠃⠀⠀⠀⠀⠀⠈⠿⠬⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠸⣿⣿⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⣷⣻⢿⣶⣬⣈⣉⣉⣤⣴⣿⣻⣾⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⡿⠇⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠙⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⡇⣿⣇⣿⢹⣿⣿⣿⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⡿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⡁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                  _       ___  _   _____ _____              
                 (_)     / _ \| | |  ___/  ___|             
            _ __  _ _ __/ /_\ \ |_| |__ \ `--.              
           | '_ \| | '__|  _  | __|  __| `--. \             
           | |_) | | |  | | | | |_| |___/\__/ /             
           | .__/|_|_|  \_| |_/\__\____/\____/              
           | |                                              
           |_|                                              
</pre>
</div>
