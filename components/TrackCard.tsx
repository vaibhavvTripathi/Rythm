import React, { useContext } from "react";
import Card from "@mui/material/Card";
import { CardMedia, Typography } from "@mui/material";
import { colors } from "@/theme/AppThemeProvider";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { WebPlayerContext } from "@/context/WebPlayerContext";

const TrackCard = ({name,artist,image,preview,id}:{name:string,artist:string,image:string,preview:string,id: string}) => {

  const {setSong} = useContext(WebPlayerContext);

  const handlePlay = () => {
    console.log("hi")
    setSong(preview);
  }
  return (  
    <>
      <Card
        sx={{
          display: "flex",
           width: "25%",
          "&:hover": { transform: "scale(1.05)" },
          transition: "all .2s ease-in-out",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 80, height: 80,backgroundColor:colors.greyAccent[400] }}
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
            width: 50,
            height: 50,
            mr: 1,
          
            my: "auto",
            background: colors.secondary[500],
            "&:hover": { background: colors.secondary[500] },
            color: "white",
          }}
          onClick={handlePlay}
        >
          <PlayCircleIcon />
        </IconButton>
      </Card>
    </>
  );
};

export default TrackCard;
