// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { AxiosResponse } from 'axios'

type data = {

}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.body.token
  try {
    const response:AxiosResponse<data[]> = await axios.post('/followedArtists', {
        token : token,
    })
    
  }
  catch (err) {

  }
}
