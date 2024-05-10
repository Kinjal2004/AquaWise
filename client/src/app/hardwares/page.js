"use client";
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Navbar from "../components/NavBar";

const HardwarePage = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardClick = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  const handleButtonClick = (index) => {
    setExpandedCard(index);
  };

  const cardsData = [
    {
      index: 0,
      title: "Advanced Sensors",
      description:
        "Our sensors are equipped with cutting-edge technology to accurately measure key parameters such as water temperature, pH levels, dissolved oxygen, and more.",
      image:
        "https://imgopt.infoq.com/fit-in/3000x4000/filters:quality(85)/filters:no_upscale()/articles/iot-sensors-enterprise/en/resources/1jorge-ramirez-hGSQCg8PRPg-unsplash-1645633720457.jpeg",
    },
    {
      index: 1,
      title: "Powerful Microprocessors",
      description:
        "Our microprocessors enable real-time data processing and analysis, allowing you to make informed decisions quickly.",
      image:
        "https://images.unsplash.com/photo-1610878785620-3ab2d3a2ae7b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWljcm9wcm9jZXNzb3J8ZW58MHx8MHx8fDA%3D",
    },
    {
      index: 2,
      title: "Easy Integration",
      description:
        "Our hardware solutions seamlessly integrate with your existing pond management systems, providing a hassle-free experience.",
      image:
        "https://images.unsplash.com/photo-1555617766-c94804975da3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhhcmR3YXJlfGVufDB8fDB8fHww",
    },
    {
      index: 3,
      title: "Scalability",
      description:
        "Whether you have a small backyard pond or a large commercial aquaculture operation, our hardware solutions can be scaled to meet your needs.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ942EOX5ZzF08TvF2GU9gl0mVVS2ATb3LNU0jVgHD81g&s",
    },
  ];

  return (
    <div
      style={{
        background: `url('https://st4.depositphotos.com/1005793/27345/i/450/depositphotos_273454888-stock-photo-underwater-view-coral-reef-life.jpg')`,
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Router basename="/">
        <Navbar />
        <div style={{ textAlign: "center", padding: "20px", color: "white" }}>
          <Typography
            variant="h3"
            gutterBottom
            style={{ marginTop: "80px", fontFamily: "Roboto" }}
          >
            Effective Pond Management with Our Hardware Solutions
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{ fontFamily: "Roboto" }}
          >
            Welcome to our hardware page dedicated to helping you achieve
            effective pond management!
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{ fontFamily: "Roboto" }}
          >
            Our hardware solutions are designed to provide you with the tools
            you need to monitor and control various aspects of your pond
            environment, ensuring optimal conditions for your aquatic life.
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            style={{ fontFamily: "Roboto", marginTop: "30px" }}
          >
            Why Choose Our Hardware Solutions?
          </Typography>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "20px" }}
          >
            {cardsData.map((card) => (
              <Card
                key={card.index}
                style={{
                  width: "250px",
                  backgroundColor: "#212121",
                  cursor: "pointer",
                  boxShadow:
                    expandedCard === card.index
                      ? "0 4px 8px 0 rgba(0,0,0,0.2)"
                      : "0 2px 4px 0 rgba(0,0,0,0.2)",
                }}
                onClick={() => handleCardClick(card.index)}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    style={{ color: "white", fontFamily: "Roboto" }}
                  >
                    {card.title}
                  </Typography>
                  {expandedCard === card.index ? (
                    <>
                      <Typography
                        variant="body2"
                        style={{
                          color: "white",
                          marginBottom: "10px",
                          fontFamily: "Roboto",
                        }}
                      >
                        {card.description}
                      </Typography>
                      <CardMedia
                        component="img"
                        height="200"
                        image={card.image}
                        alt={card.title}
                        style={{ marginTop: "10px" }}
                      />
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => handleButtonClick(card.index)}
                      style={{
                        marginTop: card.index === 1 ? "10px" : "42px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        fontFamily: "Roboto",
                      }}
                    >
                      Click to know more
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <Typography
            variant="h4"
            gutterBottom
            style={{ marginTop: "20px", color: "white", fontFamily: "Roboto" }}
          >
            Register Now for Exclusive Access!
          </Typography>
          <Button
            variant="contained"
            onClick={() => handleRegistration()}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              margin: "10px",
              fontFamily: "Roboto",
            }}
          >
            Register Now
          </Button>
        </div>
      </Router>
    </div>
  );
};

const handleRegistration = () => {
  window.location.href = "/Signin";
  console.log("Redirecting to registration page...");
};

export default HardwarePage;
