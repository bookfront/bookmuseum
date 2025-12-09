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
