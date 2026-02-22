import React from 'react';
import { Calculator, Check } from 'lucide-react';

export default function TJTCalculator({ tjtMax, addWorkout }) {
  const target = Math.round((tjtMax || 0) * 0.25);

  const logWorkout = () => {
    if (addWorkout) {
      addWorkout({
        type: 'TJT EMOM',
        details: `Target: ${target} reps`,
      });
      alert('Workout Logged!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
        <Calculator className="mr-2 text-blue-500" />
        TJT Calculator
      </h2>

      <div className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-xl border border-blue-100 mb-6">
        <span className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">
          Your 25% EMOM Target
        </span>
        <span className="text-5xl font-extrabold text-blue-600">
          {target}
        </span>
        <span className="text-xs text-gray-400 mt-2">
          Based on Max: {tjtMax || 0}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-6 text-center">
        Perform {target} Triple Jump Tucks every minute on the minute.
      </p>

      <button
        onClick={logWorkout}
        disabled={!target}
        className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-bold transition-colors shadow-sm ${
          target > 0
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        <Check className="w-5 h-5 mr-2" />
        Log TJT Session
      </button>
    </div>
  );
}
