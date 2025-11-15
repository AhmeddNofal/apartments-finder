import { Box, Link, Typography, useTheme } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import appTheme from "@/theme";

export default function AppHeader() {

    return (
        <Box
            component="header"
            sx={{
                p: { xs: 3, md: 4 },
                backgroundColor: appTheme.palette.background.default,
            }}
        >
            <Link href="/" style={{ textDecoration: "none" }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
                    <HomeIcon color="inherit" sx={{ width: 24, height: 24, mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold" sx={{ color: 'text.primary', letterSpacing: '0.05em' }}>
                        Apartment
                        <Box component="span" sx={{ color: 'primary.main', ml: 0.5 }}>
                            Finder
                        </Box>
                    </Typography>
                </Box>
            </Link>
        </Box>
    );
}
