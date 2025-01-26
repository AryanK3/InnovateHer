import Groq from 'groq-sdk';

const groq = new Groq();

export async function POST(req) {
  try {
    const { reviews } = await req.json();
    
    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
      return new Response(
        JSON.stringify({ error: 'An array of reviews is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const reviewsText = reviews.join('\n');
    const summary = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant that summarizes reviews of frats and gives a rating out of 5.0' },
        { role: 'user', content: `Summarize the following list of reviews:\n${reviewsText}` },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
      max_completion_tokens: 512,
      top_p: 1,
      stop: null,
      stream: false,
    });

    return new Response(
      JSON.stringify({ summary: summary.choices[0]?.message?.content || 'No response' }),
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
