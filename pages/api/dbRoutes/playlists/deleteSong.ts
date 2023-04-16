import dbConnect from "@/lib/db-connect";
import PlaylistModel from "@/models/PlaylistModel";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const songId = req.body.songId;
  const playListId = req.body.playListId;
  console.log(playListId,songId)
  try {
    await dbConnect();
    const removeSong = await PlaylistModel.findOneAndUpdate(
      { playListId: playListId },
      { $pull: { songIds: songId } },
      { new: true }
    );
    console.log(removeSong)
    res.json(removeSong);
  } catch (err) {
    res.json(err);
  }
}
