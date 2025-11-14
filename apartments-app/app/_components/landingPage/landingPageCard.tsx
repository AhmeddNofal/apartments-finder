import appTheme from "@/theme";
import { Container, Paper, Chip, Typography, Button } from "@mui/material";
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import CustomBtn from "../common/customBtn";

export default function LandingPageCard() {
    return (
        <Container maxWidth="md">
            <Paper
                elevation={12} // shadow-2xl equivalent
                sx={{
                    p: { xs: 4, md: 8 }, // p-8 md:p-16 (responsive padding)
                    borderRadius: 6, // rounded-3xl equivalent
                    textAlign: 'center',
                    border: `1px solid ${appTheme.palette.grey[100]}`,
                }}
            >
                {/* Tagline/Pre-Header (Chip) */}
                <Chip
                    icon={<HomeIcon color="inherit" sx={{ width: 16, height: 16, mr: 0.5 }} />}
                    label="Your Next Chapter Starts Here"
                    size="small"
                    sx={{
                        backgroundColor: appTheme.palette.indigo[50], // server-safe: use value from theme import
                        color: appTheme.palette.indigo[600], // server-safe: use value from theme import
                        fontWeight: 'medium',
                        mb: { xs: 2, md: 3 }, // mb-4 md:mb-6
                        '&:hover': {
                            backgroundColor: appTheme.palette.indigo[100],
                            cursor: 'pointer'
                        }
                    }}
                />

                {/* Headline */}
                <Typography
                    component="h1"
                    fontWeight="extrabold"
                    sx={{
                        color: appTheme.palette.grey[900],
                        mb: 3,
                        lineHeight: 1.1,
                        // Responsive font sizes: 5xl (3rem), 6xl (3.75rem), 7xl (4.5rem)
                        fontSize: { xs: '3rem', sm: '3.75rem', md: '4.5rem' }
                    }}
                >
                    Find Your <span style={{ color: appTheme.palette.primary.main }}>Perfect Home</span> Instantly.
                </Typography>

                {/* Description */}
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: appTheme.palette.grey[600],
                        maxWidth: 600,
                        mx: 'auto',
                        mb: 5,
                        fontSize: { xs: '1rem', md: '1.25rem' } // text-lg md:text-xl
                    }}
                >
                    Explore curated, modern listings of available apartments in top neighborhoods.
                    We make finding your next rental seamless and stress-free.
                </Typography>

                {/* Call-to-Action Button */}
                <Link href="/apartments">
                    <CustomBtn />
                </Link>

            </Paper>
        </Container>
    );
}