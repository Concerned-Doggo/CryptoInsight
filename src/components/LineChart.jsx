import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

const LineChart = ({  chartData }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log('c', chartData)
        let dataCopy = [["Date", "Prices"]];
        if(chartData){
            chartData.map((item) => {
                dataCopy.push([new Date(item[0]).toLocaleDateString(), item[1]]);
            })
        }
        setData(dataCopy)
    }, [chartData]);

  return (
    <Chart
      chartType="LineChart"
      height="100%"
      width={"80%"}
      data={data}
      legendToggle
      options={{
        colors: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
        backgroundColor: {
          fillOpacity: 0.0,
        },
      }}
    />
  );
};

export default LineChart;
