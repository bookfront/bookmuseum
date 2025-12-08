// src/pages/detail/Detail.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./detail.css";

function Detail() {
    const location = useLocation();
    const navigate = useNavigate();

    // 로그인 user 정보
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // bookId 받아오기
    const bookId = location.state?.bookId;
    if (!bookId) {
        navigate("/");
        return null;
    }

    const [book, setBook] = useState(null);
    const [comments, setComments] = useState([]);

    const [newComment, setNewComment] = useState("");
    const [editCommentId, setEditCommentId] = useState(null);

    // -------------------------------
    // 📌 1. 도서 상세 조회 API
    // -------------------------------
    const fetchBookDetail = async () => {
        try {
            const res = await fetch(`/api/books/${bookId}`);
            const data = await res.json();

            if (data.status === "success") {
                setBook(data.book);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // -------------------------------
    // 📌 2. 댓글 목록 조회 API
    // -------------------------------
    const fetchComments = async () => {
        try {
            const res = await fetch(`/api/comment?bookId=${bookId}`);
            const data = await res.json();

            setComments(data); // API가 JSON 배열 반환
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBookDetail();
        fetchComments();
    }, []);

    // -------------------------------
    // 📌 3. 댓글 등록
    // -------------------------------
    const handleAddComment = async () => {
        if (!newComment.trim()) {
            alert("댓글을 입력해주세요!");
            return;
        }

        const payload = {
            content: newComment,
            author: currentUser?.login_id || "익명",
            bookId: bookId,
        };

        try {
            const res = await fetch("/api/comment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.commentId) {
                alert("댓글이 등록되었습니다.");
                setNewComment("");
                fetchComments();
            }
        } catch (err) {
            console.error(err);
        }
    };

    // -------------------------------
    // 📌 4. 댓글 수정
    // -------------------------------
    const handleEditComment = async () => {
        if (!newComment.trim()) {
            alert("수정할 내용을 입력해주세요.");
            return;
        }

        try {
            const res = await fetch(`/api/comment/${editCommentId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: newComment }),
            });

            const data = await res.json();

            if (data.status === "success") {
                alert("댓글이 수정되었습니다.");
                setEditCommentId(null);
                setNewComment("");
                fetchComments();
            }
        } catch (err) {
            console.error(err);
        }
    };

    // -------------------------------
    // 📌 5. 댓글 삭제
    // -------------------------------
    const handleDeleteComment = async (id) => {
        try {
            const res = await fetch(`/api/comment/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (data.status === "success") {
                alert("댓글이 삭제되었습니다.");
                fetchComments();
            }
        } catch (err) {
            console.error(err);
        }
    };

    // 댓글 수정 모드 설정
    const startEdit = (id, content) => {
        setEditCommentId(id);
        setNewComment(content);
    };

    if (!book) return <div>불러오는 중...</div>;

    return (
        <div className="detail-container">
            <h2 className="detail-title">도서 상세 정보</h2>

            <div className="detail-box">
                {/* 이미지 */}
                <div className="detail-image-wrapper">
                    <img src={book.img_url} alt="book" className="detail-image" />
                </div>

                {/* 내용 */}
                <div className="detail-content">
                    <h3 className="book-title">{book.title}</h3>

                    <div className="book-date-wrapper">
                        <img src="/date.png" className="book-date-icon" alt="date" />
                        <span>등록일: {book.reg_date}</span>
                        {book.update_date && <span>(수정일: {book.update_date})</span>}
                    </div>

                    <pre className="book-description">{book.content}</pre>
                </div>
            </div>

            {/* 댓글 구역 */}
            <div className="comment-section">
                <h3 className="comment-title">댓글</h3>

                <div className="comment-list">
                    {comments.map((c) => (
                        <div className="comment-item" key={c.commentId}>
                            <span className="comment-user">{c.author}</span>
                            <span className="comment-text">{c.content}</span>

                            {currentUser?.login_id === c.author && (
                                <div className="comment-actions">
                                    <button
                                        className="comment-edit-btn"
                                        onClick={() => startEdit(c.commentId, c.content)}
                                    >
                                        <img src="/edit.png" alt="edit" className="comment-edit-icon" />
                                    </button>

                                    <button
                                        className="comment-delete-btn"
                                        onClick={() => handleDeleteComment(c.commentId)}
                                    >
                                        <img src="/delete.png" alt="delete" className="comment-delete-icon" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 댓글 입력창 */}
                <div className="comment-input-wrapper">
                    <input
                        className="comment-input"
                        type="text"
                        placeholder="댓글을 입력해주세요."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                        className="comment-button"
                        onClick={editCommentId ? handleEditComment : handleAddComment}
                    >
                        {editCommentId ? "수정" : "작성"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Detail;
