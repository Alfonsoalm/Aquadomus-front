import { useState, useMemo } from "react";
import { formatDateInput, formatDateTime } from "../utils/formatUtils";

const useChart = (sensorHistory) => {
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const [startDate, setStartDate] = useState(formatDateInput(todayStart));
  const [endDate, setEndDate] = useState(formatDateInput(now));

  const filteredHistory = useMemo(() => {
    return sensorHistory.filter((data) => {
      const dataDate = new Date(data.fecha_hora);
      return (
        (!startDate || dataDate >= new Date(startDate)) &&
        (!endDate || dataDate <= new Date(endDate))
      );
    });
  }, [sensorHistory, startDate, endDate]);

  const sensorUnits = sensorHistory.length > 0 ? sensorHistory[0].unidades : "";
  const rawSensorName = sensorHistory.length > 0 ? sensorHistory[0].nombre : "";
  const sensorName = rawSensorName.replace(/^sensor\./, "");

  const chartData = useMemo(() => ({
    labels: filteredHistory.map((data) => formatDateTime(data.fecha_hora)),
    datasets: [
      {
        label: `Valor del sensor ${sensorName} (${sensorUnits})`,
        data: filteredHistory.map((data) => parseFloat(data.valor)),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  }), [filteredHistory, sensorName, sensorUnits]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 16 },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: { size: 12 },
          maxRotation: 45,
          minRotation: 45,
          maxTicksLimit: 10,
        },
        title: {
          display: true,
          text: "Fecha y hora",
          font: { size: 16, weight: "bold" },
        },
      },
      y: {
        ticks: {
          font: { size: 14 },
          callback: (value) => `${value}`,
        },
        title: {
          display: true,
          text: `Valor (${sensorUnits})`,
          font: { size: 16, weight: "bold" },
        },
      },
    },
  };

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    sensorName,
    sensorUnits,
    chartData,
    chartOptions,
  };
};

export default useChart;
