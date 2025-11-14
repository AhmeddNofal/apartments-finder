import { Box } from "@mui/material";

import appTheme from '../theme';
import LandingPageCard from "./_components/landingPage/landingPageCard";

export default function Home() {

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: appTheme.palette.background?.default ?? appTheme.palette.grey[50], // bg-gray-50 via theme
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: appTheme.typography?.fontFamily ?? 'Inter, sans-serif'
      }}
    >

      {/* Main Content Paper (Card) */}
      <LandingPageCard />

      {/* Footer */}
      <Box component="footer" sx={{ mt: 6, fontSize: '0.875rem', color: appTheme.palette.grey[400] }}>
        Trusted by renters in over 50 cities globally.
      </Box>
    </Box>
  );
}
