import { Paper, Box, Typography, Chip } from "@mui/material";
import { ApartmentCardProps } from "../types";
import BedIcon from '@mui/icons-material/Bed';
import ShowerIcon from '@mui/icons-material/Shower';
import SquareFootIcon from '@mui/icons-material/SquareFoot';


export default function ApartmentCard({ apartment,  }: ApartmentCardProps) {
    return (
        <Paper
            elevation={4}
            sx={{
                borderRadius: 3,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: (theme) => theme.shadows[10],
                },
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                height: { xs: 'auto', sm: 200 },
            }}
            // onClick={() => onNavigate(apartment.id)}
        >
            {/* Image Section */}
            <Box
                sx={{
                    width: { xs: '100%', sm: 250 },
                    height: { xs: 200, sm: '100%' },
                    flexShrink: 0,
                    backgroundImage: `url(${apartment.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            {/* Content Section */}
            <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        {apartment.location}
                    </Typography>
                    <Typography variant="h6" component="h2" fontWeight="bold" sx={{ mb: 1 }}>
                        {apartment.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {apartment.description}
                    </Typography>
                </Box>

                {/* Stats */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, flexWrap: 'wrap' }}>
                    <Chip
                        icon={<BedIcon sx={{ width: 16, height: 16 }} />}
                        label={`${apartment.beds} Beds`}
                        size="small"
                        sx={{ mr: 1, mb: 1, backgroundColor: 'primary.light', color: 'white' }}
                    />
                    <Chip
                        icon={<ShowerIcon sx={{ width: 16, height: 16 }} />}
                        label={`${apartment.baths} Baths`}
                        size="small"
                        sx={{ mr: 1, mb: 1, backgroundColor: 'primary.light', color: 'white' }}
                    />
                    <Chip
                        icon={<SquareFootIcon sx={{ width: 16, height: 16 }} />}
                        label={`${apartment.sqft} sqft`}
                        size="small"
                        sx={{ mr: 1, mb: 1, backgroundColor: 'primary.light', color: 'white' }}
                    />
                </Box>

                {/* Price */}
                <Box sx={{ mt: 2, textAlign: 'right' }}>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                        ${apartment.price}
                        <Typography component="span" variant="body1" color="text.secondary">
                            /mo
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
}