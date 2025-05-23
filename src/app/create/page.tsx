// Page component for submitting a new fundraising campaign via the EduFund smart contract.
'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import toast, { Toaster } from 'react-hot-toast';
import { getEduFundContract } from '@/utils/contract';

export default function CreateCampaignPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const amount = parseFloat(targetAmount);

    if (!trimmedTitle || !trimmedDescription || isNaN(amount) || amount <= 0) {
      toast.error('Please fill out all fields correctly.');
      return;
    }

    const contract = await getEduFundContract();
    if (!contract) {
      toast.error('Wallet not connected.');
      return;
    }

    try {
      setIsSubmitting(true);

      const parsedAmount = ethers.utils.parseEther(targetAmount);
      const deadlineUnix = Math.floor(new Date(deadline).getTime() / 1000);
      const now = Math.floor(Date.now() / 1000);

      if (deadlineUnix <= now) {
        toast.error('Deadline must be in the future.');
        return;
      }

      const tx = await contract.createCampaign(
        trimmedTitle,
        trimmedDescription,
        parsedAmount,
        deadlineUnix
      );

      await tx.wait();

      toast.success('🎉 Campaign created successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setTargetAmount('');
      setDeadline('');
    } catch (err: any) {
      console.error('Campaign creation failed:', err);
      toast.error(err?.message || 'Campaign creation failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <Toaster position="top-center" />
      <main className="max-w-2xl mx-auto mt-12 mb-12 px-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Create New Campaign</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-lg border border-gray-200 shadow-sm"
        >
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Campaign Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Final Semester Tuition"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tell your story and why you need funding"
            />
          </div>

          <div>
            <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Target Amount (ETH)
            </label>
            <input
              type="number"
              id="targetAmount"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              required
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 1.5"
            />
          </div>

          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              min={today}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSubmitting ? 'Creating…' : 'Create Campaign'}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
