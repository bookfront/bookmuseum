import React, { useState, useEffect } from "react";
import PopularBooksSection from "./components/PopularBooksSection";
import BooksListSection from "./components/BooksListSection";

export default function Home() {

    // 📌 1) 상태 만들기
    const [popularBooks, setPopularBooks] = useState([]);
    const [bookList, setBookList] = useState([]);

    // 📌 2) 페이지가 처음 열릴 때 가짜 데이터 넣기
    useEffect(() => {
        const mockPopular = [
            { id: 1, title: "인기 책 1", author: "저자 A" },
            { id: 2, title: "인기 책 2", author: "저자 B" },
            { id: 3, title: "인기 책 3", author: "저자 C" },
            { id: 4, title: "인기 책 4", author: "저자 D" },
        ];

        const mockList = [
            { id: 11, title: "목록 책 1", author: "저자 H" },
            { id: 12, title: "목록 책 2", author: "저자 I" },
            { id: 13, title: "목록 책 3", author: "저자 J" },
            { id: 14, title: "목록 책 4", author: "저자 K" },
        ];

        setPopularBooks(mockPopular);
        setBookList(mockList);
    }, []);

    return (
        <div>

            <div style={{ padding: "40px" }}>

                <PopularBooksSection books={popularBooks} />
                <BooksListSection books={bookList} />
            </div>
        </div>
    );//dd
}
