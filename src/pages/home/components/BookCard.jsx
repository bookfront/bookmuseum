import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import HeartFill from "../assets/heart-fill.png";
import HeartLine from "../assets/heart-line.png";
import DefaultCover from "/src/asserts/noneimg.png";

export default function BookCard({
                                     title,
                                     author,
                                     liked,
                                     onToggleLike,
                                     imageUrl,
                                 }) {
    // 텍스트 길이 제한 함수
    const truncate = (text, max) => {
        if (!text) return "";
        return text.length > max ? text.slice(0, max) + "..." : text;
    };

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
                cursor: "pointer", // 클릭 느낌만 유지 (실제 라우팅 없음)
                transition: "0.2s ease",
                "&:hover": {
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                    transform: "translateY(-3px)",
                },
            }}
        >
            {/* 책 이미지 */}
            <Box
                sx={{
                    flex: 1,
                    overflow: "hidden",
                    bgcolor: "#eee",
                }}
            >
                <Box
                    component="img"
                    src={imageUrl || DefaultCover}
                    alt={title}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                    }}
                    onError={(e) => {
                        e.currentTarget.src = DefaultCover;
                    }}
                />
            </Box>

            {/* 책 정보 */}
            <Box sx={{ p: 2 }}>
                {/* 제목 + 하트 */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1,
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            fontSize: 14,
                            flex: 1,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                        title={title}
                    >
                        {truncate(title, 10)}
                    </Typography>

                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation(); // 부모 클릭 이벤트 막기
                            onToggleLike();
                        }}
                        sx={{ padding: 0 }}
                    >
                        <img
                            src={liked ? HeartFill : HeartLine}
                            alt="like"
                            width={22}
                            height={22}
                        />
                    </IconButton>
                </Box>

                {/* 저자 */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 0.5,
                        fontSize: 12,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                    title={author}
                >
                    {truncate(author, 15)}
                </Typography>
            </Box>
        </Box>
    );
}
