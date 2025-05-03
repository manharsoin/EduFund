'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function WalletConnectButton({
  onConnected,
}: {
  onConnected?: (address: string) => void;
}) {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (!(window as any).ethereum) return;
    (async () => {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        onConnected?.(accounts[0]);
      }
    })();
  }, []);

  const connect = async () => {
    if (!(window as any).ethereum) {
      alert('Please install MetaMask');
      return;
    }
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    if (accounts.length > 0) {
      setAddress(accounts[0]);
      onConnected?.(accounts[0]);
    }
  };

  return (
    <button
      onClick={connect}
      className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
    >
      {address ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
    </button>
  );
}
