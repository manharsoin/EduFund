'use client';

import { useEffect, useState } from 'react';
import { fetchCampaigns } from '@/utils/fetchCampaigns';
import { donateToCampaign } from '@/utils/donateToCampaign';
import { ethers } from 'ethers';

export default function HomePage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data);
      } catch {
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-12 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-extrabold text-blue-700 drop-shadow-sm tracking-tight">
          🎓 Welcome to EduFund
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Support student education through decentralized crowdfunding with full transparency.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <p className="text-center text-gray-500">No campaigns found. Be the first to create one!</p>
      ) : (
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
          {campaigns.map((c) => (
            <div
              key={c.id}
              className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-blue-100"
            >
              <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                {c.title}
              </h3>
              <p className="mt-2 text-gray-600 text-base leading-relaxed">
                {c.description}
              </p>
              <p className="mt-4 text-blue-600 font-semibold">
                🎯 Target: {ethers.utils.formatEther(c.targetAmount)} ETH
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Deadline: {new Date(c.deadline * 1000).toLocaleDateString()}
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const input = form.elements.namedItem('amount') as HTMLInputElement;
                  const amount = input.value;
                  if (!amount) return;
                  donateToCampaign(c.id, amount);
                  input.value = '';
                }}
                className="mt-3 flex gap-2"
              >
                <input
                  type="number"
                  name="amount"
                  step="0.01"
                  min="0"
                  placeholder="ETH"
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700"
                >
                  Donate
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
