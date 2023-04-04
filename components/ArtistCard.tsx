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

const ArtistCard = (prop: any) => {
  const { id, image, name, type } = prop.item;
  return (
    <>
      <Card sx={{ mx: 2, display: "inline-block", width: "220px", py: 1 }}>
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
            display: "flex",
            justifyContent: "space-between",
            px: 0,
            pl: 2,
            alignItems: "start",
          }}
        >
          <Box>
            <Link
              href={`/ArtistPage/${id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {name}
              </Typography>
              <Typography variant="subtitle1" color={colors.greyAccent[700]}>
                {type.toUpperCase()}
              </Typography>
            </Link>
          </Box>
          <Box>
            <IconButton sx={{}}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default ArtistCard;
