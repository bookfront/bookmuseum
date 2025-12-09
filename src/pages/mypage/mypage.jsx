// src/pages/mypage/MyPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyPage({ bookList, setBookList }) {
    const navigate = useNavigate();

    // 🔹 지금 로그인한 사용자
    const currentUser = localStorage.getItem("currentUser");

    // 🔹 전역 bookList 중에서 현재 사용자(owner)가 쓴 책만 필터
    const myBooks = bookList.filter((b) => b.owner === currentUser);


    //  좋아요 도서
    const [likedBooks, setLikedBooks] = useState([
        { id: 1, title: "책 제목", liked: true },
        { id: 2, title: "책 제목", liked: true },
        { id: 3, title: "책 제목", liked: true },
        { id: 4, title: "책 제목", liked: true },
    ]);

    // ❤️ 좋아요 토글 기능
    const toggleLike = (id) => {
        setLikedBooks((prev) =>
            prev.map((b) =>
                b.id === id ? { ...b, liked: !b.liked } : b
            )
        );
    };
    // ⭐ 좋아요한 도서 상세 이동
    const handleGoLikedDetail = (book) => {
        navigate("/detail", {
            state: {
                book: {
                    id: book.id,
                    title: book.title,
                    author: "",
                    description: "",
                    image: "",
                },
            },
        });
    };
    // ⭐ 도서 등록 페이지로 이동
    const goToRegister = () => {
        navigate("/register");
    };

    // ⭐ 상세페이지로 이동 (이미지 클릭 시)
    const handleGoDetail = (id) => {
        const targetBook = myBooks.find((b) => b.id === id);
        if (!targetBook) return;

        navigate("/detail", {
            state: {
                book: {
                    id: targetBook.id,
                    title: targetBook.title,
                    author: targetBook.author,
                    description: targetBook.description,
                    image: targetBook.coverImage,   // 🔥 전역 bookList에서는 coverImage 필드 사용
                    imageId: targetBook.coverImageId,
                    reg_time: targetBook.reg_time,
                    update_time: targetBook.update_time,
                },
            },
        });
    };

    // ⭐ 수정 버튼 → 수정 페이지로 이동
    const handleEdit = (id) => {
        const targetBook = myBooks.find((b) => b.id === id);
        if (!targetBook) return;

        // 전역 bookList에 이미 모든 정보가 있으니까 그대로 넘겨줌
        navigate("/update", {
            state: targetBook,
        });
    };

    // ⭐ 삭제 버튼 → 전역 bookList에서 삭제
    const handleDelete = (id) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        setBookList((prev) => prev.filter((book) => book.id !== id));
    };

    return (
        <div style={styles.container}>
            {/* 헤더 영역: 제목 + (아래 오른쪽 버튼) */}
            <h3 style={styles.title}>마이페이지</h3>

            {/* 제목 바로 아래, 오른쪽 정렬된 버튼 */}
            <div style={styles.registerRow}>
                <button style={styles.registerBtn} onClick={goToRegister}>
                    + 도서 등록하기
                </button>
            </div>

            {/* 등록한 도서 (전역 bookList 기반*/}
            <section style={styles.section}>
                <h3 style={styles.subTitle}>등록한 도서</h3>
                <div style={styles.bookGrid}>
                    {myBooks.length === 0 && (
                        <p style={{ color: "#888" }}>등록한 도서가 없습니다.</p>
                    )}

                    {myBooks.map((book) => (
                        <div key={book.id} style={styles.card} onClick={() => handleGoDetail(book.id)}>
                            <div
                                style={{ ...styles.imageBox, cursor: "pointer" }}
                                onClick={() => handleGoDetail(book.id)}
                            >
                                {book.coverImage && (
                                    <img
                                        src={book.coverImage}
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
                                            handleEdit(book.id);
                                        }}
                                    >
                                        수정
                                    </button>
                                    <button
                                        style={styles.deleteBtn}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(book.id);
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

            {/* 좋아요 누른 도서 */}            
            <section style={styles.section}>
                <h3 style={styles.subTitle}>좋아요 누른 도서</h3>
                <div style={styles.bookGrid}>
                    {likedBooks.map((book) => (
                        <div 
                            key={book.id} 
                            style={styles.card}
                            onClick={() => handleGoLikedDetail(book.id)}   // ⭐ 카드 클릭 → 상세 이동
                        >

                            <div style={styles.imageBox}></div>

                            <div style={styles.rowBetween}>
                                <p style={styles.bookTitle}>{book.title}</p>

                                {/* ❤️ 하트 클릭 시 상세 이동 막기 */}
                                <div
                                    style={styles.likeIconBox}
                                    onClick={(e) => {
                                        e.stopPropagation();    // ⭐ 상세 이동 막기
                                        toggleLike(book.id);
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
        marginLeft:"50px"
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
        width: "24px",    // 고정!
        height: "24px",   // 고정!
        cursor: "pointer",
        objectFit: "contain",
    },
    likeIconBox: {
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
    },
};
