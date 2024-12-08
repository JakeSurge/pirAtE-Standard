import axios from 'axios';

const url = "http://127.0.0.1:5000/";

export async function piratify(
  plainText: string,
  key: string,
  aesMode: string,
  iv: string
): Promise<string> {
  try {
    const requestBody = {
      plaintext: plainText,
      key: key,
      aes_mode: aesMode,
      iv: iv || undefined,
    };
    console.log("Request body:", requestBody);

    const response = await axios.post(`${url}piratify`, requestBody);
    const { piratetext } = response.data;
    return piratetext;
  } catch (error) {
    console.error("You don broken the pratification!:", error);
    throw new Error("Arrrr! Woe, it be to the depths with ye!");
  }
}

export async function unpiratify(
  cipherText: string,
  key: string,
  aesMode: string,
  iv: string
): Promise<string> {
  try {
    const response = await axios.post(`${url}unpiratify`, {
      ciphertext: cipherText,
      key: key,
      aes_mode: aesMode,
      iv: iv,
    });
    const { plaintext } = response.data;
    return plaintext;
  } catch (error) {
    console.error("Captain, unpiratification failed!", error);
    throw new Error("What's this? Ye failed unpiratifying me riddle me boy!");
  }
}
