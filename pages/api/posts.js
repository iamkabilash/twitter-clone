import { initMongoose } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import Post from "@/models/Post";

export default async function handler(req, res) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    const { text } = req.body;
    const post = await Post.create({
      author: session.user.id,
      text: text,
    });
    res.json(post);
  }

  if (req.method === "GET") {
    const { id } = req.query;
    if (id) {
      const post = await Post.findById(id).populate("author");
      res.json({ post });
    } else {
      const posts = await Post.find()
        .populate("author")
        .sort({ createdAt: -1 })
        .exec();
      res.json(posts);
    }
  }
}
