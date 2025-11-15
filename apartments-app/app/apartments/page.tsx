"use client";

import { useEffect, useState } from "react";
import { Typography, Box, Container, CircularProgress, Alert } from "@mui/material";
import Link from "next/link";
import FilterSidebar from "./_components/filterSidebar";
import ApartmentCard from "./_components/apartmentCard";
import { Apartment } from "./types";

export default function ApartmentList() {
  const [filters, setFilters] = useState({});
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const fetchApartments = async () => {
    try {
      setLoading(true);
      setError("");

      const query = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== "" && v !== undefined) query.append(k, v as string);
      });

      const res = await fetch(`${baseUrl}/apartments?${query.toString()}`);

      if (!res.ok) {
        throw new Error(`API returned ${res.status}`);
      }

      const json = await res.json();

      if (!json.data) {
        throw new Error("Invalid API response format");
      }

      setApartments(json.data);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, [filters]);

  return (
    <Container maxWidth="lg" style={{ paddingTop: 40, paddingBottom: 80 }}>
      <Typography variant="h4" fontWeight="bold">
        Available Listings
      </Typography>

      <Box style={{ display: "flex", marginTop: 30, gap: 30 }}>
        {/* Sidebar */}
        <Box style={{ width: 300, flexShrink: 0 }}>
          <FilterSidebar onFilterChange={setFilters} />
        </Box>

        {/* Right Section */}
        <Box style={{ display: "flex", flexDirection: "column", gap: 20, flexGrow: 1 }}>
          {/* Loading */}
          {loading && (
            <Box style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
              <CircularProgress />
            </Box>
          )}

          {/* Error */}
          {!loading && error && <Alert severity="error">{error}</Alert>}

          {/* No Results */}
          {!loading && !error && apartments.length === 0 && (
            <Alert severity="info">No apartments found matching your filters.</Alert>
          )}

          {/* Listings */}
          {!loading &&
            !error &&
            apartments.map((apt) => (
              <Link
                key={apt._id}
                href={`/apartments/${apt._id}`}
                style={{ textDecoration: "none" }}
              >
                <ApartmentCard apartment={apt} />
              </Link>
            ))}
        </Box>
      </Box>
    </Container>
  );
}
