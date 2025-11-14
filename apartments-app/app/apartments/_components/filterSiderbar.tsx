import { Paper, Typography, Divider, Box, Chip, Button } from "@mui/material";

export default function FilterSidebar() {
    return (
        <Paper elevation={4} sx={{ p: 3, borderRadius: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Filter Apartments
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="medium" mb={1}>
                    Price Range
                </Typography>
                <Chip label="$1,000 - $3,000" color="primary" variant="outlined" sx={{ mr: 1 }} />
                <Chip label="$3,000+" variant="outlined" />
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="medium" mb={1}>
                    Bedrooms
                </Typography>
                <Chip label="Studio" variant="outlined" sx={{ mr: 1 }} />
                <Chip label="2 Beds" color="primary" sx={{ mr: 1 }} />
                <Chip label="3+ Beds" variant="outlined" />
            </Box>

            <Button variant="contained" fullWidth sx={{ borderRadius: 2 }}>
                Apply Filters
            </Button>
        </Paper>
    );
}