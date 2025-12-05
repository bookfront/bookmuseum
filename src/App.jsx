import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Detail from "./pages/detail";
import Login from "./pages/login";
import Join from "./pages/join";
import Register from "./pages/register";
import Update from "./pages/update";
import MyPage from "./pages/mypage";
import Aimg from "./pages/ailmg";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
