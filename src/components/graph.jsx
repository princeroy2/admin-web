import React, { useEffect, useState } from 'react';
import fetchUsers from '../apis/api_1st';
import { fetchdriver, fetchadmin, fetchvehical } from '../apis/api_1st';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminVehicleChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = [];

        for (let i = 0; i < 3; i++) {
          const users = await fetchUsers();
          const driver = await fetchdriver();
          const admin = await fetchadmin();
          const vehicle = await fetchvehical();

          stats.push({
            Admin: admin,
            User: users.length,
            Driver: driver.length,
            Vehicle: vehicle.totalCount,
          });

          await new Promise((resolve) => setTimeout(resolve, 300));
        }

        const labels = ['Time 1', 'Time 2', 'Time 3'];

        const datasetTemplate = (label, color, values) => ({
          label,
          data: values,
          borderColor: color,
          backgroundColor: color + '33', // semi-transparent fill
          fill: true,
          tension: 0.4,
          pointBackgroundColor: color,
        });

        const data = {
          labels,
          datasets: [
            datasetTemplate('Admin', 'rgba(255, 99, 132, 1)', stats.map(s => s.Admin)),
            datasetTemplate('User', 'rgba(54, 162, 235, 1)', stats.map(s => s.User)),
            datasetTemplate('Driver', 'rgba(255, 206, 86, 1)', stats.map(s => s.Driver)),
            datasetTemplate('Vehicle', 'rgba(75, 192, 192, 1)', stats.map(s => s.Vehicle)),
          ],
        };

        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'System Overview: Admin / User / Driver / Vehicle',
        color: '#ffffff',
      },
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#ffffff' },
      },
      x: {
        ticks: { color: '#ffffff' },
      },
    },
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '600px',
        height: '300px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#1f1f2e', // custom dark background
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
      }}
    >
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p style={{ color: '#fff' }}>Loading chart...</p>
      )}
    </div>
  );
};

export default AdminVehicleChart;
