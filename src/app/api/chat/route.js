import { NextResponse } from 'next/server';

// Load API keys from environment variables
const API_KEYS = {
  gemini: process.env.GEMINI_API_KEY,
  perplexity: process.env.PERPLEXITY_API_KEY,
  chatgpt: process.env.CHATGPT_API_KEY
};

export async function POST(request) {
  try {
    const { provider, message } = await request.json();

    if (provider === 'gemini') {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-goog-api-key': API_KEYS.gemini },
          body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
        }
      );
      const data = await response.json();
      return NextResponse.json({ success: true, content: data.candidates[0].content.parts[0].text });
    }

    if (provider === 'perplexity') {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEYS.perplexity}` },
        body: JSON.stringify({ model: 'sonar', messages: [{ role: 'user', content: message }] })
      });
      const data = await response.json();
      return NextResponse.json({ success: true, content: data.choices[0].message.content });
    }

    if (provider === 'chatgpt') {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEYS.chatgpt}` },
        body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [{ role: 'user', content: message }] })
      });
      const data = await response.json();
      return NextResponse.json({ success: true, content: data.choices[0].message.content });
    }

    return NextResponse.json({ success: false, error: 'Invalid provider' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
