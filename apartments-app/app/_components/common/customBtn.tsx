import appTheme from "@/theme";
import { Button } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function CustomBtn() {
    return (
        <Button
            variant="contained"
            color="primary" // Maps to the main color in the MUI theme
            // Add the arrow icon only when not searching
            endIcon={<ArrowForwardIcon sx={{ transition: 'transform 300ms', '.MuiButton-root:hover &': { transform: 'translateX(3px)' } }} />}
            sx={{
                backgroundColor: appTheme.palette.primary.main, // Primary color from theme
                py: 1.5, // vertical padding
                px: 4, // horizontal padding
                fontSize: '1.125rem', // text size (semibold equivalent)
                borderRadius: 3, // rounded-xl
                boxShadow: `0 10px 15px -3px ${appTheme.palette.indigo[500]}`, // custom shadow using theme
                textTransform: 'none', // Keep text non-uppercase
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    backgroundColor: appTheme.palette.primary.dark, // hover uses primary.dark
                    boxShadow: `0 15px 20px -3px ${appTheme.palette.indigo[500]}`,
                },
                '&:active': {
                    transform: 'scale(0.97)', // active:scale-95
                },
                '&.Mui-disabled': {
                    opacity: 0.6,
                    cursor: 'not-allowed',
                    backgroundColor: appTheme.palette.primary.main, // Keep base color when disabled
                    color: 'white',
                }
            }}
        >
            See Available Apartments
        </Button>
    );
}