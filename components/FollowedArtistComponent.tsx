import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { colors } from "@/theme/AppThemeProvider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar } from "@mui/material";
import Link from "next/link";
import {Paper} from "@mui/material";
// followers
// :
// 41333
// genres
// :
// "desi hip hop"
// id
// :
// "4HQz6xUrKEKQ8nmMKsfvkB"
// image
// :
// "https://i.scdn.co/image/ab6761610000e5eb28e2254f2f2409e7dcda35f5"
// name
// :
// "yungsta"
// type
// :
// "artist"

const FollowedArtistComponent = () => {
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        width: 300,
        py: 1,
        borderRadius: 5,
      }}
    >
      <Avatar
        alt="yungi"
        sx={{ width: 60, height: 60 }}
        src="https://i.scdn.co/image/ab6761610000e5eb28e2254f2f2409e7dcda35f5"
      />
      <Box sx={{display:"flex",flexDirection:"column",alignItems:"start"}}>
        <Link href={""} style={{color:colors.greyAccent[800],textDecoration:"none"}}>
          <Typography variant="h5" sx={{fontWeight:600}}>
            Yungsta
          </Typography>
        </Link>

        <Typography variant="subtitle1" sx={{ color: colors.greyAccent[800] }}>
          Artist
        </Typography>
        <Typography>Followers : 3.1k</Typography>
      </Box>
      <IconButton sx={{ display: "block" }}>
        <MoreVertIcon sx={{ fontSize: 30 }} />
      </IconButton>
    </Paper>
  );
};

export default FollowedArtistComponent;
