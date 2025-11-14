'use client';

import appTheme from "@/theme";
import { Typography, Box, useMediaQuery, Container, Grid } from "@mui/material";
import FilterSidebar from "./_components/filterSiderbar";
import ApartmentCard from "./_components/apartmentCard";
import { Apartment, ApartmentListProps } from "./types";
import Link from "next/link";


const MOCK_APARTMENTS: Apartment[] = [
    { id: 1, title: 'Luxury Downtown Loft', price: 3200, sqft: 1050, beds: 2, baths: 2, location: 'Financial District', image: 'https://placehold.co/800x600/4f46e5/ffffff?font=inter&text=Loft+View', description: 'Stunning city views, close to transit.' },
    { id: 2, title: 'Sunny Family Home', price: 1800, sqft: 850, beds: 2, baths: 1, location: 'Suburban Park', image: 'https://placehold.co/800x600/6366f1/ffffff?font=inter&text=Family+Home', description: 'Quiet neighborhood, pool access, great schools.' },
    { id: 3, title: 'Studio near University', price: 1250, sqft: 500, beds: 1, baths: 1, location: 'Campus West', image: 'https://placehold.co/800x600/4338ca/ffffff?font=inter&text=Studio+Space', description: 'Perfect for students, all utilities included.' },
    { id: 4, title: 'Modern 3BR Penthouse', price: 4500, sqft: 1500, beds: 3, baths: 3, location: 'Central Heights', image: 'https://placehold.co/800x600/818cf8/ffffff?font=inter&text=Penthouse', description: 'Spacious and elegant living with rooftop access.' },
];


export default function ApartmentList({ onNavigate }: ApartmentListProps) {
    const isMobile = useMediaQuery(appTheme.breakpoints.down('md'));

    return (
        <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ color: 'text.primary', mb: 1 }}>
                Available Listings
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Showing {MOCK_APARTMENTS.length} results in your selected areas.
            </Typography>

            <Grid container spacing={4}>
                {/* Filter Sidebar (Hidden on mobile) */}
                {!isMobile && (
                    <Grid size={3} component="aside">
                        <FilterSidebar />
                    </Grid>
                )}

                {/* Listings Area */}
                <Grid size={{ xs: 12, md: 9 }} >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {MOCK_APARTMENTS.map((apartment: Apartment) => (
                            <Link key={apartment.id} href={`/apartments/${apartment.id}`} style={{ textDecoration: 'none' }}>
                                <ApartmentCard key={apartment.id} apartment={apartment} />
                            </Link>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

