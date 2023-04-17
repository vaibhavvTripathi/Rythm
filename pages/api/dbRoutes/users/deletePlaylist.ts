import dbConnect from "@/lib/db-connect";
import UserModel from "@/models/UserModel";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.query.email;
  const id = req.query.id;
  try {
    await dbConnect();
    const removePlaylist = await UserModel.findOneAndUpdate(
      { email: email },
      { $pull: { playLists: { id: id } } },
      { new: true }
    );
    res.json(removePlaylist);
  } catch (err) {
    res.json(err)
  }
}
