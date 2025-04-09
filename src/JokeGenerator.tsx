import React, { useState } from "react";

// Define the type for the joke object
interface Joke {
  setup: string;
  punchline: string;
}

const JokeGenerator: React.FC = () => {
 
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://official-joke-api.appspot.com/random_joke");
      const data: Joke = await res.json(); 
      setJoke(data);
    } catch (err) {
      console.error("Failed to fetch joke:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center p-6">
      <h1 className="text-2xl font-bold mb-4">😂 Random Joke Generate</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={fetchJoke}
      >
        Get a Joke
      </button>

      {loading && <p className="mt-4">Loading...</p>}

      {joke && !loading && (
        <div className="mt-4">
          <p className="font-semibold">{joke.setup}</p>
          <p>{joke.punchline}</p>
        </div>
      )}
    </div>
  );
};

export default JokeGenerator;
