import "./index.css";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import { useState } from "react";

export type ButtonType = "encrypt" | "decrypt";

export type BlackPearlProps = {
  image: string;
  input?: string;
  buttonText: string;
  InputPlaceholder: string;
  buttonType: ButtonType;
};

export const Anchor = ({
  image,
  buttonText,
  InputPlaceholder,
  buttonType,
}: BlackPearlProps) => {
  const [outputVisible, setOutputVisible] = useState(false);
  const [outputText, setOutputText] = useState("");

  const toggleLabel = () => {
    if (outputVisible) {
      setOutputText("");
    } else {
      if (buttonType === "encrypt") {
        setOutputText("This is supposed to be encrypted text");
      } else {
        setOutputText("This is supposed to be decrypted text");
      }
    }
    setOutputVisible(!outputVisible);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(outputText)
      .then(() => {
        // You can add a notification here if you want to inform the user that the text has been copied
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md flex flex-col items-center space-y-6">
        <img
          src={image}
          alt="This was supposed to be a cool lego pirate"
          className="w-64 h-auto object-cover"
        />

        <TextField
          id="filled-basic"
          label={InputPlaceholder}
          variant="filled"
          className="w-full mb-4 "
          sx={{
            backgroundColor: "#e0e0e0", // Light grey
            "& .MuiFilledInput-root": {
              color: "#37474f", // Darker color for text
            },
            "& .MuiInputLabel-root": {
              color: "#37474f", // Darker color for label
            },
          }}
        />
        <Button
          onClick={toggleLabel}
          className="mt-6 w-full px-4 py-2  text-white  transition duration-200"
          variant="outlined"
          sx={{
            backgroundColor: "#ff7043",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#ff5722",
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
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{
                backgroundColor: "#e0e0e0", // Light grey
                "& .MuiFilledInput-root": {
                  color: "#37474f", // Darker color for text
                },
                "& .MuiInputLabel-root": {
                  color: "#37474f", // Darker color for label
                },
              }}
            />
            <Button
              onClick={copyToClipboard}
              className="mt-2 w-full px-4 py-2 text-white transition duration-200"
              variant="outlined"
              sx={{
                backgroundColor: "#4caf50", // Green color
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#45a049", // Darker green on hover
                },
              }}
            >
              Copy to Clipboard
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
