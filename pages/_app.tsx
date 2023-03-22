import Layout from "@/Layout/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/theme/AppThemeProvider";
import { CssBaseline } from "@mui/material";
import Login from "./Login/Login";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import Cookies from "js-cookie";

export default function App({ Component, pageProps }: AppProps) {
  let [code, setCode] = useState<string | null>(null);
  const [act,setAct] = useState<string | undefined>()
  useEffect(() => {
    code = new URLSearchParams(window.location.search).get("code");

    axios.post("/api/login", {
      code: code,
    }).then(res=> {
      Cookies.set('access_token',res.data.accessToken)
      setAct(Cookies.get('access_token'))
      setCode(code);
    })
  }, []);
  useEffect(()=> {
    setAct(Cookies.get('access_token'))
  },[])
  if(!code && !act) return <Login />;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} code={code} />
      </Layout>
    </ThemeProvider>
  );
}
