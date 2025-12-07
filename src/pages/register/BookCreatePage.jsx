// src/pages/register/BookCreatePage.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function BookCreatePage() {
    const navigate = useNavigate();
    const location = useLocation();

    // 🔹 AI 페이지에서 돌아올 때 넘겨준 값들을 초기값으로 사용
    const initialTitle = location.state?.title || "";
    const initialAuthor = location.state?.author || "";
    const initialDescription = location.state?.description || "";
    const initialBookId = location.state?.bookId || Date.now(); // 임시 book_id

    // 입력 폼 상태
    const [title, setTitle] = useState(initialTitle);
    const [author, setAuthor] = useState(initialAuthor);
    const [description, setDescription] = useState(initialDescription);
    const [bookId] = useState(initialBookId); // 고정

    // AI 이미지 페이지에서 돌아오면서 넘겨준 이미지 정보
    const coverImage = location.state?.coverImage || null;
    const coverImageId = location.state?.imageId || null;

    // 모든 값이 채워졌는지 확인 (버튼 활성화 조건)
    const isFormValid =
        title.trim().length > 0 &&
        author.trim().length > 0 &&
        description.trim().length > 0 &&
        !!coverImage; // 이미지 필수

    const goToAiImagePage = () => {
        // 🔸 제목 / 저자 / 내용이 모두 있어야 이동
        if (!title.trim() || !author.trim() || !description.trim()) {
            alert("제목, 저자, 책 내용을 먼저 모두 입력해줘!");
            return;
        }

        navigate("/ai-image", {
            state: {
                book: {
                    book_id: bookId,            // AI 페이지에서 보여줄 book_id
                    title: title.trim(),
                    author: author.trim(),
                    description: description.trim(),
                },
                currentImageId: coverImageId || null,
            },
        });
    };

    // 도서 등록 버튼 클릭 시
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isFormValid) {
            alert("제목, 저자, 책 내용, 표지 이미지를 모두 채워줘!");
            return;
        }

        const payload = {
            title: title.trim(),
            author: author.trim(),
            description: description.trim(),
            coverImage,
            coverImageId,
            // bookId는 실제 DB등록 시엔 백엔드에서 생성
        };

        // 🔥 나중에 여기에 실제 백엔드로 POST
        console.log("도서 등록 데이터:", payload);
        alert("도서 등록이 완료되었습니다! (지금은 콘솔에만 찍힘)");
    };

    return (
        <div style={{ padding: "40px" }}>
            <h2>도서 등록</h2>

            <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", gap: "40px", marginTop: "24px" }}>
                    {/* 왼쪽: 이미지 영역 */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {/* 이미지 박스 */}
                        <div
                            onClick={goToAiImagePage}
                            style={{
                                width: "260px",
                                height: "320px",
                                border: "1px dashed #ccc",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: coverImage ? "0px" : "40px",
                                color: "#ccc",
                                cursor: "pointer",
                                overflow: "hidden",
                                borderRadius: "6px",
                                backgroundColor: "#fafafa",
                            }}
                        >
                            {coverImage ? (
                                <img
                                    src={coverImage}
                                    alt="book-cover"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                "+"
                            )}
                        </div>

                        {/* 이미지 설명 + 수정 버튼 */}
                        {coverImage ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <span
                                    style={{
                                        fontSize: "12px",
                                        color: "#555",
                                    }}
                                >
                                    표지 이미지가 선택되었습니다.
                                </span>
                                {coverImageId && (
                                    <span
                                        style={{
                                            fontSize: "11px",
                                            color: "#999",
                                        }}
                                    >
                                        이미지 ID: {coverImageId}
                                    </span>
                                )}
                                <button
                                    type="button"
                                    onClick={goToAiImagePage}
                                    style={{
                                        marginTop: "4px",
                                        width: "260px",
                                        height: "32px",
                                        backgroundColor: "#fff",
                                        color: "#222",
                                        border: "1px solid #ddd",
                                        borderRadius: "4px",
                                        fontSize: "13px",
                                        cursor: "pointer",
                                    }}
                                >
                                    이미지 변경하기
                                </button>
                            </div>
                        ) : (
                            <span style={{ fontSize: "12px", color: "#777" }}>
                                클릭해서 AI로 표지 이미지를 생성하세요.
                            </span>
                        )}
                    </div>

                    {/* 오른쪽: 입력 폼 */}
                    <div style={{ flex: 1 }}>
                        {/* 제목 */}
                        <div style={{ marginBottom: "16px" }}>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "4px",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                }}
                            >
                                제목 *
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="책 제목을 입력하세요"
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    border: "1px solid #ddd",
                                    fontSize: "14px",
                                }}
                            />
                        </div>

                        {/* 저자 */}
                        <div style={{ marginBottom: "16px" }}>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "4px",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                }}
                            >
                                저자 *
                            </label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="저자를 입력하세요"
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    border: "1px solid " +
                                        "#ddd",
                                    fontSize: "14px",
                                }}
                            />
                        </div>

                        {/* 책 내용 */}
                        <div style={{ marginBottom: "24px" }}>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "4px",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                }}
                            >
                                책 내용 *
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="책 소개 / 줄거리 / 간단한 내용을 적어주세요"
                                style={{
                                    width: "100%",
                                    minHeight: "140px",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    border: "1px solid #ddd",
                                    fontSize: "14px",
                                    resize: "vertical",
                                }}
                            />
                        </div>

                        {/* 도서 등록 버튼 */}
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            style={{
                                marginTop: "8px",
                                width: "200px",
                                height: "40px",
                                backgroundColor: isFormValid ? "#222" : "#aaa",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                fontSize: "14px",
                                cursor: isFormValid ? "pointer" : "not-allowed",
                                transition: "background-color 0.2s",
                            }}
                        >
                            도서 등록하기
                        </button>

                        <div
                            style={{
                                marginTop: "8px",
                                fontSize: "12px",
                                color: "#999",
                            }}
                        >
                            * 제목, 저자, 책 내용, 표지 이미지가 모두 입력되어야 등록할 수 있어요.
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default BookCreatePage;
