// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const spotifyWebApi = require("spotify-web-api-node");


export default function handler(req : any, res : any) {
  
  const spotifyApi = new spotifyWebApi({
    clientId: "757d949713674b90a63a6b27ba555f82",
    clientSecret: "30a96b5e1a2740f2a8a7d805ebf45f8d",
    redirectUri: req.body.uri,
  });
  
  const code = req.body.code

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data: any) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err: any) => res.status(404));
}
