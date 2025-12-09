// src/pages/login/index.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");

        const payload = { loginId: id, pass: pw };

        try {
            const res = await fetch("/api/member/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.status !== "success") {
                setError(data.message || "로그인 실패");
                return;
            }

            localStorage.setItem(
                "currentUser",
                JSON.stringify({ loginId: id }) // ⭐ loginId 로 저장
            );

            setIsLoggedIn(true);
            alert("로그인 완료!");
            navigate("/");

        } catch (err) {
            setError("서버 연결 실패");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">

                <h3 className="login-title">아이디</h3>
                <input className="login-input"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="아이디를 입력하세요" />

                <h3 className="login-title">비밀번호</h3>

                <div className="password-wrapper">
                    <input
                        className="login-input password-input"
                        type={showPassword ? "text" : "password"}
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        placeholder="비밀번호 입력"
                    />
                    <img
                        src={showPassword ? "/open_eye.png" : "/close_eye.png"}
                        onClick={() => setShowPassword(!showPassword)}
                        className="password-icon"
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button className="login-button" onClick={handleLogin}>
                    로그인
                </button>

                <Link to="/join" className="join-link">회원가입</Link>
            </div>
        </div>
    );
}

export default Login;
