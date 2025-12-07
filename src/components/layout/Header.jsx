import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ isLoggedIn, setIsLoggedIn }) {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <header style={styles.header}>
            <div style={styles.inner}>

                {/* 로고 */}
                <Link to="/" style={{ textDecoration: "none" }}>
                    <img src="/book_logo.png" className="book-logo-icon"  style={styles.logo}  />
                </Link>

                {/* 오른쪽 버튼 영역 */}
                <div style={styles.right}>
                    
                    {isLoggedIn ? (
                        <>
                            <Link to="/mypage" style={{ textDecoration: "none" }}>
                                <button style={styles.userBtn}>마이페이지</button>
                            </Link>

                            <button style={styles.logoutBtn} onClick={handleLogout}>
                                로그아웃
                            </button>
                        </>
                    ) : (
                        <Link to="/login">
                            <button style={styles.userBtn}>로그인</button>
                        </Link>
                    )}

                </div>
            </div>
        </header>
    );
}

const styles = {
    header: {
        width: "100%",
        
        background: "#fff",
        zIndex: 10,
    },

    inner: {
        width: "1500px",
        margin: "0 auto",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    logo: {
        width: "250px",
    },

    right: {
        display: "flex",
        gap: "12px",
    },

    userBtn: {
        border: "1px solid #ddd",
        padding: "6px 12px",
        borderRadius: "4px",
        background: "#fff",
        cursor: "pointer",
    },

    logoutBtn: {
        border: "none",
        padding: "6px 12px",
        borderRadius: "4px",
        background: "#333",
        color: "#fff",
        cursor: "pointer",
    },

    
};
