import React, { useState } from "react";
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
 
 
function App() {
 
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
 
  return (
    <BrowserRouter>
 
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/join" element={<Join />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/register" element={<BookCreatePage />} />
        <Route path="/ai-image" element={<AiImagePage />} />
        <Route path="/update" element={<BookUpdatePage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
 
    </BrowserRouter>
  );
}
 
export default App;