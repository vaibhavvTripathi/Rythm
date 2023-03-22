import React, { ReactNode } from "react";
import { Box, Container } from "@mui/system";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import styles from "../styles/Home.module.css";
import WebPlayer from "./WebPlayer";

const Layout = ({ children}: { children: ReactNode}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ width: "100%" }}>
        <Navbar/>
        <Box
          sx={{
            height: "92vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            className={styles.scrollbar}
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
  );
};

export default Layout;
