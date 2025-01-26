"use client";
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Chat() {
  const { data: session } = useSession({ required: true });
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

    setError('');
    setAnswer('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (response.ok) {
        setAnswer(data.answer);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-xl bg-transparent">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Ask a Question about Fraternities</h1>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={question}
            onChange={handleQuestionChange}
            placeholder="Type your question here"
            className="w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>

        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
        {answer && <div className="mt-6 bg-gray-800 p-4 rounded-md text-white shadow-sm"><strong>Answer:</strong> {answer}</div>}
      </div>
    </div>
  );
}
