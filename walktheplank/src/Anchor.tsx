import "./index.css";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useState } from "react";
import { piratify, unpiratify } from "./Kraken";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

export type ButtonType = "encrypt" | "decrypt";

export type BlackPearlProps = {
  image: string;
  input?: string;
  buttonText: string;
  buttonType: ButtonType;
  InputPlaceholder: string;
  KeyInputPlaceholder: string;
  isSerious: boolean;
};

export const Anchor = ({
  image,
  buttonText,
  buttonType,
  InputPlaceholder,
  KeyInputPlaceholder,
  isSerious,
}: BlackPearlProps) => {
  const [outputVisible, setOutputVisible] = useState(false);
  const [outputText, setOutputText] = useState("");
  const [inputText, setInputText] = useState("");
  const [keyInput, setKeyInput] = useState("");

  const translateToOrFromPirate = async (
    inputText: string,
    keyInput: string,
    buttonType: ButtonType
  ) => {
    if (outputVisible) {
      setOutputText("");
    } else {
      if (buttonType === "encrypt") {
        setOutputText(await piratify(inputText, keyInput));
      } else {
        setOutputText(await unpiratify(inputText, keyInput));
      }
    }
    setOutputVisible(!outputVisible);
  };

  const copyToClipboard = (textToCopy: string) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // You can add a notification here if you want to inform the user that the text has been copied
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const isValidLength = (text: string): boolean => {
    const validLengths = [16, 24, 32];
    return validLengths.includes(text.length);
  };

  const buttonColor = isSerious ? "#f5f5f5" : "#4caf50";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md flex flex-col items-center space-y-6">
        <img
          src={image}
          alt="This was supposed to be a cool lego pirate or a serious pirate"
          className="w-64 h-auto object-cover"
        />

        <TextField
          id="filled-basic"
          label={InputPlaceholder}
          variant="filled"
          className="w-full mb-4 "
          value={inputText}
          multiline
          onChange={(e) => setInputText(e.target.value)}
          sx={{
            backgroundColor: "#e0e0e0",
            "& .MuiFilledInput-root": {
              color: "#37474f",
            },
            "& .MuiInputLabel-root": {
              color: "#37474f",
            },
          }}
        />

        <TextField
          id="filled-basic"
          label={KeyInputPlaceholder}
          variant="filled"
          className="w-full mb-4 "
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          error={keyInput.length > 0 && !isValidLength(keyInput)}
          helperText={
            keyInput.length > 0 && !isValidLength(keyInput)
              ? "Text must be 16, 24, or 32 characters long"
              : ""
          }
          sx={{
            backgroundColor: "#e0e0e0",
            "& .MuiFilledInput-root": {
              color: "#37474f",
            },
            "& .MuiInputLabel-root": {
              color: "#37474f",
            },
          }}
        />

        <Button
          onClick={() =>
            translateToOrFromPirate(inputText, keyInput, buttonType)
          }
          className="mt-6  px-4 py-2  text-white  transition duration-200"
          variant="outlined"
          disabled={!isValidLength(keyInput)}
          startIcon={buttonType === "encrypt" ? <LockIcon /> : <LockOpenIcon />}
          sx={{
            backgroundColor: buttonColor,
            color: isSerious ? "#000" : "#fff",
            "&:hover": {
              backgroundColor: isSerious ? "#e0e0e0" : "#45a049",
            },
          }}
        >
          {buttonText}
        </Button>
        {outputVisible && (
          <>
            <TextField
              id="filled-basic"
              label="Output"
              value={outputText}
              variant="filled"
              className="w-full mb-4"
              multiline
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{
                backgroundColor: "#e0e0e0",
                "& .MuiFilledInput-root": {
                  color: "#37474f",
                },
                "& .MuiInputLabel-root": {
                  color: "#37474f",
                },
              }}
            />
            <div className="flex space-x-3">
              <Button
                onClick={() => copyToClipboard(outputText)}
                className="mt-2  px-4 py-2 text-white transition duration-200"
                variant="outlined"
                startIcon={<ContentCopyIcon />}
                sx={{
                  backgroundColor: buttonColor,
                  color: isSerious ? "#000" : "#fff",
                  "&:hover": {
                    backgroundColor: isSerious ? "#e0e0e0" : "#45a049",
                  },
                }}
              >
                Copy Output
              </Button>
              <Button
                onClick={() => copyToClipboard(keyInput)}
                startIcon={<ContentCopyIcon />}
                className="mt-2 px-4 py-2 text-white transition duration-200"
                variant="outlined"
                sx={{
                  backgroundColor: buttonColor,
                  color: isSerious ? "#000" : "#fff",
                  "&:hover": {
                    backgroundColor: isSerious ? "#e0e0e0" : "#45a049",
                  },
                }}
              >
                Copy Key
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
