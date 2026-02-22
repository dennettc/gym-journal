import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Settings from './components/Settings';
import { useSkiJournal } from './hooks/useSkiJournal';

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const { settings, workouts, addWorkout, updateSettings, exportToCSV } = useSkiJournal();

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard settings={settings} addWorkout={addWorkout} />;
      case 'history':
        return <History workouts={workouts} exportToCSV={exportToCSV} />;
      case 'settings':
        return <Settings settings={settings} updateSettings={updateSettings} exportToCSV={exportToCSV} />;
      default:
        return <Dashboard settings={settings} addWorkout={addWorkout} />;
    }
  };

  return (
    <Layout currentTab={currentTab} setCurrentTab={setCurrentTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;
