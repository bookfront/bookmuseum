import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import BookCreatePage from "./pages/register/BookCreatePage.jsx";
import AiImagePage from "./pages/aiImg/AiImagePage.jsx";
import BookUpdatePage from "./pages/update/BookUpdatePage.jsx";

import Home from "./pages/home";
import Login from "./pages/login";
import Join from "./pages/join";
import Detail from "./pages/detail";
import MyPage from "./pages/mypage/mypage.jsx";

import Header from "./components/layout/Header.jsx";

const API_BASE_URL = "http://localhost:8080";

function App() {
    // 🔥 로그인 여부 (로컬스토리지 기반)
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("currentUser")
    );

    // 🔥 모든 페이지가 공유하는 도서 리스트
    const [bookList, setBookList] = useState([]);

    // ✅ 앱 처음 켜질 때 서버에서 도서 목록 가져오기
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/books`, {
                    method: "GET",
                    credentials: "include", // JWT 쿠키 쓰면 유지
                });

                if (!res.ok) {
                    console.warn("도서 목록 조회 실패:", res.status);
                    return;
                }

                const data = await res.json(); // List<BookDTO>
                // BookDTO: { bookId, title, author, viewCnt, imgUrl }

                const mapped = data.map((b) => ({
                    id: b.bookId,
                    title: b.title,
                    author: b.author,
                    description: "", // DTO에 내용이 없으면 일단 공백
                    coverImage: b.imgUrl,
                    coverImageId: null,
                    reg_time: null,
                    update_time: null,
                    owner: b.ownerLoginId,
                }));

                setBookList(mapped);
            } catch (err) {
                console.error("도서 목록 조회 중 오류:", err);
            }
        };

        fetchBooks();
    }, []);

    return (
        <BrowserRouter>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

            <Routes>
                <Route path="/" element={<Home bookList={bookList} />} />
                <Route
                    path="/login"
                    element={<Login setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route path="/join" element={<Join />} />
                <Route path="/detail" element={<Detail />} />
                <Route
                    path="/register"
                    element={<BookCreatePage setBookList={setBookList} />}
                />
                <Route path="/ai-image" element={<AiImagePage />} />
                <Route
                    path="/update"
                    element={
                        <BookUpdatePage bookList={bookList} setBookList={setBookList} />
                    }
                />
                <Route path="/mypage" element={<MyPage bookList={bookList} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
