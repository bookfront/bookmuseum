import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import BookCard from "./BookCard";

export default function PopularBooksSection({ books }) {
    const navigate = useNavigate(); // ✅ 상세페이지로 이동할 네비게이트

    // ✅ 카드 클릭 시 상세페이지로 이동
    const handleGoDetail = (book) => {
        navigate("/detail", {
            state: {
                book: {
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    description: book.description,
                    // 📌 이미지 필드 이름 주의!
                    //   bookList에 coverImage로 들어가 있으니까 그걸 image로 넘겨줌
                    image: book.coverImage || book.image || null,
                    imageId: book.imageId,

                    // 날짜 정보도 있으면 같이 넘겨두기
                    reg_time: book.reg_time || null,
                    update_time: book.update_time || null,
                },
            },
        });
    };
    return (
        <Box sx={{ padding: "40px 0" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
                인기 도서
            </Typography>


            <Box sx={{ display: "flex", gap: 3 }}>
                {books.map((book) => (
                    <Box
                        key={book.id}
                        sx={{ cursor: "pointer" }}                // ✅ 마우스 포인터
                        onClick={() => handleGoDetail(book)}      // ✅ 클릭 시 상세 이동
                    >
                        <BookCard
                            title={book.title}
                            author={book.author}
                            coverImage={book.coverImage}          // ✅ 이미지도 내려주기
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );//dd
}
