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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-white">
      <div className="w-full max-w-4xl px-6 py-8 sm:px-12 sm:py-16 bg-transparent">
        <h4 className="text-3xl font-bold text-[#5A2A51] text-center mb-8">
          Ask a Question About Fraternities
        </h4>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            value={question}
            onChange={handleQuestionChange}
            placeholder="Type your question here"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-900 shadow-md"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition duration-200"
          >
            Submit
          </button>
        </form>

        {error && <p className="mt-4 text-red-600 text-center font-medium">{error}</p>}
        {answer && <div className="mt-6 bg-gray-50 p-6 rounded-lg text-purple-800 shadow-md"><strong>Answer:</strong> {answer}</div>}
      </div>
    </div>
  );
}
