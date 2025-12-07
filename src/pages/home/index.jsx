import React from "react";
import PopularBooksSection from "./components/PopularBooksSection";
import BooksListSection from "./components/BooksListSection";

// 🔹 책이 하나도 없을 때 임시로 보여줄 더미 데이터
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

// ❗ App.jsx에서 <Home bookList={bookList} />로 내려준다는 가정
export default function Home({ bookList }) {
    const hasBooks = bookList && bookList.length > 0;

    // 🔸 인기도서: 일단 등록된 책들 중 앞에서 4개만 사용
    const popularBooks = hasBooks ? bookList.slice(0, 4) : mockPopular;

    // 🔸 도서 목록: 등록된 전체 책 / 없으면 더미
    const listBooks = hasBooks ? bookList : mockList;

    return (
        <div style={styles.wrapper}>
            <div style={styles.inner}>
                <PopularBooksSection books={popularBooks} />
                <BooksListSection books={listBooks} />
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
    inner: {
        width: "1200px", // 전체 레이아웃 너비
        padding: "40px",
    },
};
