'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (!(window as any).ethereum) return;
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    provider.listAccounts().then((accounts) => {
      if (accounts.length > 0) setAddress(accounts[0]);
    });
  }, []);

  const connect = async () => {
    if (!(window as any).ethereum) {
      alert('Please install MetaMask');
      return;
    }
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    if (accounts.length > 0) setAddress(accounts[0]);
  };

  return { address, connect };
}
