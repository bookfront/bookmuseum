import React from "react";
import { Box, Typography } from "@mui/material";
import BookListItem from "./BookListItem";
//dd
export default function BooksListSection({ books }) {
    return (
        <Box sx={{ padding: "40px 0" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
                도서 목록
            </Typography>

            <Box>
                {books.map((book) => (
                    <BookListItem
                        key={book.id}
                        title={book.title}
                        author={book.author}
                    />
                ))}
            </Box>
        </Box>
    );
}
