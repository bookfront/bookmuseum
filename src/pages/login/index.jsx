import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        setError("");

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const foundUser = users.find(
            (u) => u.id === id && u.pw === pw
        );

        if (!foundUser) {
            setError("아이디 또는 비밀번호가 올바르지 않습니다.");
            return;
        }

        // 로그인 성공 → currentUser 저장(로컬 변환하면서 추가한 부분)
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        setIsLoggedIn(true);
        navigate("/");
    };

    return (
        <div className="login-container">
            <div className="login-box">

                <h3 className="login-title">아이디</h3>
                <input
                    className="login-input"
                    type="text"
                    placeholder="아이디를 입력해주세요."
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />

                <h3 className="login-title">비밀번호</h3>

                <div className="password-wrapper">
                    <input
                        className="login-input password-input"
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호를 입력해주세요."
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                    />
                    <img
                        src={showPassword ? "/open_eye.png" : "/close_eye.png"}
                        alt="toggle"
                        className="password-icon"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button className="login-button" onClick={handleLogin}>
                    로그인
                </button>

                <Link to="/join" className="join-link">
                    회원가입
                </Link>
            </div>
        </div>
    );
}

export default Login;
