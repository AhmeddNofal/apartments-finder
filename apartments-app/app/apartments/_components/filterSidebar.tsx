"use client";

import { useState } from "react";
import { Paper, Typography, Box, TextField, Button } from "@mui/material";

interface Props {
  onFilterChange: (filters: Record<string, any>) => void;
}

export default function FilterSidebar({ onFilterChange }: Props) {
  const initialFilters = {
    search: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    baths: "",
    minArea: "",
    maxArea: "",
  };

  const [filters, setFilters] = useState(initialFilters);

  const update = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters);
  };

  return (
    <Paper
      elevation={4}
      style={{
        padding: 20,
        borderRadius: 12,
        position: "sticky",
        top: 20,
      }}
    >

      <form
        onSubmit={(e) => {
          e.preventDefault();
          applyFilters();
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Filters
        </Typography>

        {/* Search */}
        <TextField
          label="Search"
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
        />

        {/* Price */}
        <Box style={{ display: "flex", gap: 10 }}>
          <TextField
            label="Min Price"
            type="number"
            value={filters.minPrice}
            onChange={(e) => update("minPrice", e.target.value)}
          />
          <TextField
            label="Max Price"
            type="number"
            value={filters.maxPrice}
            onChange={(e) => update("maxPrice", e.target.value)}
          />
        </Box>

        {/* Bedrooms */}
        <TextField
          label="Bedrooms"
          type="number"
          value={filters.bedrooms}
          onChange={(e) => update("bedrooms", e.target.value)}
        />

        {/* Bathrooms */}
        <TextField
          label="Bathrooms"
          type="number"
          value={filters.baths}
          onChange={(e) => update("baths", e.target.value)}
        />

        {/* Area */}
        <Box style={{ display: "flex", gap: 10 }}>
          <TextField
            label="Min Area"
            type="number"
            value={filters.minArea}
            onChange={(e) => update("minArea", e.target.value)}
          />
          <TextField
            label="Max Area"
            type="number"
            value={filters.maxArea}
            onChange={(e) => update("maxArea", e.target.value)}
          />
        </Box>

        {/* Buttons */}
        <Box style={{ display: "flex", gap: 10 }}>
          <Button
            type="submit"
            variant="contained"
            style={{ borderRadius: 10, flex: 1 }}
          >
            Apply
          </Button>

          <Button
            type="button"
            variant="outlined"
            onClick={resetFilters}
            style={{ borderRadius: 10, flex: 1 }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
