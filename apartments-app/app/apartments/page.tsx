"use client";

import { useEffect, useRef, useState } from "react";
import {
    Typography,
    Box,
    Container,
    Alert,
} from "@mui/material";
import Link from "next/link";
import FilterSidebar from "./_components/filterSidebar";
import ApartmentCard from "./_components/apartmentCard";
import ApartmentCardSkeleton from "./_components/apartmentCardSkeleton";
import { Apartment } from "./types";

export default function ApartmentList() {
    const [filters, setFilters] = useState({});
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const observerRef = useRef<HTMLDivElement | null>(null);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const fetchApartments = async (pageNumber = 1, isNewFilter = false) => {
        try {
            setLoading(true);
            setError("");

            const query = new URLSearchParams();
            Object.entries(filters).forEach(([k, v]) => {
                if (v !== "" && v !== undefined) query.append(k, v as string);
            });

            query.append("page", String(pageNumber));
            query.append("limit", "10"); // customize page size

            const res = await fetch(`${baseUrl}/apartments?${query.toString()}`);

            if (!res.ok) throw new Error(`API returned ${res.status}`);

            const json = await res.json();

            if (!json.data) throw new Error("Invalid API response format");

            // If filtering changed → reset list
            if (isNewFilter) {
                setApartments(json.data);
            } else {
                setApartments((prev) => [...prev, ...json.data]);
            }

            // If less than limit returned → no more pages
            setHasMore(json.data.length === 10);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    // Fetch on filter change — reset everything
    useEffect(() => {
        setPage(1);
        setApartments([]);
        fetchApartments(1, true);
    }, [filters]);

    // Infinite scroll observer
    useEffect(() => {
        if (!observerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && hasMore) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 1 }
        );

        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [loading, hasMore]);

    // Fetch next page
    useEffect(() => {
        if (page !== 1) fetchApartments(page);
    }, [page]);

    return (
        <Container maxWidth="lg" sx={{ pt: 5, pb: 10 }}>
            <Typography variant="h4" fontWeight="bold">
                Available Listings
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    gap: 3,
                    mt: 4,
                    flexDirection: { xs: "column", sm: "column", md: "row" },
                }}
            >
                {/* Sidebar */}
                <Box
                    sx={{
                        width: { xs: "100%", md: 400 },
                        flexShrink: 0,
                    }}
                >
                    <FilterSidebar onFilterChange={setFilters} />
                </Box>

                {/* Listings Section */}
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    flexGrow: 1,
                    overflowY: "auto",
                    overflowX: "hidden",
                    height: { xs: "auto", md: "calc(100vh - 160px)" },
                    p: 1,
                }}>
                    {/* Error */}
                    {!loading && error && <Alert severity="error">{error}</Alert>}

                    {/* No Results */}
                    {!loading && !error && apartments.length === 0 && (
                        <Alert severity="info">No apartments found matching your filters.</Alert>
                    )}

                    {/* Listings */}
                    {apartments.map((apt) => (
                        <Link
                            key={apt._id}
                            href={`/apartments/${apt._id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <ApartmentCard apartment={apt} />
                        </Link>
                    ))}

                    {/* Skeletons while loading next page */}
                    {loading && (
                        <>
                            <ApartmentCardSkeleton />
                        </>
                    )}

                    {/* Load More Trigger */}
                    <div ref={observerRef} style={{ height: 1 }} />
                </Box>
            </Box>
        </Container>
    );
}
