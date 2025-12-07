
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import BookCreatePage from "./pages/register/BookCreatePage.jsx";
import AiImagePage from "./pages/aiImg/AiImagePage.jsx";
import BookUpdatePage from "./pages/update/BookUpdatePage.jsx";

import Home from "./pages/home";
import Login from "./pages/login";
import Join from "./pages/join";
import Detail from "./pages/detail";
import Header from "./components/layout/Header.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/header" element={< Header/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/register" element={<BookCreatePage />} />
        <Route path="/ai-image" element={<AiImagePage />} />
        <Route path="/update" element={<BookUpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
