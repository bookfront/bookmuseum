import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import {
    ArrowBackIosNew as ArrowBackIosNewIcon,
    ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import BookCard from "./BookCard";

const VISIBLE_COUNT = 4;

export default function PopularBooksSection({ books, onToggleLike, isLoggedIn }) {
    const navigate = useNavigate();

    const limitedBooks = books.slice(0, 8);
    const [currentIndex, setCurrentIndex] = useState(0);
    const maxIndex = Math.max(0, limitedBooks.length - VISIBLE_COUNT);

    const visibleBooks = limitedBooks.slice(currentIndex, currentIndex + VISIBLE_COUNT);

    const handleGoDetail = (book) => {
        navigate("/detail", { state: { book } });
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
                인기 도서
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <IconButton
                    onClick={() => setCurrentIndex((v) => Math.max(0, v - 1))}
                    disabled={currentIndex === 0}
                    sx={{ border: "1px solid #ddd" }}
                >
                    <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>

                <Box sx={{ display: "flex", gap: 3, flex: 1, overflow: "hidden", ml: 5 }}>
                    {visibleBooks.map((book, index) => (
                        <Box
                            key={book.id}
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleGoDetail(book)}
                        >
                            <BookCard
                                id={book.id}
                                title={book.title}
                                author={book.author}
                                liked={book.liked}
                                rank={currentIndex + index + 1}
                                imageUrl={book.coverImage}
                                //onToggleLike={() => {onToggleLike(book.id);}}
                                onToggleLike={onToggleLike}
                                isLoggedIn={isLoggedIn}
                            />
                        </Box>
                    ))}
                </Box>

                <IconButton
                    onClick={() => setCurrentIndex((v) => Math.min(maxIndex, v + 1))}
                    disabled={currentIndex === maxIndex}
                    sx={{ border: "1px solid #ddd" }}
                >
                    <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
            </Box>
        </Box>
    );
}
