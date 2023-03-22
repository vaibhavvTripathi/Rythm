import React from "react";
import Card from "@mui/material/Card";
import { CardMedia, Typography } from "@mui/material";
import { colors } from "@/theme/AppThemeProvider";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const TrackCard = ({name,artist,image}:{name:string,artist:string,image:string}) => {
  return (  
    <>
      <Card
        sx={{
          display: "flex",
           width: "32%",
          "&:hover": { transform: "scale(1.01)" },
          transition: "all .2s ease-in-out",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 100, height: "100%",backgroundColor:colors.greyAccent[400] }}
          image={image}
          alt=""
        />
        <Box sx={{ flexBasis: "50%", pl: 2,my:"auto" }}>
          <Typography sx={{cursor:"default",fontWeight:700}} variant="h5">
            {name}
          </Typography>
          <Typography sx={{cursor:"default"}}  variant="subtitle1">{artist}</Typography>
        </Box>

        <IconButton
          sx={{
            width: 60,
            height: 60,
            mr: 1,
          
            my: "auto",
            background: colors.secondary[500],
            "&:hover": { background: colors.secondary[500] },
            color: "white",
          }}
        >
          <PlayCircleIcon />
        </IconButton>
      </Card>
    </>
  );
};

export default TrackCard;
