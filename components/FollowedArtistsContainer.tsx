import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import FollowedArtistComponent from "./FollowedArtistComponent";
import { colors } from "@/theme/AppThemeProvider";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const FollowedArtistsContainer = () => {
  return (
    <Box
      sx={{
        p: 1,
        borderRadius: 5,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          ml: 2,
          pb: 1,
          color: colors.secondary[500],
          fontWeight: 600,
          borderBottom: `1px solid ${colors.greyAccent[200]}`,
          display:"flex",
          alignItems : "end",

        }}
      >
        <BookmarkIcon sx={{fontSize:"1.2em",color : colors.greyAccent[300]}}/>
        Your Following
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          scrollbarWidth: "thin",
          scrollbarColor: "blue darkblue",
          width: "fit-content",
          height: "190px",
          overflowY: "auto",
          px: 2,
          py: 1,
        }}
      >
        <FollowedArtistComponent />
        <FollowedArtistComponent />
        <FollowedArtistComponent />
        <FollowedArtistComponent />
        <FollowedArtistComponent />
        <FollowedArtistComponent />
      </Box>
    </Box>
  );
};

export default FollowedArtistsContainer;
