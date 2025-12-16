import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import PopularBooksSection from "./components/PopularBooksSection";
import BooksListSection from "./components/BooksListSection";
import {
    fetchPopularBooks,
    fetchBookList,
    updateBookLike,
} from "../../api/books";

import MainBanner from "./assets/book_banner.png";

export default function HomePage() {
    const [popularBooks, setPopularBooks] = useState([]);
    const [bookList, setBookList] = useState([]);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const currentLoginId = currentUser?.loginId;
    const isLoggedIn = !!currentLoginId;

    const normalizeBook = (b) => ({
        id: b.bookId,            // 정확한 키로 변경
        title: b.title,
        author: b.author,
        liked: b.liked ?? false, // 백엔드에서 like가 null일 수 있음
        description: b.content || "",
        viewCount: b.viewCnt,
        coverImage: b.imgUrl,
        imageId: b.imageId || null,
    });


    useEffect(() => {
        fetchPopularBooks()
            .then((data) => {
                const normalized = data.map(normalizeBook);
                const sorted = normalized.sort((a, b) => b.viewCount - a.viewCount);
                setPopularBooks(sorted);
            })
            .catch((err) => console.error("❌ 인기 도서 실패:", err));

        fetchBookList()
            .then((data) => {
                const normalized = data.map(normalizeBook);
                const sorted = normalized.sort((a, b) => b.id - a.id);
                setBookList(sorted);
            })
            .catch((err) => console.error("❌ 도서 리스트 실패:", err));
    }, []);

    const toggleLike = (id) => {
        if (!isLoggedIn) {
            console.warn("로그인 안 된 사용자 좋아요 차단");
            return;
        }

        setPopularBooks((prev) =>
            prev.map((book) =>
                book.id === id ? { ...book, liked: !book.liked } : book
            )
        );

        setBookList((prev) =>
            prev.map((book) =>
                book.id === id ? { ...book, liked: !book.liked } : book
            )
        );

        updateBookLike(id).catch((err) =>
            console.error("❌ 좋아요 실패:", err)
        );
    };


    return (
        <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
            <Box sx={{ width: "100%", height: 260, overflow: "hidden", mb: 4 }}>
                <Box
                    component="img"
                    src={MainBanner}
                    alt="메인 배너"
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </Box>

            <Container maxWidth="lg">
                <Box sx={{ mt: 6 }}>
                    <PopularBooksSection books={popularBooks} onToggleLike={toggleLike} isLoggedIn={isLoggedIn} />
                </Box>

                <Box sx={{ mt: 15 }}>
                    <BooksListSection books={bookList} onToggleLike={toggleLike} isLoggedIn={isLoggedIn} />
                </Box>
            </Container>
        </Box>
    );
}
