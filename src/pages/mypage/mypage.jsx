// src/pages/mypage/MyPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyPage() {
    const navigate = useNavigate();

    // 🔹 현재 로그인한 사용자 정보 (PK 포함)
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const memberId = currentUser.loginId; // ⭐ 반드시 PK 사용

    // 🔹 백엔드에서 가져온 데이터
    const [myBooks, setMyBooks] = useState([]);
    const [likedBooks, setLikedBooks] = useState([]);

    // 🔹 API 기본 주소
    const API_BASE = "http://localhost:8080";

    // =====================================================
    // 📌 내가 등록한 도서 조회 API
    // =====================================================
    const loadMyBooks = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/mypage`, {
                params: { memberId },
                withCredentials: true,
            });

            console.log("📌 [내 도서 응답]", res.data);

            setMyBooks(res.data);
        } catch (err) {
            console.error("내 도서 조회 오류:", err);
        }
    };

    // =====================================================
    // 📌 좋아요한 도서 조회 API
    // =====================================================
    const loadLikedBooks = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/mypage/liked`, {
                params: { memberId },
                withCredentials: true,
            });

            setLikedBooks(res.data);
        } catch (err) {
            console.error("좋아요 도서 조회 오류:", err);
        }
    };

    // =====================================================
    // 📌 등록한 도서 삭제 API
    // =====================================================
    const handleDelete = async (id) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            await axios.delete(`${API_BASE}/api/mypage/${id}`, {
                data: { book_id: id },
                withCredentials: true,
            });

            alert("삭제 완료");
            loadMyBooks();
        } catch (err) {
            console.error("삭제 실패:", err);
            alert("삭제 실패");
        }
    };

    // =====================================================
    // 📌 페이지 로드시 API 호출
    // =====================================================
    useEffect(() => {
        if (!memberId) {
            console.error("⚠ memberId 없음. 로그인 정보 확인 필요.");
            return;
        }
        loadMyBooks();
        loadLikedBooks();
    }, []);

    // =====================================================
    // 📌 페이지 이동 함수들
    // =====================================================
    const goToRegister = () => navigate("/register");


    const handleGoDetail = (book) => {
        navigate("/detail", {
            state: {
                book: {
                    id: book.bookId,
                    title: book.title,
                    author: book.author,
                    content: book.content,
                    imgUrl: book.imgUrl,
                },
            },
        });
    };

    const handleEdit = (book) => {
        navigate("/update", {
            state: {
                id: book.bookId,          // PK
                title: book.title,
                author: book.author,
                description: book.content, // UpdatePage가 요구하는 필드명
                coverImage: book.imgUrl,   // UpdatePage가 요구하는 필드명
                coverImageId: book.imageId, // 있으면 전달 (없으면 undefined)
                reg_time: book.reg_time,
                update_time: book.update_time,
            },
        });
    };


    // =====================================================
    // 📌 좋아요 토글 API
    // =====================================================
    const toggleLike = async (bookId) => {
        try {
            const res = await axios.patch(
                `${API_BASE}/api/books/${bookId}`,
                { member: { id: memberId } }, // ⭐ PK 사용
                { withCredentials: true }
            );

            const status = res.data;

            setLikedBooks((prev) =>
                prev.map((b) =>
                    b.book_id === bookId
                        ? { ...b, liked: status === "liked" }
                        : b
                )
            );

            loadLikedBooks();
        } catch (err) {
            console.error("좋아요 토글 실패:", err);
        }
    };

    // =====================================================
    // 📌 UI
    // =====================================================
    return (
        <div style={styles.container}>
            <h3 style={styles.title}>마이페이지</h3>

            <div style={styles.registerRow}>
                <button style={styles.registerBtn} onClick={goToRegister}>
                    + 도서 등록하기
                </button>
            </div>

            {/* 내가 등록한 도서 */}
            <section style={styles.section}>
                <h3 style={styles.subTitle}>등록한 도서</h3>

                <div style={styles.bookGrid}>
                    {myBooks.length === 0 && (
                        <p style={{ color: "#888" }}>등록한 도서가 없습니다.</p>
                    )}

                    {myBooks.map((book) => (
                        <div
                            key={book.book_id}
                            style={styles.card}
                            onClick={() => handleGoDetail(book)}
                        >
                            <div style={styles.imageBox}>
                                {book.imgUrl && (
                                    <img
                                        src={book.imgUrl}
                                        alt={book.title}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            borderRadius: "6px",
                                        }}
                                    />
                                )}
                            </div>

                            <div style={styles.rowBetween}>
                                <p style={styles.bookTitle}>{book.title}</p>

                                <div style={styles.actionRow}>
                                    <button
                                        style={styles.editBtn}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEdit(book);
                                        }}
                                    >
                                        수정
                                    </button>

                                    <button
                                        style={styles.deleteBtn}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(book.book_id);
                                        }}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 좋아요한 도서 */}
            <section style={styles.section}>
                <h3 style={styles.subTitle}>좋아요 누른 도서</h3>

                <div style={styles.bookGrid}>
                    {likedBooks.map((book) => (
                        <div
                            key={book.book_id}
                            style={styles.card}
                            onClick={() => handleGoDetail(book)}
                        >
                            <div style={styles.imageBox}>
                                {book.imgUrl && (
                                    <img
                                        src={book.imgUrl}
                                        alt={book.title}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            borderRadius: "6px",
                                        }}
                                    />
                                )}
                            </div>

                            <div style={styles.rowBetween}>
                                <p style={styles.bookTitle}>{book.title}</p>

                                <div
                                    style={styles.likeIconBox}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleLike(book.book_id);
                                    }}
                                >
                                    <img
                                        src={
                                            book.liked
                                                ? "/heart-line.png"
                                                : "/heart-fill.png"
                                        }
                                        alt="heart"
                                        style={styles.likeIcon}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

// -------------------------
// 스타일
// -------------------------
const styles = {
    container: {
        width: "1400px",
        margin: "80px 270px",
    },
    title: {
        fontSize: "30px",
        fontWeight: "bold",
        marginBottom: "16px",
    },
    registerRow: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "60px",
    },
    registerBtn: {
        padding: "8px 18px",
        marginRight: "220px",
        backgroundColor: "#222",
        color: "#fff",
        borderRadius: "6px",
        border: "none",
        fontSize: "14px",
        cursor: "pointer",
    },
    subTitle: {
        fontSize: "18px",
        marginBottom: "70px",
    },
    section: {
        marginBottom: "150px",
    },
    bookGrid: {
        display: "flex",
        gap: "24px",
        flexWrap: "wrap",
    },
    card: {
        width: "180px",
        border: "1px solid ",
        borderRadius: "8px",
        padding: "16px",
        background: "#fff",
        marginLeft: "50px",
        cursor: "pointer",
    },
    imageBox: {
        width: "100%",
        height: "200px",
        background: "#f1f1f1",
        borderRadius: "6px",
        marginBottom: "16px",
    },
    rowBetween: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    bookTitle: {
        fontSize: "14px",
    },
    actionRow: {
        display: "flex",
        gap: "8px",
    },
    editBtn: {
        border: "none",
        background: "transparent",
        color: "#0070f3",
        cursor: "pointer",
    },
    deleteBtn: {
        border: "none",
        background: "transparent",
        color: "red",
        cursor: "pointer",
    },
    likeIcon: {
        width: "24px",
        height: "24px",
        cursor: "pointer",
        objectFit: "contain",
    },
    likeIconBox: {
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
    },
};
