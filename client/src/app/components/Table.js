"use client";
import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function DenseTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const parametersSnapshot = await firestore
          .collection("prediction_db")
          .limit(5)
          .get();
        const parametersData = parametersSnapshot.docs.map((doc) => doc.data());
        console.log(parametersData);
        setRows(parametersData);
      } catch (error) {
        console.error("Error fetching parameters:", error);
      }
    };

    fetchParameters();
  }, []);

  return (
    <TableContainer
      component={Paper}
      style={{ margin: "20px auto", maxWidth: "800px" }}
    >
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>Raw Score</TableCell>
            <TableCell>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                {row.location
                  ? `${row.location.latitude}, ${row.location.longitude}`
                  : "N/A"}
              </TableCell>
              <TableCell>
                {row.predictions["Bacterial Red disease"].raw_score}
              </TableCell>
              <TableCell>
                <img
                  src={row.imageUrl}
                  alt={row.name}
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    borderRadius: "50%",
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DenseTable;
