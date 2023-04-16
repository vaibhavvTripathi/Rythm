import dbConnect from '@/lib/db-connect';
import PlaylistModel from '@/models/PlaylistModel';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const playListId = req.query.playListId;
  try {
    await dbConnect();
    const response = await PlaylistModel.find({playListId: playListId})
    res.json(response)
  }
  catch(err) {
    res.json(err)
  }
}
