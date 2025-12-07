import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <div className="login-box">
        
        <h3 className="login-title">아이디</h3>
        <input
          className="login-input"
          type="text"
          placeholder="아이디를 입력해주세요."
        />

        <h3 className="login-title">비밀번호</h3>

        <div className="password-wrapper">
          <input
            className="login-input password-input"
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요."
          />

          <img
            src={showPassword ? "/open_eye.png" : "/close_eye.png"}
            alt="toggle"
            className="password-icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <button className="login-button">로그인</button>

        <Link to="/join" className="join-link">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default Login;
