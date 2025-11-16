import {
    Typography,
    Container,
    Button,
    Paper,
    Box,
    Grid,
    Divider,
    Chip,
    Alert,
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

    let apartment: Apartment | null = null;
    let error = false;
    let errorMessage = '';

    try {
        const res = await fetch(`${baseUrl}/apartments/${apartmentId}`);

        if (!res.ok) {
            errorMessage = `Apartment not found (status: ${res.status})`;
            error = true;
        } else {
            apartment = await res.json();
        }
    } catch (err: any) {
        console.error(err);
        errorMessage = 'Failed to fetch apartment data. Please try again later.';
        error = true;
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Alert severity="error">{errorMessage}</Alert>
                <Link href="/apartments" style={{ textDecoration: "none" }}>
                    <Button variant="text" color="primary" sx={{ mt: 3 }}>
                        &larr; Back to Listings
                    </Button>
                </Link>
            </Container>
        );
    }

    const images =
        apartment!.images?.length
            ? apartment!.images.map(id => `http://localhost:5000/apartments/file/${id}`)
            : ["/placeholder.png"];

    return (
        <Container maxWidth="lg" sx={{ py: 6 }} className="fade-in">
            <Link href="/apartments" style={{ textDecoration: "none" }}>
                <Button
                    variant="text"
                    color="primary"
                    sx={{ mb: 3, textTransform: "none", fontWeight: "bold" }}
                    className="fade-in-left"
                >
                    &larr; Back to Listings
                </Button>
            </Link>

            <Paper elevation={8} sx={{ borderRadius: 4, overflow: "hidden" }} className="fade-in">
                <div className="fade-in">
                    <ImageCarousel images={images} />
                </div>

                <Box sx={{ p: { xs: 3, md: 6 } }}>
                    <Grid container spacing={4}>

                        {/* LEFT COLUMN */}
                        <Grid size={{ xs: 12, md: 8 }} className="fade-in-up">
                            <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 1 }}>
                                {apartment!.unitName}
                            </Typography>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                <LocationOnIcon sx={{ color: "primary.main", fontSize: 22 }} />
                                <Typography variant="body1" color="text.secondary">
                                    {apartment!.address}
                                </Typography>
                            </Box>

                            <Box sx={{ display: "flex", gap: 3, mb: 4, pt: 1, color: "text.secondary" }}>
                                <Box display="flex" alignItems="center">
                                    <BedIcon sx={{ mr: 0.5 }} /> {apartment!.bedrooms} Beds
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <ShowerIcon sx={{ mr: 0.5 }} /> {apartment!.baths} Baths
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <SquareFootIcon sx={{ mr: 0.5 }} /> {apartment!.unitArea} sqft
                                </Box>
                            </Box>

                            <Divider sx={{ mb: 3 }} />

                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                Description
                            </Typography>

                            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                                {apartment!.description}
                            </Typography>
                        </Grid>

                        {/* RIGHT COLUMN */}
                        <Grid size={{ xs: 12, md: 4 }} className="fade-in-left">
                            <Paper
                                variant="outlined"
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    bgcolor: "background.default",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Typography variant="h4" color="primary" fontWeight="bold" textAlign="center">
                                    ${apartment!.price}
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
