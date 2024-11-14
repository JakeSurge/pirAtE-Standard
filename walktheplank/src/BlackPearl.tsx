import React from "react";
import "./index.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Anchor } from "./Anchor";
import pirateman from "./pirateman.jpg";
import redbeardparrot from "./redbeardparrot.jpg";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

let mode = ""

export type BlackPearlProps = {
  input?: string;
};

export const BlackPearl = ({ input }: BlackPearlProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          sx={{
            backgroundColor: "#ff7043", // Light grey
            "& .MuiFilledInput-root": {
              color: "#ff7043",
            },
            "& .MuiInputLabel-root": {
              color: "#FF0000",
            },
          }}
        >
          <Tab label="Encrypt" {...a11yProps(0)} />
          <Tab label="Decrypt" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Anchor
          image={redbeardparrot}
          buttonText="Encrypt"
          InputPlaceholder="Text to be encrypted"
          buttonType="encrypt"
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Anchor
          image={pirateman}
          buttonText="Decrypt"
          InputPlaceholder="Text to be decrypted"
          buttonType="decrypt"
        />
      </CustomTabPanel>
    </Box>
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
