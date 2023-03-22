import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const useAuth = (code: string) => {
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [refreshToken, setRefreshToken] = useState<string | undefined>();
  const [expiresIn, setExpiresIn] = useState<number | undefined>();

  let [flag, setFlag] = useState(false);
  useEffect(() => {
    axios
      .post("http://localhst:5000/login", {
        code: code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        console.log(res.data);
      })
      .catch((err) => console.log(err));   
  }, []);
  return accessToken;
};

export default useAuth;
