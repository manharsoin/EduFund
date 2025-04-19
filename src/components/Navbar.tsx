'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-extrabold text-blue-600 tracking-tight hover:text-blue-800 transition duration-200">
          EduFund
        </Link>

        <div className="flex space-x-8">
          {[
            { href: '/', label: 'Home' },
            { href: '/create', label: 'Create Campaign' },
            { href: '/dashboard', label: 'Dashboard' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative text-gray-700 font-medium hover:text-blue-600 transition duration-200 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-blue-500 hover:before:w-full before:transition-all before:duration-300"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
