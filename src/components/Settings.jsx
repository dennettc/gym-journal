import React from 'react';
import { Download } from 'lucide-react';

export default function Settings({ settings, updateSettings, exportToCSV }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Ensure tjtMax is stored as a number
    const val = name === 'tjtMax' ? parseInt(value) || 0 : value;
    updateSettings({ [name]: val });
  };

  const phases = [
    { id: '1', name: 'Phase 1: Capacity', desc: 'Build aerobic base and strength endurance.' },
    { id: '2', name: 'Phase 2: Utilization', desc: 'Convert strength to power and explosive movement.' },
    { id: '3', name: 'Phase 3: Maintenance', desc: 'Maintain fitness during the season.' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Settings</h2>

      {/* Phase Selection */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <label className="block text-lg font-semibold text-gray-800 mb-3">
          Training Phase
        </label>
        <div className="space-y-3">
          {phases.map((phase) => (
            <label
              key={phase.id}
              className={`flex items-start p-3 rounded-lg border cursor-pointer transition-colors ${
                settings.phase === phase.id
                  ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-200'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <input
                name="phase"
                type="radio"
                value={phase.id}
                checked={settings.phase === phase.id}
                onChange={handleChange}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div className="ml-3">
                <span className="block text-sm font-medium text-gray-900">
                  {phase.name}
                </span>
                <span className="block text-xs text-gray-500 mt-1">
                  {phase.desc}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* TJT Calculator Settings */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <label htmlFor="tjtMax" className="block text-lg font-semibold text-gray-800 mb-2">
          TJT 2-Minute Max Reps
        </label>
        <p className="text-sm text-gray-500 mb-4">
          Enter your maximum reps from a 2-minute Triple Jump Tuck test.
          This value is used to calculate your daily EMOM targets.
        </p>
        <div className="relative rounded-md shadow-sm">
          <input
            type="number"
            name="tjtMax"
            id="tjtMax"
            min="0"
            value={settings.tjtMax}
            onChange={handleChange}
            className="focus:ring-blue-500 focus:border-blue-500 block w-full text-lg border-gray-300 rounded-md p-3 border"
            placeholder="0"
          />
        </div>
      </div>

      {/* Data Export */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Management</h3>
        <p className="text-sm text-gray-500 mb-4">
          Download all your recorded workouts as a CSV file.
        </p>
        <button
          onClick={exportToCSV}
          className="w-full flex justify-center items-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
          <Download className="-ml-1 mr-2 h-5 w-5" />
          Export to CSV
        </button>
      </div>
    </div>
  );
}
