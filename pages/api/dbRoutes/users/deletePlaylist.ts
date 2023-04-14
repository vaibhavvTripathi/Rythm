import dbConnect from "@/lib/db-connect";
import UserModel from "@/models/UserModel";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    const test = await UserModel.findOneAndUpdate(
      { email: req.body.email },
      { $pull: { playLists: { id: req.body.id } } },
      { new: true }
    );
    res.json(test);
  } catch (err) {
    res.json(err)
  }
}
