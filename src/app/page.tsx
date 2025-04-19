'use client';

export default function HomePage() {
  const campaigns = [
    {
      title: 'Tuition Help for Final Semester',
      description: 'Need help covering my final semester tuition at Penn State.',
      target: '2 ETH',
    },
    {
      title: 'Laptop for Data Science Course',
      description: 'Raising funds to purchase a reliable laptop for coursework.',
      target: '1.5 ETH',
    },
    {
      title: 'Funding for AI Research Conference',
      description: 'Need travel and registration support for presenting research.',
      target: '1 ETH',
    },
  ];

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

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
        {campaigns.map((c, i) => (
          <div
            key={i}
            className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-blue-100"
          >
            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
              {c.title}
            </h3>
            <p className="mt-2 text-gray-600 text-base leading-relaxed">
              {c.description}
            </p>
            <div className="mt-4 text-right">
              <span className="inline-block text-sm font-semibold text-blue-600 group-hover:text-purple-600 transition">
                🎯 Target: <span className="bg-blue-100 px-2 py-1 rounded-md">{c.target}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
