import { getEduFundContract } from './contract';

export const fetchCampaigns = async () => {
  try {
    const contract = await getEduFundContract();
    if (!contract) return [];

    const campaigns = await contract.getCampaigns();

    return campaigns.map((c: any, index: number) => ({
      id: index,
      owner: c.owner,
      title: c.title,
      description: c.description,
      targetAmount: c.targetAmount.toString(),
      deadline: Number(c.deadline),
      amountCollected: c.amountCollected.toString(),
    }));
  } catch {
    return [];
  }
};
