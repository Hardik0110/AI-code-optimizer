import express from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: "ddc-lkY6N38T84NQ8bu838OuNLH5nhY2EO3T7lApFgcQn2OM7C7Krg",
  baseURL: "https://api.sree.shop/v1"
});

app.post('/v1/optimize', async (req, res) => {
  try {
    const { code, options } = req.body;
    
    let systemPrompt = "You are an expert code optimizer. Your task is to optimize the given code";
    if (options.increaseReadability) systemPrompt += ", improve its readability";
    if (options.useHighLevelFunctions) systemPrompt += ", use high-level functions instead of loops";
    if (options.useModernHooks) systemPrompt += ", replace class components with modern React hooks";
    if (options.optimizeImports) systemPrompt += ", organize and optimize imports";
    if (options.improveNaming) systemPrompt += ", improve variable and function naming";
    
    const completion = await openai.chat.completions.create({
      model: "claude-3-5-sonnet",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: code }
      ],
      temperature: 0.3,
      max_tokens: 2048
    });

    res.json({
      optimizedCode: completion.choices[0].message.content,
      suggestions: []
    });
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to optimize code' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});