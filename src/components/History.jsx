import React from 'react';
import { Download, Calendar, Activity } from 'lucide-react';

export default function History({ workouts, exportToCSV }) {
  if (!workouts || workouts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 text-center px-4">
        <div className="bg-gray-100 p-4 rounded-full mb-4">
          <Activity className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No workouts yet</h3>
        <p className="text-gray-500 max-w-xs">
          Your training log is empty. Head to the Dashboard to log your first session!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Workout History</h2>
        <button
          onClick={exportToCSV}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Download className="w-3 h-3 mr-1.5" />
          Export CSV
        </button>
      </div>

      <div className="space-y-4">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${
                  workout.type.includes('Leg Blasters') ? 'bg-orange-500' : 'bg-blue-500'
                }`} />
                <h3 className="font-bold text-gray-900 text-lg">{workout.type}</h3>
              </div>
              <span className="text-xs font-medium text-gray-400 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(workout.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-3 pl-4 border-l-2 border-gray-100">
              {workout.details}
            </p>

            <div className="flex items-center pl-4">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                Phase {workout.phase || 'N/A'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
