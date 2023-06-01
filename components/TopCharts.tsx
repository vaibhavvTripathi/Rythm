import React from "react";
import { Box, Container, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { colors } from "@/theme/AppThemeProvider";
import { Button } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useRouter } from "next/router";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { motion } from "framer-motion";

const TopCharts = ({ prop }: { prop: any }) => {
  const name = prop.artists
    .map((item: any, index: number) => {
      return item.name;
    })
    .toString();
  const router = useRouter();
  return (
    <>
      <Box
        sx={{
          my: 0,
          p: 0,
          display: "flex",
          mx: "auto",
        }}
      >
        <Box sx={{ width: 600, height: 401 }}>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={prop.image}
            alt={""}
          />
        </Box>
        <Box sx={{ ml: 3, textAlign: "left" }}>
          <Typography
            variant="subtitle1"
            sx={{ color: colors.greyAccent[600] }}
          >
            New Release
          </Typography>
          <Box sx={{ mt: 6 }}>
            <Typography sx={{ color: colors.greenAccent[700] }}>
              {prop.albumType.toUpperCase()}
            </Typography>
            <Typography
              variant="h1"
              sx={{
                color: colors.greyAccent[800],
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                width: "400px",
              }}
            >
              {prop.name}
            </Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography sx={{ color: colors.greyAccent[700] }}>
              Artists : {name}
            </Typography>
            <Typography sx={{ color: colors.greyAccent[700] }}>
              Album Type : {prop.albumType.toUpperCase()}
            </Typography>
            <Typography sx={{ color: colors.greyAccent[700] }}>
              Release Date : {prop.date}
            </Typography>
            <Typography sx={{ color: colors.greyAccent[700] }}>
              Total Tracks : {prop.totalTracks}
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <IconButton
              sx={{
                height: 50,
                width: 50,
                my: "auto",
                background: colors.secondary[500],
                "&:hover": { background: colors.secondary[500] },
                color: "white",
              }}
              onClick={() => router.push(`/AlbumPage/${prop.id}`)}
            >
              <DoubleArrowIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TopCharts;
