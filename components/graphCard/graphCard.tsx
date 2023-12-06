import classes from "./GraphCard.module.css";
import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";
export default function GraphCard({ studentVector, bookVector, bookNames }) {
  const chartRef = useRef(null);
  const bookColors = ["red", "blue", "green", "pink", "yellow"];
  const books = bookVector.map((value, index) => {
    return {
      label: bookNames[index],
      data: [{ x: value[0], y: value[1] }],
      backgroundColor: bookColors[index],
      pointRadius: 4,
    };
  });
  useEffect(() => {
    let chartInstance: any;

    if (chartRef.current) {
      const cnt: any = chartRef.current;
      const ctx = cnt.getContext("2d") as CanvasRenderingContext2D;
      if (chartInstance) {
        chartInstance.destroy();
      }
      console.log(window.innerWidth);
      chartInstance = new Chart(ctx, {
        type: "scatter",
        data: {
          datasets: [
            {
              label: "Student A",
              data: [{ x: studentVector[0], y: studentVector[1] }],
              backgroundColor: "blue",
              pointRadius: 4,
            },
            ...books,
          ],
        },
        options: {
          scales: {
            x: {
              type: "linear",
              position: "bottom",
              title: {
                display: true,
                text: "Parameter 1",
              },
            },
            y: {
              type: "linear",
              position: "left",
              title: {
                display: true,
                text: "Parameter 2",
              },
            },
          },
        },
      });
    }
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [studentVector, bookVector]);

  return (
    <div className={classes.graphCard}>
      <canvas ref={chartRef} className={classes.canva}></canvas>
    </div>
  );
}
