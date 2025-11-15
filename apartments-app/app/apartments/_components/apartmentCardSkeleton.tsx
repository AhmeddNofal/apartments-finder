"use client";

import { Box, Skeleton } from "@mui/material";

export default function ApartmentCardSkeleton() {
    return (
        <Box style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {Array.from({ length: 4 }).map((_, i) => (
                <Box
                    key={i}
                    sx={{
                        width: "100%",
                        display: "flex",
                        gap: 2,
                        padding: 2,
                        borderRadius: 2,
                        border: "1px solid #ddd",
                    }}
                >
                    {/* Image skeleton */}
                    <Skeleton variant="rectangular" width={140} height={100} />

                    {/* Text section */}
                    <Box sx={{ flexGrow: 1 }}>
                        <Skeleton variant="text" width="60%" height={28} />
                        <Skeleton variant="text" width="40%" height={24} />
                        <Skeleton variant="text" width="80%" height={24} />
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
