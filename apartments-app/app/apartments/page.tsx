"use client";

import { useEffect, useRef, useState } from "react";
import {
    Typography,
    Box,
    Container,
    Alert,
    Button,
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
            query.append("limit", "10");

            const res = await fetch(`${baseUrl}/apartments?${query.toString()}`);
            if (!res.ok) throw new Error(`API returned ${res.status}`);

            const json = await res.json();
            if (!json.data) throw new Error("Invalid API response format");

            if (isNewFilter) {
                setApartments(json.data);
            } else {
                setApartments((prev) => [...prev, ...json.data]);
            }

            setHasMore(json.data.length === 10);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Unexpected error occurred while fetching apartments.");
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(1);
        setApartments([]);
        fetchApartments(1, true);
    }, [filters]);

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

    useEffect(() => {
        if (page !== 1) fetchApartments(page);
    }, [page]);

    return (
        <Container maxWidth="lg" sx={{ pt: 5, pb: 10 }}>
            {/* Title */}
            <Typography variant="h4" fontWeight="bold" className="fade-in-up">
                Available Listings
            </Typography>

            <Box sx={{ display: "flex", gap: 3, mt: 4, flexDirection: { xs: "column", md: "row" } }}>
                {/* Sidebar */}
                <Box className="fade-in-left" sx={{ width: { xs: "100%", md: 400 }, flexShrink: 0 }}>
                    <FilterSidebar onFilterChange={setFilters} />
                </Box>

                {/* Listings */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flexGrow: 1, overflowY: "auto", overflowX: "hidden", height: { xs: "auto", md: "100vh" }, p: 1 }}>
                    {/* Error */}
                    {error && (
                        <Alert severity="error" className="fade-in" sx={{ mb: 2 }}>
                            {error}{" "}
                            <Button size="small" onClick={() => fetchApartments(page)}>
                                Retry
                            </Button>
                        </Alert>
                    )}

                    {/* No results */}
                    {!loading && !error && apartments.length === 0 && (
                        <Alert severity="info" className="fade-in">No apartments found.</Alert>
                    )}

                    {/* Cards */}
                    {apartments.map((apt) => (
                        <Link key={apt._id} href={`/apartments/${apt._id}`} style={{ textDecoration: "none" }}>
                            <div className="fade-in-up" style={{ animationDelay: "0.05s" }}>
                                <ApartmentCard apartment={apt} />
                            </div>
                        </Link>
                    ))}

                    {/* Skeleton */}
                    {loading && (
                        <div className="fade-in">
                            <ApartmentCardSkeleton />
                        </div>
                    )}

                    <div ref={observerRef} style={{ height: 1 }} />
                </Box>
            </Box>
        </Container>
    );
}
