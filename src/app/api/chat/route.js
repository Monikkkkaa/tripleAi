import { NextResponse } from 'next/server';

const API_KEYS = {
  gemini: process.env.GEMINI_API_KEY,
  perplexity: process.env.PERPLEXITY_API_KEY
};

export async function POST(request) {
  try {
    const { provider, message } = await request.json();

    if (!provider || !message) {
      return NextResponse.json({ success: false, error: 'Missing provider or message' }, { status: 400 });
    }

    // ✅ Provider 1: Gemini Flash
    if (provider === 'gemini') {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': API_KEYS.gemini
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }]
          })
        }
      );

      const data = await response.json();
      const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response text found";

      return NextResponse.json({
        success: true,
        model: 'Gemini 2.5 Flash',
        content: output
      });
    }

    // ✅ Provider 2: Perplexity
    if (provider === 'perplexity') {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEYS.perplexity}`
        },
        body: JSON.stringify({
          model: 'sonar',
          messages: [{ role: 'user', content: message }]
        })
      });

      const data = await response.json();
      const output = data?.choices?.[0]?.message?.content || "⚠️ No response text found";

      return NextResponse.json({
        success: true,
        model: 'Perplexity Sonar',
        content: output
      });
    }

    // ✅ Provider 3: ChatGPT Button (Gemini Flash with ChatGPT-style system instruction)
    if (provider === 'chatgpt') {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': API_KEYS.gemini
          },
          body: JSON.stringify({
            contents: [
              {
                role: "model",
                parts: [{ text:
                  "You are ChatGPT. Reply with a friendly, detailed, and helpful tone. " +
                  "Write longer responses. Add examples when useful. Avoid 1-line answers."
                }]
              },
              { parts: [{ text: message }] }
            ]
          })
        }
      );

      const data = await response.json();
      const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response text found";

      return NextResponse.json({
        success: true,
        model: 'ChatGPT-style (Gemini Flash)',
        content: output
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid provider' }, { status: 400 });

  } catch (error) {
    console.error('🔥 API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
