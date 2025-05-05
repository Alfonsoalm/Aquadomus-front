import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from "chart.js";
import useChart from "../hooks/useChart";
import styles from "../styles/SensorHistoryChart.module.css";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SensorHistoryChart = ({ sensorHistory }) => {
  const { 
    startDate, 
    endDate, 
    setStartDate, 
    setEndDate, 
    sensorName, 
    chartData, 
    chartOptions } = useChart(sensorHistory);
  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Historial del Sensor {sensorName}</h2>

      <div className={styles.filters}>
        <div>
          <label className={styles.label}>Desde:</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}>Hasta:</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.chartContainer}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};


export default SensorHistoryChart;
