import { Typography, Container, Button, Paper, Box, Chip, Grid, Divider, List, ListItem, ListItemIcon, ListItemText, SvgIconTypeMap } from "@mui/material";
import { Apartment, ApartmentDetailsProps } from "../types";
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import BedIcon from '@mui/icons-material/Bed';
import HomeIcon from '@mui/icons-material/Home';
import { OverridableComponent } from "@mui/material/OverridableComponent";
import ShowerIcon from '@mui/icons-material/Shower';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import Link from "next/link";

const MOCK_APARTMENTS: Apartment[] = [
    { id: 1, title: 'Luxury Downtown Loft', price: 3200, sqft: 1050, beds: 2, baths: 2, location: 'Financial District', image: 'https://placehold.co/800x600/4f46e5/ffffff?font=inter&text=Loft+View', description: 'Stunning city views, close to transit.' },
    { id: 2, title: 'Sunny Family Home', price: 1800, sqft: 850, beds: 2, baths: 1, location: 'Suburban Park', image: 'https://placehold.co/800x600/6366f1/ffffff?font=inter&text=Family+Home', description: 'Quiet neighborhood, pool access, great schools.' },
    { id: 3, title: 'Studio near University', price: 1250, sqft: 500, beds: 1, baths: 1, location: 'Campus West', image: 'https://placehold.co/800x600/4338ca/ffffff?font=inter&text=Studio+Space', description: 'Perfect for students, all utilities included.' },
    { id: 4, title: 'Modern 3BR Penthouse', price: 4500, sqft: 1500, beds: 3, baths: 3, location: 'Central Heights', image: 'https://placehold.co/800x600/818cf8/ffffff?font=inter&text=Penthouse', description: 'Spacious and elegant living with rooftop access.' },
];


export default async function ApartmentDetails({ params }: { params: Promise<{ apartmentId: string }> }) {
    const { apartmentId } = await params;
    const apartment = MOCK_APARTMENTS.find(a => a.id === parseInt(apartmentId));
    console.log('Apartment ID:', apartmentId);
    if (!apartment) return <Typography variant="h5" sx={{ p: 4 }}>Apartment not found.</Typography>;

    // Define a type for amenity items
    interface AmenityItem {
        icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
        text: string;
    }

    const amenities: AmenityItem[] = [
        { icon: WifiIcon, text: 'High-speed internet included' },
        { icon: LocalParkingIcon, text: 'Dedicated parking spot' },
        { icon: HomeIcon, text: 'In-unit laundry facilities' },
        { icon: BedIcon, text: 'Walk-in closets in every room' },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            {/* Back Button */}
            <Link href="/apartments" style={{ textDecoration: 'none' }}>
                <Button
                    variant="text"
                    color="primary"
                    sx={{ mb: 3, textTransform: 'none', fontWeight: 'bold' }}
                >
                    &larr; Back to Listings
                </Button>
            </Link>
            
            <Paper elevation={8} sx={{ borderRadius: 4, overflow: 'hidden' }}>
                {/* Image Gallery / Hero Image */}
                <Box
                    sx={{
                        height: { xs: 300, sm: 400, md: 550 },
                        backgroundImage: `url(${apartment.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                    }}
                >
                    <Chip
                        label={apartment.location}
                        sx={{ position: 'absolute', top: 16, left: 16, backgroundColor: 'primary.main', color: 'white', fontWeight: 'bold' }}
                    />
                </Box>

                {/* Content Section */}
                <Box sx={{ p: { xs: 3, md: 6 } }}>
                    <Grid container spacing={4}>
                        {/* Left Column: Description & Amenities */}
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 1, color: 'text.primary' }}>
                                {apartment.title}
                            </Typography>

                            {/* Stats Bar */}
                            <Box sx={{ display: 'flex', gap: 3, mb: 4, pt: 1, color: 'text.secondary' }}>
                                <Box display="flex" alignItems="center"><BedIcon sx={{ mr: 0.5 }} /> {apartment.beds} Beds</Box>
                                <Box display="flex" alignItems="center"><ShowerIcon sx={{ mr: 0.5 }} /> {apartment.baths} Baths</Box>
                                <Box display="flex" alignItems="center"><SquareFootIcon sx={{ mr: 0.5 }} /> {apartment.sqft} sqft</Box>
                            </Box>

                            <Divider sx={{ mb: 3 }} />

                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                Description
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                                {apartment.description} This apartment boasts modern finishes, ample natural light, and a fantastic location with easy access to all the city has to offer. The building is quiet, well-maintained, and features state-of-the-art security.
                            </Typography>

                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                Key Amenities
                            </Typography>
                            <List disablePadding>
                                {amenities.map((item, index) => (
                                    <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
                                        <ListItemIcon sx={{ minWidth: 36, color: 'primary.main' }}>
                                            {/* Item.icon is a React Component, use it with JSX syntax */}
                                            <item.icon />
                                        </ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>

                        {/* Right Column: Pricing and Contact */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, bgcolor: 'background.default' }}>
                                <Typography variant="h4" color="primary" fontWeight="bold">
                                    ${apartment.price}
                                    <Typography component="span" variant="h6" color="text.secondary">
                                        /month
                                    </Typography>
                                </Typography>
                                <Typography variant="caption" color="error" display="block" sx={{ mb: 3 }}>
                                    Limited availability — Book a tour today!
                                </Typography>

                                <Button variant="contained" fullWidth size="large" sx={{ mb: 1.5, borderRadius: 2 }}>
                                    Schedule a Tour
                                </Button>
                                <Button variant="outlined" fullWidth size="large" sx={{ borderRadius: 2 }}>
                                    Contact Agent
                                </Button>

                                <Divider sx={{ my: 3 }} />

                                <Typography variant="body2" color="text.secondary" textAlign="center">
                                    Listing ID: APT-{apartment.id * 100 + 42}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};