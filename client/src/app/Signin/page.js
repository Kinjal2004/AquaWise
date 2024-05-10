// SignInSide.js
"use client";
import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation } from "wouter";
import { auth } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import HeroCenter from "../components/Home";

const defaultTheme = createTheme();

export default function SignInSide() {
  const [user, setUser] = useState(null); // State to hold user information
  const [, setLocation] = useLocation(); // Get setLocation function from wouter

  // Function to fetch user details
  const fetchUserDetails = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      // User is signed in
      setUser(currentUser);
    } else {
      // No user is signed in
      setUser(null);
    }
  };

  useEffect(() => {
    // Fetch user details when component mounts
    fetchUserDetails();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log("Successfully signed in with credentials");
      fetchUserDetails(); // Fetch user details after signing in
      setLocation("/"); // Redirect to home page ("/")
    } catch (error) {
      console.error("Error signing in with credentials:", error.message);
    }
  };

  const handleSignInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
      console.log("Successfully signed in with Google");
      fetchUserDetails(); // Fetch user details after signing in
      window.location.href = "/"; // Redirect to home page ("/")
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://www.fisheries.noaa.gov/s3//dam-migration/fisheries1.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Button
                onClick={handleSignInWithGoogle}
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2, bgcolor: "#db4437", color: "#fff" }}
              >
                Sign In with Google
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* Pass isUserSignedIn prop to HeroCenter */}
      <HeroCenter isUserSignedIn={Boolean(user)} />
      {/* Display user details if signed in */}
      {user && (
        <Grid container justifyContent="center">
          <Grid item>
            <Avatar alt={user.displayName} src={user.photoURL} />
            <Typography variant="h6" gutterBottom>
              Welcome, {user.displayName}
            </Typography>
          </Grid>
        </Grid>
      )}
    </ThemeProvider>
  );
}
