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
          <Typography variant="h1" sx={{ fontWeight: 600 }}>
            Rythm
          </Typography>
        </Box>
        <Box sx={{ mr: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton>
            <Avatar src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
          </IconButton>
        </Box>
      </Paper>
    </>
  );
};

export default Navbar;
