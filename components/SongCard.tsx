import React, { useContext } from "react";
import { Card } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import Link from "next/link";
import { colors } from "@/theme/AppThemeProvider";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AddIcon from "@mui/icons-material/Add";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { WebPlayerContext } from "@/context/WebPlayerContext";
import { motion } from "framer-motion";


const SongCard = ({ prop,handleId,setAcnh }: any) => {
  const { setSong } = useContext(WebPlayerContext);
  const handleSet = (id : string,e :React.MouseEvent<HTMLButtonElement>) => {
    handleId(id);
  }
  return (
    <>
     <motion.div
       whileHover={{scale : 1.0222225}}
       style ={{display: "inline-block", width: "220px",marginRight:"20px" }}
      >
        <Card sx={{ mx: 2, display: "inline-block", width: "200px" }}>
        <CardMedia
          component={"img"}
          image={prop.img}
          sx={{
            backgroundColor: "grey",
            objectFit: "cover",
            height: 200,
            width: 200,
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
            <Link href={""} style={{ textDecoration: "none", color: "black" }}  onClick={() => setSong(prop.preview,prop.img,prop.name,prop.artists)}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  width: "100px",
                  pl: 0,
                }}
              >
                {prop.name}
              </Typography>
              <Typography
                variant="subtitle2"
                color={colors.greyAccent[700]}
                sx={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  width: "100px",
                }}
              >
                {prop.artists}
              </Typography>
            </Link>
          </Box>
          <Box>
            <IconButton onClick={(e)=>handleSet(prop.id,e)}>
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
      </motion.div>
      
    </>
  );
};

export default SongCard;
