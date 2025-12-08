import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookCard from "./BookCard";

export default function BooksListSection({ books, onToggleLike }) {
    const navigate = useNavigate();

    // ✅ 카드 클릭 시 상세 페이지 이동 + state로 데이터 전달
    const handleGoDetail = (book) => {
        navigate("/detail", {
            state: {
                book: {
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    description: book.description || "",
                    image: book.coverImage || book.image || book.imageUrl || null,
                    imageId: book.imageId || null,
                    reg_time: book.reg_time || null,
                    update_time: book.update_time || null,
                },
            },
        });
    };

    return (
        <Box sx={{ padding: "40px 0" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
                도서 목록
            </Typography>

            {/* 카드 그리드 */}
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
                        onClick={() => handleGoDetail(book)}   // ✅ 클릭 시 상세 이동
                    >
                        <BookCard
                            id={book.id}
                            title={book.title}
                            author={book.author}
                            liked={book.liked}
                            imageUrl={book.coverImage || book.image || book.imageUrl || null}
                            onToggleLike={() => onToggleLike(book.id)}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
