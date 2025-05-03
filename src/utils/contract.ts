import { ethers } from 'ethers';

const contractAddress = "0x934eda0d7cb6b2467cc4e904a7b698b11078bb14";

const contractABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "campaignId", type: "uint256" },
      { indexed: true, internalType: "address", name: "owner", type: "address" }
    ],
    name: "CampaignCreated",
    type: "event"
  },
  {
    inputs: [
      { internalType: "string", name: "_title", type: "string" },
      { internalType: "string", name: "_description", type: "string" },
      { internalType: "uint256", name: "_targetAmount", type: "uint256" },
      { internalType: "uint256", name: "_deadline", type: "uint256" }
    ],
    name: "createCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_campaignId", type: "uint256" }
    ],
    name: "donateToCampaign",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "campaignId", type: "uint256" },
      { indexed: true, internalType: "address", name: "donor", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "DonationReceived",
    type: "event"
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" }
    ],
    name: "campaigns",
    outputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "string", name: "title", type: "string" },
      { internalType: "string", name: "description", type: "string" },
      { internalType: "uint256", name: "targetAmount", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint256", name: "amountCollected", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getCampaigns",
    outputs: [
      {
        components: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "string", name: "title", type: "string" },
          { internalType: "string", name: "description", type: "string" },
          { internalType: "uint256", name: "targetAmount", type: "uint256" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
          { internalType: "uint256", name: "amountCollected", type: "uint256" }
        ],
        internalType: "struct EduFund.Campaign[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

export const getEduFundContract = async () => {
  if (typeof window === "undefined" || !(window as any).ethereum) return null;

  await (window as any).ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};
