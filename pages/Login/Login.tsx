import React, { useEffect, useState } from "react";

  

const Login = () => {
  const [authUrl,setAuthUrl] = useState("");
  useEffect(()=> {
     setAuthUrl(`https://accounts.spotify.com/authorize?client_id=757d949713674b90a63a6b27ba555f82&response_type=code&redirect_uri=${window.location.href.substring(0,window.location.href.length-1)}&scope=streaming%20user-read-email%20user-read-recently-played%20user-read-playback-position%20user-top-read%20user-library-read%20user-read-private%20user-library-read%20user-follow-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-follow-modify%20user-follow-read`)
  },[])
  return (
    <>
      <div
        style={{
          width: "fit-content",
          margin: "0 auto",
          marginTop: "15em",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
        }}
        className="container"
      >
        <h1 style={{fontFamily: "Ubuntu, sans-serif"}}>Welcome back to Rythm</h1>
        <div style={{padding:"0.5em 1em",backgroundColor:"green",borderRadius:"20px"}} className="login-btn">
          <a style={{textDecoration:"none",fontSize:"1em",color:"white",fontFamily: "Ubuntu, sans-serif"}} href={authUrl} className="btn btn-primary">
            Log In With Spotify
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
