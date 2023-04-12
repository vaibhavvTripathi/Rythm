import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { createContext, useState } from "react";

export const ArtistPageContext = createContext({
  isFollowed: false,
  checkIsFollowed: async (id: string) => {},
  followArtist: async (id: string) => {},
  unFollowArtist: async (id: string) => {},
});

export default function ArtistPageContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  console.log(isFollowed)
  const checkIsFollowed = async (id: string) => {
    const token = Cookies.get("access_token");
     console.log(id)
    const response = await axios.post("/api/handleFollow/checkFollow", {
      token,
      id
    });
    console.log(response.data[0])
    if (response.data[0]) {
      console.log("wssp")
      setIsFollowed(true);
      return;
    }
    setIsFollowed(false);
  };

  const followArtist = async (id: string) => {
    const token = Cookies.get("access_token");
    try {
        const response = await axios.post("/api/handleFollow/followArtist", {
            token : token,
            id : id
        } )
        console.log(response.data)
        setIsFollowed(true)
    }
    catch(err) {
        console.log(err)
    }
    
  };

  const unFollowArtist = async (id:string) => {
    const token = Cookies.get('access_token');
    try {
       const response = await axios.post('/api/handleFollow/unFollowArtist', {
        token,
        id
       })
       console.log(response)
       setIsFollowed(false)
    }
    catch(err) {
        console.log(err)
    }
  }

  const contextValue = {
    isFollowed,
    checkIsFollowed,
    followArtist,
    unFollowArtist
  }

  return (
    <ArtistPageContext.Provider value = {contextValue}>
     {children}
    </ArtistPageContext.Provider>
  )
}
