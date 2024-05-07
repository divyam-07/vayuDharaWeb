import { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import query from "../../lib/queryApi";
import adminDb from "@/firebaseAdmin";
type Data = {
  answer: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("running");
  const { prompt, chatId, model, session } = req.body;
  if (!prompt) {
    res.status(400).json({ answer: "Provide a prompt" });
  }
  if (!chatId) {
    res.status(400).json({ answer: "Provide a chatId" });
  }
  const response: any = await query(prompt, chatId, model);
  const message: Message = {
    text: response || "ChatGpt was unable to find the answer for that!",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://links.papreact.com/89k",
    },
  };
  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);
  res.status(200).json({ answer: message.text });
}
