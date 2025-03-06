import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {  Container, Row, Col } from "react-bootstrap";
import SelectMonth from "../component/SelectMonth";
import { monthsOptions,API_URL } from "../constant";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProductBarChartScreen = () => {
  const [month, setMonth] = useState("01");
  const [barChartData, setBarChartData] = useState([]);

  const fetchProductsBarChartData = async (month) => {
    try {
      const response = await fetch(
        `${API_URL}products/barChart/${month}`
      );
      const data = await response.json();
      const result = data?.data;
      setBarChartData(result);
    } catch (error) {
      console.error(`Error while fetching stats`, error);
    }
  };

  useEffect(() => {
    fetchProductsBarChartData(month);
  }, [month]);

  const data = {
    labels: [
      "0-100",
      "101-200",
      "201-300",
      "301-400",
      "401-500",
      "501-600",
      "601-700",
      "701-800",
      "801-900",
      "901-above",
    ],
    datasets: [
      {
        label: "Product",
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Adjust color as needed
        borderColor: "rgba(54, 162, 235, 1)", // Adjust color as needed
        borderWidth: 1,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.8)", // Adjust color as needed
        hoverBorderColor: "rgba(54, 162, 235, 1)", // Adjust color as needed
        data: barChartData, // Example data, replace with your actual data
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Simple Bar Chart",
      },
    },
    scales: {
      x: {
        type: "category", // Specify the scale type as 'category'
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Container>
      <div className="w-75 mx-auto ">
        <Row>
        <Col>
            <h2>Bar chart stats</h2>
        </Col>
         <Col>
         <SelectMonth
            month={month}
            setMonth={setMonth}
            options={monthsOptions}
            onValueChange={setMonth}
          />
         </Col>
        </Row>
        <Bar data={data} options={options} />
      </div>
    </Container>
  );
};

export default ProductBarChartScreen;
