import { Paper, Box, Typography, Chip } from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import ShowerIcon from "@mui/icons-material/Shower";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import { Apartment } from "../types";

export default function ApartmentCard({ apartment }: { apartment: Apartment }) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const imageUrl = apartment.images?.[0]
        ? `${baseUrl}/apartments/file/${apartment.images[0]}`
        : '/placeholder.png';

    return (
        <Paper
            elevation={4}
            style={{
                borderRadius: 12,
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                height: 200,
                transition: "0.3s",
            }}
        >
            {/* Left Image */}
            <Box
                style={{
                    width: 250,
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Right Content */}
            <Box
                style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 20,
                }}
            >
                <Box>
                    <Typography variant="body2" color="gray">
                        {apartment.address}
                    </Typography>

                    <Typography variant="h6" fontWeight="bold">
                        {apartment.unitName}
                    </Typography>

                </Box>

                <Box style={{ display: "flex", gap: 8 }}>
                    <Chip icon={<BedIcon />} label={`${apartment.bedrooms} Beds`} />
                    <Chip icon={<ShowerIcon />} label={`${apartment.baths} Baths`} />
                    <Chip
                        icon={<SquareFootIcon />}
                        label={`${apartment.unitArea} sqft`}
                    />
                </Box>

                <Typography variant="h5" color="primary" fontWeight="bold">
                    ${apartment.price}
                </Typography>
            </Box>
        </Paper>
    );
}
