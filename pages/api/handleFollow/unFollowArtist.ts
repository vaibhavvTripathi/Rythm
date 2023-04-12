import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.body.token;
  const id = req.body.id;
  const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${id}`;
  const options = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const response = await fetch(url,options) 
    const data = await response.json()
    res.json(data)
  }
  catch(err) {
      res.json(err)
  }
}
