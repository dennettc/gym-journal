import { useState, useEffect } from 'react';

const STORAGE_KEY = 'ski_journal_data';

const DEFAULT_SETTINGS = {
  phase: '1', // '1', '2', or '3'
  tjtMax: 0,
};

export function useSkiJournal() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : { settings: DEFAULT_SETTINGS, workouts: [] };
    } catch (e) {
      console.error("Failed to parse local storage", e);
      return { settings: DEFAULT_SETTINGS, workouts: [] };
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addWorkout = (workout) => {
    setData(prev => ({
      ...prev,
      workouts: [
        {
          id: Date.now(),
          date: new Date().toISOString(),
          phase: prev.settings.phase,
          ...workout
        },
        ...prev.workouts
      ]
    }));
  };

  const updateSettings = (newSettings) => {
    setData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  };

  const exportToCSV = () => {
    if (data.workouts.length === 0) {
      alert("No workouts to export!");
      return;
    }

    const headers = ['Date', 'Phase', 'Type', 'Details'];
    const rows = data.workouts.map(w => [
      new Date(w.date).toLocaleString(),
      w.phase,
      w.type,
      `"${(w.details || '').replace(/"/g, '""')}"` // Escape quotes in details
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'ski_journal_export.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return {
    settings: data.settings,
    workouts: data.workouts,
    addWorkout,
    updateSettings,
    exportToCSV
  };
}
