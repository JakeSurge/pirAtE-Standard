import React from "react";
import "./index.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Anchor } from "./Anchor";
import piratebg from "./piratebg.jpeg";
import pirateman from "./pirateman.jpg";
import seriouspirate from "./seriouspirate.jpg";
import redbeardparrot from "./redbeardparrot.jpg";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export type StyleType = "Serious" | "Silly";

export type BlackPearlProps = {
  initialStyle?: StyleType;
};

export const BlackPearl = ({ initialStyle = "Serious" }: BlackPearlProps) => {
  const [value, setValue] = React.useState(0);
  const [style, setStyle] = React.useState<StyleType>(initialStyle);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleStyleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStyle(event.target.checked ? "Serious" : "Silly");
  };

  const blackPearlStyle =
    style === "Silly"
      ? {
          backgroundImage: `url(${piratebg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }
      : {
          backgroundColor: "rgb(18,18,18)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        };

  return (
    <div style={blackPearlStyle}>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            position: "relative",
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
            backgroundColor: style === "Silly" ? "#4caf50" : "#27272a",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
            sx={{
              "& .MuiFilledInput-root": {
                color: style === "Silly" ? "#ff7043" : "#eb5b35",
              },
              "& .MuiInputLabel-root": {
                color: style === "Silly" ? "white" : "#eb5b35",
              },
              "& .MuiTab-root": {
                color: "white", // Set tab label text color to always be white
              },
            }}
          >
            <Tab label="Encrypt" {...a11yProps(0)} />
            <Tab label="Decrypt" {...a11yProps(1)} />
          </Tabs>

          <Box sx={{ position: "absolute", right: 16 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={style === "Serious"}
                  onChange={handleStyleToggle}
                />
              }
              label="Silly/Serious"
              sx={{
                "& .MuiFormControlLabel-label": {
                  color: "white",
                },
              }}
            />
          </Box>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Anchor
            image={style === "Silly" ? redbeardparrot : seriouspirate}
            buttonText="Encrypt"
            InputPlaceholder="Text to be encrypted"
            KeyInputPlaceholder="Key to be used for encryption"
            buttonType="encrypt"
            isSerious={style === "Serious"}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Anchor
            image={style === "Silly" ? pirateman : seriouspirate}
            buttonText="Decrypt"
            InputPlaceholder="Text to be decrypted"
            KeyInputPlaceholder="Key to be used for decryption"
            buttonType="decrypt"
            isSerious={style === "Serious"}
          />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
