import { getEduFundContract } from './contract';
import { ethers } from 'ethers';

export const donateToCampaign = async (campaignId: number, amountInEth: string) => {
  try {
    const contract = await getEduFundContract();
    if (!contract) {
      alert("Wallet not connected.");
      return;
    }

    if (!amountInEth || isNaN(Number(amountInEth)) || Number(amountInEth) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    const tx = await contract.donateToCampaign(campaignId, {
      value: ethers.utils.parseEther(amountInEth),
    });

    await tx.wait();
    alert("✅ Donation successful!");
  } catch (err: any) {
    console.error("Donation failed:", err);
    alert(err?.reason || err?.message || "Donation failed.");
  }
};
