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
import { motion } from "framer-motion";
const numeral = require("numeral");

const FollowedArtistCard = (prop: any) => {
  const { id, image, name, type, followers, genres } = prop.item;
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.025 }}
        style={{ display: "inline-block", width: "220px", marginRight: "20px" }}
      >
        <Card>
          <CardMedia
            component={"img"}
            image={image}
            sx={{
              backgroundColor: "grey",
              objectFit: "cover",
              height: 200,
              width: 200,
              mb: 3,
              borderRadius: "100%",
              mx: "auto",
            }}
          />
          <Box
            sx={{
              mt: 2,
              mb: 1,
              px: 0,
              pl: 2,
              alignItems: "start",
            }}
          >
            <Box sx={{}}>
              <Link
                href={`/ArtistPage/${id}`}
                style={{
                  textDecoration: "none",
                  width: "fit-content",
                  color: "black",
                  display: "block",
                  margin: "0 auto",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 600, textAlign: "center" }}
                >
                  {name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: colors.greyAccent[700], textAlign: "center" }}
                >
                  Followers : {numeral(followers).format("0.0a")}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: colors.greenAccent[700], textAlign: "center" }}
                >
                  {type.toUpperCase()}
                </Typography>
              </Link>
            </Box>
          </Box>
        </Card>
      </motion.div>
    </>
  );
};

export default FollowedArtistCard;
