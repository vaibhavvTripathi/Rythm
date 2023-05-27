import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { colors } from "@/theme/AppThemeProvider";
import { motion } from "framer-motion";

const AlbumCard = ({ prop }: { prop: any }) => {
  return (
    <>
      <motion.div
       whileHover={{scale : 1.025}}
       style ={{display: "inline-block", width: "200px",marginRight:"20px" }}
      >
        <Card >
          <CardMedia
            component={"img"}
            image={prop.images[0].url}
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
              <Link
                href={`/AlbumPage/${prop.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    width: "180px",
                    pl: 0,
                  }}
                >
                  {prop.name}
                </Typography>
              </Link>
            </Box>
          </Box>
        </Card>
      </motion.div>
    </>
  );
};

export default AlbumCard;
