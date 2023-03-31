import React from "react";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=757d949713674b90a63a6b27ba555f82&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-recently-played%20user-read-playback-position%20user-top-read%20user-library-read%20user-read-private%20user-library-read%20user-follow-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const Login = () => {
  return <a href={AUTH_URL}>Login</a>;
};

export default Login;
