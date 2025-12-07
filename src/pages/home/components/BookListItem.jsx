import React from "react";
import { Box, Typography } from "@mui/material";

export default function BookListItem({ title, author }) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                padding: "8px 0",
                borderBottom: "1px solid #eee",
            }}
        >
            {/* 왼쪽에 심볼/동그라미 자리dd */}
            <Box
                sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#999",
                }}
            />

            {/* 텍스트 영역 */}
            <Box>
                <Typography sx={{ fontWeight: 500 }}>{title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {author}
                </Typography>
            </Box>
        </Box>
    );
}
