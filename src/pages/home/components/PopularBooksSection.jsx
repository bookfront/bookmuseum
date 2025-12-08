import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import BookCard from "./BookCard";

const VISIBLE_COUNT = 4; // 한 번에 보여줄 카드 개수

export default function PopularBooksSection({ books, onToggleLike }) {
    const navigate = useNavigate();

    // 🔥 인기 도서 TOP 8만 사용
    const limitedBooks = books.slice(0, 8);
    const [currentIndex, setCurrentIndex] = useState(0);

    const maxIndex = Math.max(0, limitedBooks.length - VISIBLE_COUNT);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    };

    const visibleBooks = limitedBooks.slice(
        currentIndex,
        currentIndex + VISIBLE_COUNT
    );

    // ✅ 카드 클릭 시 상세 페이지로 이동 (state로 데이터 전달)
    const handleGoDetail = (book) => {
        navigate("/detail", {
            state: {
                book: {
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    description: book.description,
                    // 이미지 필드 여러 패턴 고려
                    image: book.coverImage || book.image || book.imageUrl || null,
                    imageId: book.imageId || null,
                    reg_time: book.reg_time || null,
                    update_time: book.update_time || null,
                },
            },
        });
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
                인기 도서
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                {/* 왼쪽 화살표 */}
                <IconButton
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    sx={{ border: "1px solid #ddd" }}
                >
                    <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>

                {/* 카드 영역 */}
                <Box sx={{ display: "flex", ml: 5, gap: 3, flex: 1, overflow: "hidden" }}>
                    {visibleBooks.map((book, index) => (
                        <Box
                            key={book.id}
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleGoDetail(book)} // ✅ 클릭 시 상세 이동
                        >
                            <BookCard
                                id={book.id}
                                title={book.title}
                                author={book.author}
                                liked={book.liked}
                                rank={currentIndex + index + 1}
                                imageUrl={
                                    book.coverImage || book.image || book.imageUrl || null
                                }
                                onToggleLike={() => onToggleLike(book.id)}
                            />
                        </Box>
                    ))}
                </Box>

                {/* 오른쪽 화살표 */}
                <IconButton
                    onClick={handleNext}
                    disabled={currentIndex === maxIndex}
                    sx={{ border: "1px solid #ddd" }}
                >
                    <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
            </Box>
        </Box>
    );
}
