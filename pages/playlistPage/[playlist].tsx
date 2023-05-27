import { PlaylistContext } from "@/context/PlaylistContext";
import { Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Opacity } from "@mui/icons-material";

const PlayListPage = () => {
  const { upsertSong, getSong, songArray } = useContext(PlaylistContext);
  const [show,setShow] = useState<boolean>(true);
  const router = useRouter();

  return (
    <>
      <Container>
        <motion.div
         initial = {{x : -1000}}
         animate = {{x: [0,900,0]}}
         transition={{
            duration : 0.125, 
            delay : 0.2
         }}
         whileHover={{scale : 1.25,opacity : 0.4}}
        > 
          <Typography variant="h1">name of the playlist</Typography>
        </motion.div>
        <AnimatePresence>
          {show && <motion.div
            initial = {{opacity : 0,x:-100}}
            animate = {{opacity : 1,x:0}}
            exit = {{opacity : 0,x: -100}}
            transition={{
               duration : 1,
            }}
          >
               <h1>hi</h1>
            </motion.div>}
        </AnimatePresence>
        <button onClick={()=> setShow(!show)}>hide hi</button>

        
      </Container>
    </>
  );
};

export default PlayListPage;
