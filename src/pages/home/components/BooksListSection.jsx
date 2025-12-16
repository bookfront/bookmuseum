import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookCard from "./BookCard";

export default function BooksListSection({ books, onToggleLike, isLoggedIn }) {
    const navigate = useNavigate();

    const handleGoDetail = (book) => {
        navigate("/detail", { state: { book } });
    };

    return (
        <Box sx={{ padding: "40px 0" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
                도서 목록
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: 3,
                }}
            >
                {books.map((book) => (
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
                            imageUrl={book.coverImage}
                            //onToggleLike={() => onToggleLike(book.id)}
                            onToggleLike={onToggleLike}
                            isLoggedIn={isLoggedIn}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
