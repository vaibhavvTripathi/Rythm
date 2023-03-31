// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = req.body.token;
  const id = req.body.id;
  const url = `https://api.spotify.com/v1/artists/${id}/top-tracks?market=IN`;
  const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
     const response = await fetch(url,options)
     const data = await response.json();
     res.json(data);
  }
  catch (err) { 
    console.log(err);
    res.status(404);
  }
}
