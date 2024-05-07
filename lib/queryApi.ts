import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const query = async (prompt: string, chatId: string, model: string) => {
  console.log("runn");
  const res = await openai.chat.completions
    .create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.choices[0].message)
    .catch((err) => {
      `ChatGPT was unable to find the answer for that! Error: ${err.message}`;
    });
  console.log(res, ">>>>>>>>>>>>>>");
  return res;
};

export default query;
