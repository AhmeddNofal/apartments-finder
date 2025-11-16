import { Box, Container, Paper, Skeleton } from "@mui/material";

export default function Loading() {
    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            {/* Back Button Skeleton */}
            <Skeleton variant="rectangular" width={150} height={35} sx={{ mb: 3 }} />

            <Paper elevation={8} sx={{ borderRadius: 4, overflow: "hidden" }}>
                {/* Hero Carousel Skeleton */}
                <Skeleton variant="rectangular" width="100%" height={420} />

                <Box
                    sx={{
                        p: { xs: 3, md: 6 },
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 4,
                    }}
                >
                    {/* Left Column */}
                    <Box
                        sx={{
                            flex: 2,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* Title */}
                        <Skeleton width="70%" height={50} sx={{ mb: 2 }} />

                        {/* Info row */}
                        <Box sx={{ display: "flex", gap: 3, mb: 4 }}>
                            <Skeleton variant="rectangular" width={90} height={28} />
                            <Skeleton variant="rectangular" width={90} height={28} />
                            <Skeleton variant="rectangular" width={110} height={28} />
                        </Box>

                        {/* Divider */}
                        <Skeleton width="100%" height={1} sx={{ mb: 3 }} />

                        {/* Description Title */}
                        <Skeleton width="30%" height={35} sx={{ mb: 2 }} />

                        {/* Description lines */}
                        <Skeleton width="100%" height={20} sx={{ mb: 1 }} />
                        <Skeleton width="95%" height={20} sx={{ mb: 1 }} />
                        <Skeleton width="80%" height={20} sx={{ mb: 4 }} />
                    </Box>

                    {/* Right Column */}
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 3,
                                width: "100%",
                                borderRadius: 3,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            {/* Price */}
                            <Skeleton width="60%" height={40} sx={{ mb: 3 }} />

                            {/* Divider */}
                            <Skeleton width="80%" height={1} sx={{ mb: 3 }} />

                            {/* Chip */}
                            <Skeleton
                                variant="rectangular"
                                width={140}
                                height={35}
                                sx={{ borderRadius: "40px" }}
                            />
                        </Paper>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
