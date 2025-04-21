import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { messages } = req.body;

    // Basic validation
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        message: 'Messages array is required'
      });
    }

    // Get the API key from environment variables
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error('OpenRouter API key is not configured');
    }

    // Call OpenRouter API
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract the AI's response
    const aiResponse = response.data.choices[0].message.content;

    res.json({
      success: true,
      response: aiResponse
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process chat request',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 