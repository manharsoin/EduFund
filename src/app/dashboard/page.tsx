'use client';

import { useEffect, useState } from 'react';
import { fetchCampaigns } from '@/utils/fetchCampaigns';
import { donateToCampaign } from '@/utils/donateToCampaign';
import { ethers } from 'ethers';
import { useWallet } from '@/hooks/useWallet';
import toast, { Toaster } from 'react-hot-toast';

export default function DashboardPage() {
  const { address } = useWallet();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [donating, setDonating] = useState<number | null>(null); // number type for campaignId

  useEffect(() => {
    const loadCampaigns = async () => {
      if (!address) return;
      try {
        const data = await fetchCampaigns();
        const mine = data.filter(
          (c: any) => c.owner.toLowerCase() === address.toLowerCase()
        );
        setCampaigns(mine);
      } catch (err) {
        console.error('Failed to load campaigns:', err);
        toast.error('Error loading campaigns.');
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, [address]);

  const handleDonation = async (
    e: React.FormEvent,
    campaignId: number
  ) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('amount') as HTMLInputElement;
    const amount = input.value.trim();

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error('Enter a valid ETH amount.');
      return;
    }

    try {
      setDonating(campaignId);
      await donateToCampaign(campaignId, amount);
      toast.success('🎉 Donation successful!');
      input.value = '';
    } catch (err: any) {
      console.error('Donation failed:', err);
      toast.error(err?.message || 'Donation failed.');
    } finally {
      setDonating(null);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-10 text-center">
          🎯 My Campaigns
        </h1>

        {!address ? (
          <p className="text-center text-gray-500">
            Please connect your wallet to view your campaigns.
          </p>
        ) : loading ? (
          <p className="text-center text-gray-500">Loading campaigns...</p>
        ) : campaigns.length === 0 ? (
          <p className="text-center text-gray-500">No campaigns found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.map((c) => {
              const raised = Number(c.amountCollected);
              const target = Number(c.targetAmount);
              const percent = Math.min((raised / target) * 100, 100).toFixed(1);
              const campaignId = Number(c.id);
              const isThisDonating = donating === campaignId;

              return (
                <div
                  key={campaignId}
                  className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 space-y-3"
                >
                  <h3 className="text-xl font-semibold text-gray-800">{c.title}</h3>
                  <p className="text-gray-600 text-sm">{c.description}</p>

                  <p className="text-sm text-gray-500">
                    🕒 Deadline:{' '}
                    {new Date(c.deadline * 1000).toLocaleDateString()}
                  </p>

                  <p className="text-sm text-gray-600 font-medium">
                    💰 Raised:{' '}
                    <span className="text-blue-600 font-semibold">
                      {ethers.utils.formatEther(raised.toString())} /{' '}
                      {ethers.utils.formatEther(target.toString())} ETH
                    </span>
                  </p>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <form
                    onSubmit={(e) => handleDonation(e, campaignId)}
                    className="flex gap-2 mt-2"
                  >
                    <input
                      type="number"
                      name="amount"
                      step="0.01"
                      placeholder="ETH amount"
                      disabled={isThisDonating}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
                    />
                    <button
                      type="submit"
                      disabled={isThisDonating}
                      className={`px-4 py-2 text-sm font-semibold rounded-md text-white ${
                        isThisDonating
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {isThisDonating ? 'Processing…' : 'Donate'}
                    </button>
                  </form>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
