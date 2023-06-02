import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import { Avatar } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { DarkMode, LightMode } from "@mui/icons-material";
import HeadsetIcon from "@mui/icons-material/Headset";
import { colors } from "@/theme/AppThemeProvider";

const Navbar = () => {
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
            ml: 1,
            color: colors.primary[700],
          }}
        >
          {/* <HeadsetIcon sx={{ fontSize: 50 }} /> */}
          <Typography variant="h1">
            Rythm
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export default Navbar;
