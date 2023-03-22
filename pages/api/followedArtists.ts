import { NextApiRequest,NextApiResponse} from "next";

export default async function handler (req:NextApiRequest,res:NextApiResponse) {
   
   const token = req.body.token
   const url =  `https://api.spotify.com/v1/me/following?type=artist&after=0I2XqVXqHScXjHhk6AYYRe&limit=10`
   const options = {
    headers : {
        Authorization : "Bearer " + token 
    }
   }
   try {
      const response  = await fetch(url,options)
      const data = await response.json()
      const followedArtistsArray = data.artists.items.map((item:any,index:number)=> {
        return {
            name : item.name,
            type : item.type,
            followers : item.followers.total,
            id : item.id,
            image : item.images[0].url,
            genres : item.genres[0]
        }
      })
      res.json(followedArtistsArray)
   }
   catch(err) {
       console.log(err)
       res.status(404)
   }
}