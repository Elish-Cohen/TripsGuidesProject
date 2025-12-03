import React from "react";
import { Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function orders() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: "url('/images/home-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" gutterBottom>
          ברוכים הבאים לאתר הסיורים שלנו
        </Typography>
        <Typography variant="h6" paragraph>
          כאן תוכלו לגלות את כל המסלולים המרתקים בארץ, להזמין סיורים, ולנהל את הסיורים האישיים שלכם
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/tours")}
        >
          גלו את המסלולים
        </Button>
      </Container>
    </div>
  );
}
