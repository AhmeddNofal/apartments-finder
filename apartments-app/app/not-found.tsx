"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function Custom404() {
  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography
        variant="h1"
        fontWeight="bold"
        color="primary"
        sx={{ fontSize: { xs: "6rem", md: "8rem" }, mb: 2 }}
        className="fade-in-up"
      >
        404
      </Typography>

      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 2 }}
        className="fade-in-up"
      >
        Page Not Found
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4, maxWidth: 400 }}
        className="fade-in-up"
      >
        Oops! The page you are looking for does not exist or has been moved.
      </Typography>

      <Link href="/" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontWeight: "bold" }}
          className="fade-in-left"
        >
          Go Back Home
        </Button>
      </Link>
    </Container>
  );
}
