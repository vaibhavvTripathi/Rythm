import { NextApiRequest,NextApiResponse } from "next";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
      console.log("wassup")
      const token = req.body.token
      const id = req.body.id 
  
      const url = `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${id}`
      const options = {
          headers : {
              Authorization: 'Bearer ' + token
          }
      }
      try {
         const response = await fetch(url,options)
         const data = await response.json()
         console.log(data)
         res.json(data)
      }
      catch (err) {
         console.log(err)
         res.json(err)
      }
  }