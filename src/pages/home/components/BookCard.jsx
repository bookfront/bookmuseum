import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import HeartFill from "../assets/heart-fill.png";
import HeartLine from "../assets/heart-line.png";
import DefaultCover from "/src/asserts/noneimg.png";

export default function BookCard({
                                     id,
                                     title,
                                     author,
                                     liked,
                                     onToggleLike,
                                     imageUrl,
                                     isLoggedIn,
                                 }) {

    const truncate = (text, max) =>
        text?.length > max ? text.slice(0, max) + "..." : text;

    return (
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
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                transition: "0.2s",
            }}
        >
            <Box sx={{ flex: 1, overflow: "hidden", bgcolor: "#eee" }}>
                <Box
                    component="img"
                    src={imageUrl || DefaultCover}
                    onError={(e) => (e.currentTarget.src = DefaultCover)}
                    alt={title}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </Box>

            <Box sx={{ p: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            fontSize: 14,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {truncate(title, 10)}
                    </Typography>

                    {isLoggedIn && (
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleLike(id);
                            }}
                            sx={{ p: 0 }}
                        >
                            <img
                                src={liked ? HeartFill : HeartLine}
                                width={22}
                                height={22}
                                alt="like"
                            />
                        </IconButton>
                    )}
                </Box>

                <Typography
                    sx={{
                        fontSize: 12,
                        color: "text.secondary",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        mt: 0.5,
                    }}
                >
                    {truncate(author, 15)}
                </Typography>
            </Box>
        </Box>
    );
}
