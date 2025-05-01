import { PieChart } from 'react-minimal-pie-chart';

const MaintenancePieChart = ({ lastMaintenance, nextMaintenance }) => {
  const now = new Date();
  const lastDate = new Date(lastMaintenance);
  const nextDate = new Date(nextMaintenance);

  const isMaintenanceDue = now >= nextDate;
  const data = [
    { title: 'Maintenance Due', value: isMaintenanceDue ? 100 : 0, color: '#ff0000' },
    { title: 'Upcoming Maintenance', value: isMaintenanceDue ? 0 : 100, color: '#00ff00' },
  ];

  return (
    <div className="w-64 h-64 mx-auto">
      <PieChart
        data={data}
        lineWidth={20}
        label={({ data, dataIndex }) => data[dataIndex].title}
        labelStyle={{
          fontSize: '5px',
          fontFamily: 'sans-serif',
          fill: '#fff',
        }}
        radius={40}
        segmentsShift={2}
      />
    </div>
  );
};
export default MaintenancePieChart;