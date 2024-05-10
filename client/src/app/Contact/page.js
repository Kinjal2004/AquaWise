"use client";
import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";

const FeedbackForm = () => {
  return (
    <div
      style={{
        background: `url('https://images.unsplash.com/photo-1532787799187-93655e51d472?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG9jZWFuJTIwd2F0ZXJ8ZW58MHx8MHx8fDA%3D')`,
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ color: "white" }}
        >
          Feedback Form
        </Typography>
        <form action="YOUR_GETFORM_ENDPOINT" method="POST">
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            variant="outlined"
            required
            InputLabelProps={{ style: { color: "white" } }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            required
            InputLabelProps={{ style: { color: "white" } }}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="feedback-type-label" style={{ color: "white" }}>
              Feedback Type
            </InputLabel>
            <Select
              labelId="feedback-type-label"
              label="Feedback Type"
              name="type"
              required
              inputProps={{ style: { color: "white" } }}
            >
              <MenuItem value="complaint">Complaint</MenuItem>
              <MenuItem value="review">Review</MenuItem>
              <MenuItem value="suggestion">Suggestion</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Message"
            name="message"
            multiline
            rows={4}
            variant="outlined"
            required
            InputLabelProps={{ style: { color: "white" } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default FeedbackForm;
