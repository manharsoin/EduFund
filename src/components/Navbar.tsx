'use client';

import Link from 'next/link';
import { useWallet } from '@/hooks/useWallet';

export default function Navbar() {
  const { address, connect } = useWallet();

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-700">
          EduFund
        </Link>

        <nav className="flex items-center gap-6">
          {[
            { path: '/', label: 'Home' },
            { path: '/create', label: 'Create Campaign' },
            { path: '/dashboard', label: 'Dashboard' },
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="relative group text-gray-700 hover:text-blue-600 font-medium text-sm transition-all duration-200"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          ))}

          <button
            onClick={connect}
            className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200 shadow-sm"
          >
            {address
              ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`
              : 'Connect Wallet'}
          </button>
        </nav>
      </div>
    </header>
  );
}
