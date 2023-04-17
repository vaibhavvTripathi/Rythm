import dbConnect from "@/lib/db-connect";
import PlaylistModel from "@/models/PlaylistModel";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const songId = req.query.songId;
  const playListId = req.query.playListId;

  try {
    await dbConnect();
    const removeSong = await PlaylistModel.findOneAndUpdate(
      { playListId: playListId },
      { $pull: { songIds: songId } },
      { new: true }
    );

    res.json(removeSong);
  } catch (err) {
    res.json(err);
  }
}
