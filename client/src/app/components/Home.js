// HeroCenter.js
import React from "react";
import { Button } from "@mui/material";

const HeroCenter = ({ isUserSignedIn }) => {
  // Function to handle explore button click
  const handleExplore = () => {
    // Scroll to the target component with the id "services"
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative h-[660px] w-full flex items-center justify-center text-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url(https://cdn.pixabay.com/photo/2016/11/29/09/43/koi-fish-1868779_640.jpg)",
      }}
    >
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-65"></div>

      <main className="px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <h2 className="text-4xl tracking-tight leading-10 font-medium sm:text-5xl text-white sm:leading-none md:text-6xl font-bold font-serif">
            Pond Monitoring<span className="text-yellow-400"> Redefined</span>
          </h2>
          <p className="mt-3 text-white sm:mt-5 sm:text-md sm:max-w-xl sm:mx-auto md:mt-5 font-semibold font-mono">
            Explore cutting-edge monitoring technologies tailored to your scale,
            built on industry-leading standards
          </p>
        </div>
        {isUserSignedIn ? (
          <Button
            variant="contained"
            sx={{ margin: "50px" }}
            onClick={handleExplore}
          >
            Explore
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ margin: "50px" }}
            onClick={() => (window.location.href = "/Signin")}
          >
            Sign In
          </Button>
        )}
      </main>
    </div>
  );
};

export default HeroCenter;
