"use client";

import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Props {
  images: string[];
}

export default function ImageCarousel({ images }: Props) {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: 300, sm: 400, md: 550 },
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={images[index] }
        alt="apartment image"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {images.length > 1 && (
        <IconButton
          onClick={prev}
          sx={{
            position: "absolute",
            top: "50%",
            left: 15,
            transform: "translateY(-50%)",
            bgcolor: "rgba(0,0,0,0.4)",
            color: "white",
            "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      )}

      {images.length > 1 && (
        <IconButton
          onClick={next}
          sx={{
            position: "absolute",
            top: "50%",
            right: 15,
            transform: "translateY(-50%)",
            bgcolor: "rgba(0,0,0,0.4)",
            color: "white",
            "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      )}
    </Box>
  );
}
