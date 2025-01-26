import Groq from 'groq-sdk';

const groq = new Groq();

export async function POST(req) {
  try {
    const { question } = await req.json();
    
    if (!question || typeof question !== 'string' || question.trim() === '') {
      return new Response(
        JSON.stringify({ error: 'A valid question is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant that answers questions about fraternities (frats), mainly about safety for women, and including their culture, activities, and traditions. Also rate them out of 5.0' },
        { role: 'user', content: `Answer this question about frats: ${question}` },
      ],
      model: 'llama-3.3-70b-versatile', 
      temperature: 0.5,
      max_completion_tokens: 512,
      top_p: 1,
      stop: null,
      stream: false,
    });

    return new Response(
      JSON.stringify({ answer: response.choices[0]?.message?.content || 'Sorry, I couldn’t find an answer to that question.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Something went wrong' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
