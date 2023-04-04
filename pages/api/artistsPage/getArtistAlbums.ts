import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, market, limit, offset, token } = req.body;
  const url = `https://api.spotify.com/v1/artists/${id}/albums?market=${market}&limit=${limit}&offset=${offset}`;
  const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    res.json(result.items)
  } catch (err) {
    console.log(err)
    res.json(err)
  }
}
