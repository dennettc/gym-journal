import React from 'react';
import LegBlasters from './LegBlasters';
import TJTCalculator from './TJTCalculator';

export default function Dashboard({ settings, addWorkout }) {
  const { phase, tjtMax } = settings;

  const phaseDetails = {
    '1': {
      title: 'Capacity',
      description: 'Build aerobic base and strength endurance with high volume.',
      color: 'from-blue-600 to-blue-800'
    },
    '2': {
      title: 'Utilization',
      description: 'Convert strength to power and explosive movement.',
      color: 'from-purple-600 to-purple-800'
    },
    '3': {
      title: 'Maintenance',
      description: 'Maintain fitness levels during the season.',
      color: 'from-green-600 to-green-800'
    }
  };

  const currentPhase = phaseDetails[phase] || phaseDetails['1'];

  return (
    <div className="space-y-6 pb-20">
      {/* Phase Header */}
      <div className={`bg-gradient-to-r ${currentPhase.color} rounded-2xl p-6 text-white shadow-lg`}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-extrabold mb-1 tracking-tight">Phase {phase}</h2>
            <h3 className="text-xl font-medium opacity-90 mb-3">{currentPhase.title}</h3>
            <p className="text-white/80 text-sm leading-relaxed max-w-md">
              {currentPhase.description}
            </p>
          </div>
        </div>
      </div>

      {/* Workout Tools */}
      <div className="grid gap-6 lg:grid-cols-2">
        <LegBlasters addWorkout={addWorkout} />
        <TJTCalculator tjtMax={tjtMax} addWorkout={addWorkout} />
      </div>
    </div>
  );
}
