import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Check, Timer } from 'lucide-react';

const TEMPLATES = {
  mini: {
    name: 'Mini Leg Blasters',
    exercises: [
      { name: 'Air Squats', reps: 10 },
      { name: 'Lunges (each leg)', reps: 10 },
      { name: 'Jump Lunges (each leg)', reps: 10 },
      { name: 'Jump Squats', reps: 5 },
    ]
  },
  full: {
    name: 'Full Leg Blasters',
    exercises: [
      { name: 'Air Squats', reps: 20 },
      { name: 'Lunges (each leg)', reps: 20 },
      { name: 'Jump Lunges (each leg)', reps: 20 },
      { name: 'Jump Squats', reps: 10 },
    ]
  }
};

export default function LegBlasters({ addWorkout }) {
  const [type, setType] = useState('mini');
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      // Optional: Play sound?
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(30);
    setTimerActive(true);
  };

  const logWorkout = () => {
    if (addWorkout) {
      addWorkout({
        type: 'Leg Blasters',
        details: `${TEMPLATES[type].name}`,
      });
      alert('Workout Logged!');
    } else {
      console.error("addWorkout function missing");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
        <Timer className="mr-2 text-orange-500" />
        Leg Blasters
      </h2>

      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setType('mini')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
            type === 'mini'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
          }`}
        >
          Mini
        </button>
        <button
          onClick={() => setType('full')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
            type === 'full'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
          }`}
        >
          Full
        </button>
      </div>

      <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg">
        {TEMPLATES[type].exercises.map((ex, idx) => (
          <div key={idx} className="flex justify-between items-center border-b border-gray-200 last:border-0 pb-2 last:pb-0">
            <span className="text-gray-700 font-medium">{ex.name}</span>
            <span className="font-bold text-blue-600">{ex.reps}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between space-x-4 mb-6">
        <div className="flex flex-col items-center justify-center w-24 h-24 bg-gray-100 rounded-full border-4 border-orange-100">
          <span className="text-2xl font-mono font-bold text-gray-900">{timeLeft}s</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wide">Rest</span>
        </div>
        <button
          onClick={startTimer}
          disabled={timerActive}
          className={`flex-1 h-14 flex items-center justify-center px-4 rounded-lg font-bold uppercase tracking-wider transition-all shadow-sm ${
            timerActive
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-md'
          }`}
        >
          {timerActive ? 'Resting...' : 'Start Rest (30s)'}
        </button>
      </div>

      <button
        onClick={logWorkout}
        className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors shadow-sm"
      >
        <Check className="w-5 h-5 mr-2" />
        Log Completed Set
      </button>
    </div>
  );
}
