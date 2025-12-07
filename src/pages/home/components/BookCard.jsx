import React from "react";
import { Box, Typography } from "@mui/material";

export default function BookCard({ title, author, coverImage }) {
    return (
        <Box
            sx={{
                width: 220,
                height: 300,
                border: "1px solid #ddd",
                borderRadius: 2,
                bgcolor: "#fafafa",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                cursor: "pointer",
            }}
        >
            {/* 책 커버 이미지 */}
            <Box
                sx={{
                    width: "100%",
                    height: 200,
                    backgroundColor: "#eee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {coverImage ? (
                    <img
                        src={coverImage}
                        alt={title}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                ) : (
                    <Typography sx={{ color: "#999", fontSize: 14 }}>
                        이미지 없음
                    </Typography>
                )}
            </Box>

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
