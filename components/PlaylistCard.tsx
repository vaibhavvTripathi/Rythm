import { color, motion } from "framer-motion";
import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material";
import React from "react";
import { colors } from "@/theme/AppThemeProvider";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useRouter } from "next/router";
import Cookies from "js-cookie";
type PlaylistCardProps = {
    name : string,
    totalSongs : number,
    id : string,
    songs : Array<string> 
  }

const PlaylistCard = ({metaInfo}:{metaInfo:PlaylistCardProps}) => {
    const router = useRouter();
    const getToken = () => {
      return Cookies.get("access_token") 
    }
    const handleRoutes = () => {
        router.push(
          {pathname : `/Libraries/${metaInfo.name}`,
           query : {
            token : Cookies.get("access_token"),
            songs : metaInfo.songs
           }
          }
        )
    }
  return (
    <motion.div whileHover={{scale : 1.025}}>
      <Card sx={{ width: "13em" }}>
        <CardMedia
          component={"img"}
          image={
            "https://c4.wallpaperflare.com/wallpaper/553/87/605/music-stars-planet-space-wallpaper-preview.jpg"
          }
          sx={{
            backgroundColor: "grey",
            objectFit: "cover",
            height: 200,
            width: "100%",
            mb: 1,
            mx: "auto",
          }}
        />
        <Box sx={{display:"flex",alignItems:"start",justifyContent:"space-between"}}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, px: 1 }}>
              {metaInfo.name}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ px: 1, color: colors.greyAccent[600] }}
            >
              {metaInfo.totalSongs} songs
            </Typography>
          </Box>
          <IconButton onClick={()=>handleRoutes()}>
            <DoubleArrowIcon/>
          </IconButton>
        </Box>
      </Card>
    </motion.div>
  );
};

export default PlaylistCard;
