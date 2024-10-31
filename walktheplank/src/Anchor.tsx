import "./index.css";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

export type BlackPearlProps = {
  image: string;
  input?: string;
  buttonText: string;
  InputPlaceholder: string;
};

export const Anchor = ({
  image,
  buttonText,
  InputPlaceholder,
}: BlackPearlProps) => {
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
          onClick={() => console.log("Button clicked")}
          className="mt-6 w-full px-4 py-2  text-white  transition duration-200"
          variant="outlined"
          sx={{
            backgroundColor: "#ff7043", // Deep orange for button
            color: "#fff",
            "&:hover": {
              backgroundColor: "#ff5722", // Slightly darker orange on hover
            },
          }}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
