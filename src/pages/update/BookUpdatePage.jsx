// src/pages/edit/BookEditPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function BookEditPage() {
    const navigate = useNavigate();
    const { bookId } = useParams(); // /edit/:bookId 형태일 때 사용
    const location = useLocation();

    // AI 이미지 페이지에서 변경된 이미지가 돌아올 수도 있다
    const newCoverImage = location.state?.coverImage || null;
    const newCoverImageId = location.state?.imageId || null;

    // 기존 책 정보를 저장
    const [book, setBook] = useState(null);

    // 입력 상태
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [coverImageId, setCoverImageId] = useState(null);

    // ⭐ 수정 버튼 활성화 조건
    const isFormValid =
        title.trim() &&
        author.trim() &&
        description.trim() &&
        coverImage;

    // ⭐ 책 정보 불러오기 (나중에 백엔드 붙이면 fetch로 교체)
    useEffect(() => {
        // 지금은 더미로 테스트
        // 나중엔 bookId로 GET /books/{id} 요청
        const dummy = {
            id: bookId,
            title: "고양이와 함께한 순간",
            author: "이수린",
            description: "책 내용!",
            coverImage:
                "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.png",
            coverImageId: 1001,
        };

        setBook(dummy);
        setTitle(dummy.title);
        setAuthor(dummy.author);
        setDescription(dummy.description);
        setCoverImage(dummy.coverImage);
        setCoverImageId(dummy.coverImageId);
    }, [bookId]);

    // AI 이미지 페이지에서 돌아온 경우 초기 이미지 덮어쓰기
    useEffect(() => {
        if (newCoverImage) {
            setCoverImage(newCoverImage);
            setCoverImageId(newCoverImageId);
        }
    }, [newCoverImage, newCoverImageId]);

    // ⭐ AI 이미지 페이지로 이동
    const goToAiImage = () => {
        navigate("/ai-image", {
            state: {
                book: {
                    id: bookId,
                    title,
                    author,
                },
                currentImageId: coverImageId,
            },
        });
    };

    // ⭐ 수정하기 요청
    const handleEdit = (e) => {
        e.preventDefault();

        if (!isFormValid) {
            alert("모든 정보를 입력해야 수정할 수 있어!");
            return;
        }

        const payload = {
            id: bookId,
            title,
            author,
            description,
            coverImage,
            coverImageId,
        };

        // 나중에 PUT /books/{id} 호출
        console.log("수정 데이터:", payload);
        alert("수정 완료! (지금은 콘솔에서만 확인 가능)");

        // 나중에 마이페이지로 이동할 수도 있음
        // navigate("/mypage");
    };

    if (!book) return <div>로딩 중...</div>;

    return (
        <div style={{ padding: "40px" }}>
            <h2 style={{ marginBottom: "16px" }}>도서 수정</h2>

            <form onSubmit={handleEdit}>
                <div style={{ display: "flex", gap: "40px" }}>
                    {/* LEFT: 이미지 */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div
                            style={{
                                width: "320px",
                                height: "420px",
                                border: "1px solid #eee",
                                borderRadius: "6px",
                                overflow: "hidden",
                                backgroundColor: "#fafafa",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={coverImage}
                                alt="cover"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>

                        <button
                            type="button"
                            onClick={goToAiImage}
                            style={{
                                marginTop: "16px",
                                width: "180px",
                                height: "36px",
                                backgroundColor: "#222",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "14px",
                            }}
                        >
                            이미지 재생성
                        </button>
                    </div>

                    {/* RIGHT: 입력 영역 */}
                    <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", fontWeight: 600, marginBottom: "6px" }}>
                                제목
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{
                                    width: "100%",
                                    height: "38px",
                                    padding: "8px",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", fontWeight: 600, marginBottom: "6px" }}>
                                저자
                            </label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                style={{
                                    width: "100%",
                                    height: "38px",
                                    padding: "8px",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", fontWeight: 600, marginBottom: "6px" }}>
                                내용
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                    resize: "vertical",
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!isFormValid}
                            style={{
                                marginTop: "24px",
                                width: "140px",
                                height: "40px",
                                backgroundColor: isFormValid ? "#222" : "#aaa",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: isFormValid ? "pointer" : "not-allowed",
                            }}
                        >
                            수정
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default BookEditPage;
