// src/components/Leaderboard.tsx
"use client";
import React, { useState, useEffect } from "react";

interface LeaderboardItem {
  userId: string;
  xp: number;
  name: string;
  avatar: string | null;
  numberOfQuests: number;
  addresses: Record<string, string>;
  address: string;
  twitterId: string;
  discord: string;
  twitter: string;
  discordId: string;
  connectedWallet: string;
}

const Leaderboard: React.FC = () => {
  const [data, setData] = useState<LeaderboardItem[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchData = async () => {
    try {
      const response = await fetch("https://zealy-api.vercel.app/");
      const result = await response.json();
      setData(result.leaderboard);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError((error as Error).message || "An unknown error occurred.");
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    // Fetch data every 5 minutes
    const intervalId = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>\mani-fest/ Leaderboard</h2>
      {error ? (
        <p>Error fetching data: {error}</p>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>XP</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.userId}>
                <td>{item.name}</td>
                <td>{item.xp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <style jsx>{`
        .leaderboard-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #00f7ff; /* Neon color */
          background-color: #111; /* Dark background */
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px #00f7ff; /* Neon glow effect */
          transform: rotate(-90deg); /* Rotating the container */
          transform-origin: left top;
          width: 100vh; /* Adjusting the width after rotation */
          height: 100vw; /* Adjusting the height after rotation */
        }

        h2 {
          text-align: center;
          font-size: 2em;
          margin-bottom: 20px;
        }

        .leaderboard-table {
          width: 100%;
          border-collapse: collapse;
        }

        .leaderboard-table th,
        .leaderboard-table td {
          padding: 10px;
          border: 1px solid #00f7ff; /* Neon lines */
          text-align: left;
        }

        .leaderboard-table th {
          background-color: #222; /* Dark header background */
        }

        .leaderboard-table tr:nth-child(even) {
          background-color: #181818; /* Alternating row colors */
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;
