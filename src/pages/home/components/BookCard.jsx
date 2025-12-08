import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import HeartFill from "../assets/heart-fill.png";
import HeartLine from "../assets/heart-line.png";
import DefaultCover from "../assets/book-placeholder.png";
import { useNavigate } from "react-router-dom";

export default function BookCard({
                                     id,
                                     title,
                                     author,
                                     liked,
                                     onToggleLike,
                                     rank,      // 지금은 안 쓰지만, 필요하면 제목 앞에 붙여서 쓸 수 있음
                                     imageUrl,
                                 }) {
    const navigate = useNavigate();

    const truncate = (text, max) => {
        if (!text) return "";
        return text.length > max ? text.slice(0, max) + "..." : text;
    };

    return (
        <Box
            onClick={() => navigate(`/detail/${id}`)}
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
                transition: "0.2s ease",
                "&:hover": {
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                    transform: "translateY(-3px)",
                },
            }}
        >
            {/* 이미지 영역 */}
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
                        // 이미지 URL 깨지면 기본 이미지로 대체
                        e.currentTarget.src = DefaultCover;
                    }}
                />
            </Box>

            {/* 책 정보 */}
            <Box sx={{ p: 2 }}>
                {/* 제목 + 하트 한 줄 */}
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
                        title={title} // hover 시 전체 제목 툴팁
                    >
                        {truncate(title, 10)}
                    </Typography>

                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
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