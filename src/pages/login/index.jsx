import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [error, setError] = useState("");

    // ⭐ 실제 백엔드 로그인 API 호출로 변경
    const handleLogin = async () => {
        setError("");

        const payload = {
            loginId: id,
            pass: pw,
        };

        try {
            const res = await fetch("/api/member/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.status !== "success") {
                setError(data.message || "로그인 실패");
                return;
            }

            // ⭐ 로그인 성공 → currentUser 저장
            const loginUser = {
                loginId: id,
            };

            localStorage.setItem("currentUser", JSON.stringify(loginUser));
            setIsLoggedIn(true);
            alert("로그인이 완료되었습니다!");

            navigate("/");
        } catch (err) {
            console.error(err);
            setError("서버와 연결할 수 없습니다.");
        }
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
