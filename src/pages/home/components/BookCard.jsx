import React from "react";
import { Box, Typography } from "@mui/material";

export default function BookCard({ title, author }) {
    return (
        //dd
        <Box
            sx={{
                width: 220,
                height: 260,
                border: "1px solid #ddd",
                borderRadius: 2,
                bgcolor: "#fafafa",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            {/* 이미지 자리 */}
            <Box sx={{ flex: 1, bgcolor: "#eee" }} />

            {/* 책 정보 */}
            <Box sx={{ p: 2 }}>
                <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {author}
                </Typography>
            </Box>
        </Box>
    );
}
