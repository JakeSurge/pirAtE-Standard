import React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import piratebg from "./piratebg.jpeg";
import pirateman from "./pirateman.jpg";
import seriouspirate from "./seriouspirate.jpg";
import redbeardparrot from "./redbeardparrot.jpg";
import { Anchor } from "./Anchor";
import { useTheme } from "@mui/material/styles";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import HelpIcon from "@mui/icons-material/Help";

// to-do refactor literally everything

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const PirateDashboard: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [style, setStyle] = React.useState<"Serious" | "Silly">("Serious");
  const [aesMode, setAesMode] = React.useState<"ecb" | "cbc">("ecb");
  const [format, setFormat] = React.useState<"utf-8" | "base64">("utf-8");

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleStyleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStyle(event.target.checked ? "Serious" : "Silly");
  };

  const handleAesModeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAesMode(event.target.checked ? "cbc" : "ecb");
  };
  const handleFormatToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormat(event.target.checked ? "base64" : "utf-8");
  };

  const backgroundColor =
    useTheme().palette.mode === "dark" ? "white" : "black";

  const themeStyle =
    style === "Silly"
      ? {
          backgroundColor: "#4caf50",
          color: "black",
        }
      : {
          backgroundColor: "rgb(18,18,18)",
          color: "white",
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
          backgroundColor: backgroundColor,
          minHeight: "100vh",
        };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open} style={themeStyle}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Pirate Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor:
              style === "Silly" ? "rgb(255, 255, 255)" : "rgb(18, 18, 18)",
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          {["Encryption/Decryption", "Docs"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: themeStyle.color,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: themeStyle.color,
                  }}
                >
                  {index === 0 ? <EnhancedEncryptionIcon /> : <HelpIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, ...blackPearlStyle }}>
        <DrawerHeader />
        <Box
          sx={{
            position: "relative",
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
            backgroundColor: themeStyle.backgroundColor,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Pirate tabs"
            centered
            sx={{
              "& .MuiTab-root": {
                color: style === "Serious" ? "white" : "inherit",
              },
            }}
          >
            <Tab label="Encrypt" />
            <Tab label="Decrypt" />
          </Tabs>

          <Box sx={{ position: "absolute", right: 16 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={style === "Serious"}
                  onChange={handleStyleToggle}
                />
              }
              label="Boring/Fun theme"
              sx={{
                "& .MuiFormControlLabel-label": {
                  color: themeStyle.color,
                },
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={aesMode === "cbc"}
                  onChange={handleAesModeToggle}
                />
              }
              label="Mode: ECB/CBC"
              sx={{
                "& .MuiFormControlLabel-label": {
                  color: themeStyle.color,
                },
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={format === "base64"}
                  onChange={handleFormatToggle}
                />
              }
              label="Mode: UTF-8/Base64"
              sx={{
                "& .MuiFormControlLabel-label": {
                  color: themeStyle.color,
                },
              }}
            />
          </Box>
        </Box>

        {value === 0 && (
          <Anchor
            image={style === "Silly" ? redbeardparrot : seriouspirate}
            buttonText="Encrypt"
            InputPlaceholder="Text to be encrypted"
            KeyInputPlaceholder="Key to be used for encryption"
            buttonType="encrypt"
            isSerious={style === "Serious"}
            aesMode={aesMode}
            utfOrBase64={format}
          />
        )}
        {value === 1 && (
          <Anchor
            image={style === "Silly" ? pirateman : seriouspirate}
            buttonText="Decrypt"
            InputPlaceholder="Text to be decrypted"
            KeyInputPlaceholder="Key to be used for decryption"
            buttonType="decrypt"
            isSerious={style === "Serious"}
            aesMode={aesMode}
            utfOrBase64={format}
          />
        )}
      </Box>
    </Box>
  );
};

export default PirateDashboard;
