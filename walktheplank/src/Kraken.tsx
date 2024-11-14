import axios from 'axios';

const url = 'http://localhost:5000/'
let key = '123456DOG1011129'

export async function piratify(plainText: string): Promise<string>{
    try {
        const response = await axios.post(`${url}piratify`,{
                plaintext: plainText,
                key: key
            }
        );
        let myJSON = JSON.stringify(response);
        let obj = JSON.parse(myJSON)
        return obj.data.plaintext
    }
    catch(error) {
        console.error('You don broken the pratification!:', error);
        throw new Error('Arrrr! Woe, it be to the depths with ye!');
    }
}

export async function unpiratify(cipherText: string): Promise<string>{
    try {
        const response = await axios.post(`${url}unpiratify`, {
            ciphertext: cipherText,
            key: key
        });
        let myJSON = JSON.stringify(response);
        let obj = JSON.parse(myJSON)
        return obj.data.ciphertext
    }
    catch(error) {
        console.error('Captain, unpiratification failed!', error);
        throw new Error("What's this? Ye failed unpiratifying me riddle me boy!");
    }
}
