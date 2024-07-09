import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

const LineChart = ({ chartData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];
    if (chartData) {
      chartData.map((item) => {
        dataCopy.push([new Date(item[0]).toLocaleDateString().slice(0, -5), item[1]]);
      });
    }
    setData(dataCopy);
  }, [chartData]);


  const color = "#FFF";
  const options = {
        colors: ['cyan' ,'green'],
    legend: {
            textStyle: { color:color , bold: true},
    },
    backgroundColor: {
      fillOpacity: 0.0,
    },
    hAxis: {
      title: "Date",
    },
    vAxis: {
      title: "Price",
    },
    vAxis: {
      textStyle: { color: color },
    },
    hAxis: {
      textStyle: { color: color },
    },
  };

  return (
    <Chart chartType="LineChart" data={data} options={options} legendToggle />
  );
};

export default LineChart;
