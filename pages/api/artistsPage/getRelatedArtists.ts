import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const id = req.body.id;
    const token = req.body.token;
    const url =   `https://api.spotify.com/v1/artists/${id}/related-artists`
    const options = {
        headers : {
            Authorization: 'Bearer ' + token
        }
    }
    try {
        const response = await fetch(url,options)
        const result = await response.json()
        const artistData = result.artists.map((item:any,index:number)=> {
            return (
             {
               name : item.name,
               id : item.id,
               image : item.images[0].url,
               type : item.type
             }
            )
       })
        res.json(artistData)
    }
    catch(err) {
        console.log(err)
        res.json(err)
    }
  }
  