"use client";
import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Card, CardContent } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import NavBar from "../components/NavBar";
import { firestore } from "../firebase";

const Page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const parametersSnapshot = await firestore
          .collection("parameter_db")
          .get();
        const parametersData = parametersSnapshot.docs.map((doc) => doc.data());
        setData(parametersData);
      } catch (error) {
        console.error("Error fetching parameters:", error);
      }
    };

    fetchParameters();
  }, []);

  const chartProperties = [
    {
      key: "pH",
      name: "pH",
      stroke: "#90EE90",
      yAxisLabel: "pH",
      thresholdMin: 6.5,
      thresholdMax: 7.5,
    },
    {
      key: "temperature",
      name: "Temperature",
      stroke: "#ADD8E6",
      yAxisLabel: "°C",
      thresholdMin: 25,
      thresholdMax: 35,
    },
    {
      key: "NH3",
      name: "Ammonia (NH3)",
      stroke: "green",
      yAxisLabel: "mg/L",
      thresholdMax: 0.5,
    },
    {
      key: "DO",
      name: "Dissolved O2 (DO)",
      stroke: "#FFD700",
      yAxisLabel: "mg/L",
      thresholdMin: 5,
    },
  ];

  return (
    <div
      style={{
        background: `url('https://images.unsplash.com/photo-1532787799187-93655e51d472?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG9jZWFuJTIwd2F0ZXJ8ZW58MHx8MHx8fDA%3D')`,
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <NavBar />
      <Typography
        variant="h4"
        align="center"
        sx={{
          color: "white",
          mt: 10,
          mb: 3,
        }}
        fontSize="3rem"
      >
        Water Parameters
      </Typography>
      <Container maxWidth="lg">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box display="flex" justifyContent="center" flexWrap="wrap">
            {chartProperties.slice(0, 2).map((chart, index) => (
              <Box key={index} width={300} mx={2} my={2}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="h6"
                      align="center"
                      sx={{ color: "black" }}
                    >
                      {chart.name} wrt Time
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: "black" }}
                          axisLine={{ stroke: "#333" }}
                        />
                        <YAxis
                          tick={{ fill: "black" }}
                          axisLine={{ stroke: "#333" }}
                          label={{
                            value: chart.yAxisLabel,
                            angle: -90,
                            position: "insideLeft",
                            fill: "#FFFFFF",
                          }}
                        />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey={chart.key}
                          name={chart.name}
                          stroke={chart.stroke}
                          strokeWidth={2}
                        />
                        {chart.thresholdMin && (
                          <ReferenceLine
                            y={chart.thresholdMin}
                            stroke="red"
                            strokeDasharray="3 3"
                          />
                        )}
                        {chart.thresholdMax && (
                          <ReferenceLine
                            y={chart.thresholdMax}
                            stroke="red"
                            strokeDasharray="3 3"
                          />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
          <Box display="flex" justifyContent="center" flexWrap="wrap">
            {chartProperties.slice(2).map((chart, index) => (
              <Box key={index} width={300} mx={2} my={2}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="h6"
                      align="center"
                      sx={{ color: "black" }}
                    >
                      {chart.name} wrt Time
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: "black" }}
                          axisLine={{ stroke: "#333" }}
                        />
                        <YAxis
                          tick={{ fill: "black" }}
                          axisLine={{ stroke: "#333" }}
                          label={{
                            value: chart.yAxisLabel,
                            angle: -90,
                            position: "insideLeft",
                            fill: "#FFFFFF",
                          }}
                        />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey={chart.key}
                          name={chart.name}
                          stroke={chart.stroke}
                          strokeWidth={2}
                        />
                        {chart.thresholdMin && (
                          <ReferenceLine
                            y={chart.thresholdMin}
                            stroke="red"
                            strokeDasharray="3 3"
                          />
                        )}
                        {chart.thresholdMax && (
                          <ReferenceLine
                            y={chart.thresholdMax}
                            stroke="red"
                            strokeDasharray="3 3"
                          />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Page;
