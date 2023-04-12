import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const token = req.body.token;
    const id = req.body.id;
    const url = `https://api.spotify.com/v1/albums/${id}?market=ES`
    const options ={
        headers : {
          Authorization: 'Bearer ' + token
        }
    }
    try {
        const response = await fetch(url,options) 
        const data = await response.json()
        res.json(data)
    }
    catch(err) {
        console.log(err)
        res.json(err)
    }
  }