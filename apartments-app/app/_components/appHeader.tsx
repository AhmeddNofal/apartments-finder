import { Box, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';

export default function AppHeader() {
    return (
        <Box
            component="header"
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                p: { xs: 3, md: 4 }, // p-6 md:p-8 (responsive padding)
            }}
        >
            {/* Use theme palette tokens so the header respects the app theme */}
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
                <HomeIcon color="inherit" sx={{ width: 24, height: 24, mr: 1 }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: 'text.primary', letterSpacing: '0.05em' }}>
                    Apartment
                    <Box component="span" sx={{ color: 'primary.main', ml: 0.5 }}>
                        Finder
                    </Box>
                </Typography>
            </Box>
        </Box>
    );
}