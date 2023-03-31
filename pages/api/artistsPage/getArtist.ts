// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = req.body.token;
    const id = req.body.artistId;
    const url = `https://api.spotify.com/v1/artists/${id}`;
    const options = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(url, options);
    const result = await response.json();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.send("request failed");
  }
}
