import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartPanel = ({ repos }) => {
  const topRepos = repos.slice(0, 10);

  const data = {
    labels: topRepos.map(r => r.name),
    datasets: [
      {
        label: 'Stars',
        data: topRepos.map(r => r.stargazers_count),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
      {
        label: 'Forks',
        data: topRepos.map(r => r.forks_count),
        backgroundColor: 'rgba(34, 197, 94, 0.7)',
      },
      {
        label: 'Open Issues',
        data: topRepos.map(r => r.open_issues_count),
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
      }
    ]
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">📊 Top Repositories Overview</h2>
      <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
    </div>
  );
};

export default ChartPanel;