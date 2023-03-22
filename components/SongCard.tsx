import React from "react";
import { Card } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import Link from "next/link";
import { colors } from "@/theme/AppThemeProvider";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// artists
// : 
// "Karun,Udbhav"
// id
// : 
// "29DCr7vJ7V4Y1ExUfVjQqP"
// img
// : 
// "https://i.scdn.co/image/ab67616d0000b2737716cde064377d3364620a67"
// name
// : 
// "Haalaat - Interlude"
// type
// : 
// "track"

const SongCard = () => {
  return (
    <>
      <Card sx={{ mx: 2, display: "inline-block", width: "180px" }}>
        <CardMedia
          component={"img"}
          image={"https://i.scdn.co/image/ab67616d0000b2737716cde064377d3364620a67"}
          sx={{
            backgroundColor: "grey",
            objectFit: "cover",
            height: 180,
            width: 180,
            mb: 1,
            mx: "auto",
          }}
        />
        <Box
          sx={{
            mt: 1,
            mb: 1,
            display: "flex",
            justifyContent: "space-between",
            px: 0,
            pl: 2,
            alignItems: "start",
          }}
        >
          <Box>
            <Link href={""} style={{ textDecoration: "none", color: "black" }}>
              <Typography variant="h6" sx={{ fontWeight: 600 ,textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                width: "100px",pl:0}}>
               Haalaat - Interlude
              </Typography>
              <Typography variant="subtitle2" color={colors.greyAccent[700]}>
                Karun,Udbhav
              </Typography>
            </Link>
          </Box>
          <Box>
            <IconButton sx={{mr:1}}>
              <MusicNoteIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default SongCard;
