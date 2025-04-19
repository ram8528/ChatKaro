const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getBotResponse = async (req, res) => {
  const { message } = req.body;
//   console.log("📩 Message received:", message);
//   console.log("🔐 API Key present?", !!process.env.OPENAI_API_KEY);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message },
      ],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("🔥 OpenAI error:", error.response?.data || error.message);
    res.status(500).json({ reply: 'Error getting response from OpenAI.' });
  }
};
