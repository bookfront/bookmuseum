import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import PopularBooksSection from "./components/PopularBooksSection";
import BooksListSection from "./components/BooksListSection";
import { fetchPopularBooks, fetchBookList, updateBookLike } from "../../api/books";

// 임시 배너 이미지 (원하는 경로/파일명으로 수정)
import MainBanner from "./assets/book_banner.png"; // 없으면 주석 처리해두고 나중에 추가해도 됨

export default function HomePage() {
    const [popularBooks, setPopularBooks] = useState([]);
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        // ✅ 인기 도서: 조회수(viewCount) 기준 정렬
        fetchPopularBooks().then((data) => {
            const sorted = data.sort((a, b) => b.viewCount - a.viewCount);
            setPopularBooks(sorted);
        });

        // ✅ 도서 목록: 최신순(createdAt) 정렬
        fetchBookList().then((data) => {
            const sortedList = data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setBookList(sortedList);
        });
    }, []);

    // ✅ 인기 도서 좋아요 토글
    const togglePopularLike = (id) => {
        setPopularBooks((prev) => {
            const updated = prev.map((book) =>
                book.id === id ? { ...book, liked: !book.liked } : book
            );

            const target = prev.find((b) => b.id === id);
            const nextLiked = target ? !target.liked : true;
            updateBookLike(id, nextLiked);

            return updated;
        });
    };

    // ✅ 도서 목록 좋아요 토글
    const toggleListLike = (id) => {
        setBookList((prev) => {
            const updated = prev.map((book) =>
                book.id === id ? { ...book, liked: !book.liked } : book
            );

            const target = prev.find((b) => b.id === id);
            const nextLiked = target ? !target.liked : true;
            updateBookLike(id, nextLiked);

            return updated;
        });
    };

    return (
        <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
            {/* 🔥 HeroSection 대신 임시 이미지 배너 */}
            <Box
                sx={{
                    width: "100%",
                    height: 260,
                    overflow: "hidden",
                    mb: 4,
                }}
            >
                <Box
                    component="img"
                    src={MainBanner}
                    alt="메인 배너"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                    }}
                />
            </Box>

            <Container maxWidth="lg">
                {/* 인기 도서 섹션 */}
                <Box sx={{ mt: 6 }}>
                    <PopularBooksSection
                        books={popularBooks}
                        onToggleLike={togglePopularLike}
                    />
                </Box>

                {/* 도서 목록 섹션 */}
                <Box sx={{ mt: 15 }}>
                    <BooksListSection
                        books={bookList}
                        onToggleLike={toggleListLike}
                    />
                </Box>
            </Container>
        </Box>
    );
}
