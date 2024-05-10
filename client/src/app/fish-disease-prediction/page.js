"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { firestore } from "../firebase";
import { Image } from "cloudinary-react";
import NavBar from "../components/NavBar";
import DenseTable from "../components/Table";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  //background-image: url("https://plus.unsplash.com/premium_photo-1664297560465-0582ce41d897?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dW5kZXJ3YXRlciUyMGZpc2h8ZW58MHx8MHx8fDA%3D");
  background-size: cover;
  background-position: center;
  margin-top: 10rem;
  padding: 2rem;
  color: white;
`;

const UploadContainer = styled.div`
  margin-bottom: 1rem;
  position: relative;
  width: 400px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  cursor: pointer;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  object-fit: cover;
`;

const UploadIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  border: 2px dashed red;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 2rem;
  color: red;
`;

const UploadButton = styled.button`
  background-color: #4caf50;
  color: #ffffff;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-top: 1rem; /* Added margin to move below the photo */

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

const SuccessMessage = styled.p`
  color: #4caf50;
  margin-top: 1rem;
`;

const ResultContainer = styled.div`
  margin-top: 1rem;
  background-color: green;
  padding: 1rem;
  border-radius: 0.25rem;
  width: 400px;
`;

const ResultTable = styled.table`
  width: 100%;
  margin-top: 1rem;
  border-spacing: 10px;

  th,
  td {
    padding: 0.5rem;
    text-align: left;
  }

  th {
    font-weight: bold;
  }
`;
const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.25rem;
  backdrop-filter: blur(10px);
  margin-right: 6rem;
`;

const BarChart = styled.div`
  margin-top: 1rem;
  width: 400px;
  margin-left: 3rem;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
`;

const Bar = styled.div`
  background-color: #4caf50;
  height: 20px;
  margin-bottom: 0.5rem;
`;

const BarFill = styled.div`
  background-color: red;
  height: 100%;
`;

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const storedImageSrc = localStorage.getItem("uploadedImageSrc");
    if (storedImageSrc) {
      setImageSrc(storedImageSrc);
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.log("Geolocation is not available.");
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setImageSrc(imageUrl); // Set the image source
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    setError(null);

    if (!file) {
      setLoading(false);
      setError("Please select an image before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "kgrsqewy");
      formData.append("cloud_name", "dkpdi1wek");

      // Corrected syntax here
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${formData.get(
          "cloud_name"
        )}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Get the uploaded image URL from Cloudinary response
      const imageUrl = cloudinaryResponse.data.secure_url;
      const predictionResponse = await axios.post(
        "http://127.0.0.1:5000/api/disease_prediction",
        formData
      );

      await firestore.collection("prediction_db").add({
        imageUrl,
        ...predictionResponse.data,
        location,
      });

      setResponse(predictionResponse.data);

      localStorage.setItem("uploadedImageSrc", ""); // Empty image src from local storage
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("An error occurred during upload. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container>
        <NavBar />
        <Container1>
          <UploadContainer>
            <FileInput type="file" id="fileInput" onChange={handleFileChange} />
            <FileLabel htmlFor="fileInput">
              {imageSrc ? (
                <PreviewImage src={imageSrc} alt="Uploaded" /> // Render the selected image
              ) : (
                <UploadIcon>
                  <span>+</span>
                </UploadIcon>
              )}
            </FileLabel>
          </UploadContainer>
          <UploadButton onClick={handleUpload} disabled={loading}>
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Upload Image"
            )}
          </UploadButton>
        </Container1>
        {response && (
          <ResultContainer>
            <SuccessMessage>Upload successful!</SuccessMessage>
            <ResultTable>
              <thead>
                <tr>
                  <th>Disease</th>
                  <th>Chances</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(response.predictions || {}).map(
                  ([category, data]) => (
                    <tr key={category}>
                      <td>{category}</td>
                      <td>{(data.raw_score * 100).toFixed(3)}%</td>
                      <td>
                        {category === "Healthy Fish" &&
                          (data.raw_score < 0.4 ? "Unhealthy" : "Healthy")}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </ResultTable>
          </ResultContainer>
        )}

        {response && (
          <BarChart>
            <h3>Raw Scores</h3>
            {Object.entries(response.predictions || {}).map(
              ([category, data]) => (
                <div key={category}>
                  <p>{category}</p>
                  <Bar>
                    <BarFill
                      style={{ width: `${(data.raw_score * 100).toFixed(2)}%` }}
                    />
                  </Bar>
                </div>
              )
            )}
          </BarChart>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Container>

      <Container>
        <DenseTable />
      </Container>
    </div>
  );
};

export default ImageUpload;
