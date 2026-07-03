import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const PerformanceChart = ({ history }) => {
  const labels = history.map((item, index) => `Interview ${index + 1}`);

  const scores = history.map((item) => item.totalScore);

  const data = {
    labels,
    datasets: [
      {
        label: "Interview Score",
        data: scores,
        borderColor: "#2563eb",
        backgroundColor: "#93c5fd",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        Performance Analytics
      </h2>

      <Line data={data} />
    </div>
  );
};

export default PerformanceChart;