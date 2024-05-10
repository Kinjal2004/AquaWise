import React from "react";

const componentData = [
  {
    title: "Affordable Hardware",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {/* Icon paths */}
      </svg>
    ),
  },
  {
    title: "Intelligent Monitoring",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {/* Icon paths */}
      </svg>
    ),
  },
  {
    title: "Disease Prediction",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {/* Icon paths */}
      </svg>
    ),
  },
];

function Services() {
  const handleExplorePrediction = () => {
    window.location.href = "/fish-disease-prediction";
  };

  const handleExploreParameter = () => {
    window.location.href = "/water-parameters";
  };

  const handleHardwares = () => {
    window.location.href = "/hardwares";
  };

  return (
    <section id="services" className="bg-white dark:bg-black overflow-hidden">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl text-center dark:text-white">
          explore our awesome <span className="text-yellow-500">Features</span>
        </h1>

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
          {componentData.map((component, index) => (
            <div
              key={index}
              className="p-8 space-y-3 border-2 border-blue-400 dark:border-yellow-300 rounded-xl"
            >
              <span className="inline-block text-blue-500 dark:text-yellow-400">
                {component.icon}
              </span>

              <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                {component.title}
              </h1>

              <p className="text-gray-500 dark:text-gray-300">
                {component.description}
              </p>

              {index === 1 && ( // Check if it's the third card
                <button
                  onClick={handleExploreParameter}
                  className="inline-flex p-2 text-blue-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-yellow-600 dark:text-white  hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Explore Water Parameter Analysis
                </button>
              )}

              {index === 2 && ( // Check if it's the third card
                <button
                  onClick={handleExplorePrediction}
                  className="inline-flex p-2 text-blue-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-yellow-600 dark:text-white  hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Explore Prediction
                </button>
              )}

              {index === 0 && ( // Check if it's the third card
                <button
                  onClick={handleHardwares}
                  className="inline-flex p-2 text-blue-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-yellow-600 dark:text-white  hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Explore Our Hardwares
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
