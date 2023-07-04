import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import { Avatar } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { DarkMode, LightMode } from "@mui/icons-material";
import HeadsetIcon from "@mui/icons-material/Headset";
import { colors } from "@/theme/AppThemeProvider";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Cookies from "js-cookie";
import { useRouter } from "next/router";


const Navbar = () => {
  const router = useRouter();
  const logOut = () => {
    Cookies.remove("access_token")
    location.reload();
  }
  return (
    <>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 0,
          mb: "2px",
          py:"2px"
        }}
        variant={'outlined'}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            ml: 1,
            color: colors.primary[700],
            width:"100%"
          }}
        >
          {/* <HeadsetIcon sx={{ fontSize: 50 }} /> */}
          <Typography variant="h1">
            Rythm
          </Typography>
          <IconButton sx={{color :"red"}} onClick={logOut}>
            <PowerSettingsNewIcon/>
          </IconButton>
        </Box>
      </Paper>
    </>
  );
};

export default Navbar;
