import {
    Typography,
    Container,
    Button,
    Paper,
    Box,
    Grid,
    Divider,
    Chip,
} from "@mui/material";

import BedIcon from "@mui/icons-material/Bed";
import ShowerIcon from "@mui/icons-material/Shower";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import Link from "next/link";
import { Apartment } from "../types";
import ImageCarousel from "../_components/imageCarousel";
import LocationOnIcon from "@mui/icons-material/LocationOn";


export default async function ApartmentDetails({ params }: { params: Promise<{ apartmentId: string }> }) {
    const { apartmentId } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    const res = await fetch(`${baseUrl}/apartments/${apartmentId}`);

    if (!res.ok) {
        return <Typography sx={{ p: 4 }}>Apartment not found.</Typography>;
    }

    const apartment: Apartment = await res.json();

    const images =
        apartment.images?.length
            ? apartment.images.map(id => `${baseUrl}/apartments/file/${id}`)
            : ["/placeholder.png"]

    return (
        <Container maxWidth="lg" sx={{ py: 6, }}>
            <Link href="/apartments" style={{ textDecoration: "none" }}>
                <Button
                    variant="text"
                    color="primary"
                    sx={{ mb: 3, textTransform: "none", fontWeight: "bold" }}
                >
                    &larr; Back to Listings
                </Button>
            </Link>

            <Paper elevation={8} sx={{ borderRadius: 4, overflow: "hidden" }}>
                {/* Hero Image */}
                <ImageCarousel images={images} />

                <Box sx={{ p: { xs: 3, md: 6 } }}>
                    <Grid container spacing={4}>
                        {/* Left Column */}
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 1 }}>
                                {apartment.unitName}
                            </Typography>

                            {/* Address */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                <LocationOnIcon sx={{ color: "primary.main", fontSize: 22 }} />
                                <Typography variant="body1" color="text.secondary">
                                    {apartment.address}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 3,
                                    mb: 4,
                                    pt: 1,
                                    color: "text.secondary",
                                }}
                            >
                                <Box display="flex" alignItems="center">
                                    <BedIcon sx={{ mr: 0.5 }} /> {apartment.bedrooms} Beds
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <ShowerIcon sx={{ mr: 0.5 }} /> {apartment.baths} Baths
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <SquareFootIcon sx={{ mr: 0.5 }} /> {apartment.unitArea} sqft
                                </Box>
                            </Box>

                            <Divider sx={{ mb: 3 }} />

                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                Description
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                                {apartment.description}
                            </Typography>
                        </Grid>


                        {/* Right Column */}
                        <Grid size={{ xs: 12, md: 4 }} >
                            <Paper
                                variant="outlined"
                                sx={{ p: 3, borderRadius: 3, bgcolor: "background.default", display: 'flex', flexDirection: 'column', alignItems: 'center', }}
                            >
                                <Typography variant="h4" color="primary" fontWeight="bold" textAlign="center">
                                    ${apartment.price}
                                </Typography>
                                <Divider sx={{ my: 2, width: "80%", borderColor: "grey.400" }} />
                                <Chip label="Available Now" color="primary" sx={{ color: "white" }} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}
