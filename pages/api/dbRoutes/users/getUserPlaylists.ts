import dbConnect from "@/lib/db-connect";
import UserModel from "@/models/UserModel";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.query.email;
  try {
    await dbConnect();
    const response = await UserModel.find({ email: email });
    res.json(response);
  } catch (err) {
    res.status(404).json(err);
  }
}
