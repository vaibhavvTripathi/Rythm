import dbConnect from "@/lib/db-connect";
import PlaylistModel from "@/models/PlaylistModel";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const playListId = req.body.playListId;
  const songId = req.body.songId;

  try {
    await dbConnect();
    const upsert = await PlaylistModel.findOneAndUpdate(
      { playListId: playListId },
      { $addToSet: { songIds: songId } },
      { upsert: true, new: true }
    );

    res.json(upsert);
  } catch (err) {
    res.status(404).json(err);
  }
}
