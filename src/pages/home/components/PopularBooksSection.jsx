import React from "react";
import { Box, Typography } from "@mui/material";
import BookCard from "./BookCard";

export default function PopularBooksSection({ books }) {
    return (
        <Box sx={{ padding: "40px 0" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
                인기 도서
            </Typography>

            <Box sx={{ display: "flex", gap: 3 }}>
                {books.map((book) => (
                    <BookCard
                        key={book.id}
                        title={book.title}
                        author={book.author}
                    />
                ))}
            </Box>
        </Box>
    );//dd
}
