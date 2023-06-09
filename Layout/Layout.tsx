import React, { ReactNode } from "react";
import { Box, Container } from "@mui/system";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import WebPlayer from "./WebPlayer";
import WebPlayerProvider from "@/context/WebPlayerContext";
import ArtistPageContextProvider from "@/context/ArtistPageContext";
import PlaylistContextProvider, { PlaylistContext } from "@/context/PlaylistContext";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ArtistPageContextProvider>
      <WebPlayerProvider>
        <PlaylistContextProvider>
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box sx={{ width: "100%" }}>
            <Navbar />
            <Box
              sx={{
                height: "92.5vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                className={"scrollbar"}
                sx={{
                  height: "100%",
                  overflowY: "auto",
                  p: 2,
                }}
              >
                {children}
              </Box>
              <WebPlayer />
            </Box>
          </Box>
        </Box>
        </PlaylistContextProvider>
      
      </WebPlayerProvider>
    </ArtistPageContextProvider>
  );
};

export default Layout;
