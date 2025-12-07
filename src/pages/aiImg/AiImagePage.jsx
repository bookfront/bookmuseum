// src/pages/ai/AiImagePage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function AiImagePage() {
    const location = useLocation();
    const navigate = useNavigate();

    // BookCreatePage에서 반드시 book 정보를 넘겨와야 함
    const rawBook = location.state?.book;

    if (!rawBook) {
        return (
            <div className="ai-page">
                <h2>잘못된 접근입니다.</h2>
                <p>도서 등록 화면에서 다시 시도해주세요.</p>
                <button
                    className="ai-register-btn"
                    onClick={() => navigate("/register")}
                >
                    도서 등록으로 돌아가기
                </button>
            </div>
        );
    }

    // 전달받은 값들
    const bookId = rawBook.book_id ?? null;
    const bookTitle = rawBook.title ?? "";

    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    // 이미지 생성
    const handleGenerateImage = async () => {
        if (!prompt.trim()) {
            alert("이미지 설명을 입력해줘!");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // 실제 API 호출할 자리
            /*
            const res = await fetch("/api/ai-image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookId,
                    title: bookTitle,
                    prompt,
                }),
            });
            const data = await res.json();
            setImage({
                imgId: data.img_id,
                bookId: data.book_id,
                imgUrl: data.img_url,
            });
            */

            // 테스트용 랜덤 이미지 생성
            await new Promise((r) => setTimeout(r, 800));

            const fakeImgId = Date.now();
            const fakeImgUrl = `https://picsum.photos/seed/${fakeImgId}/600/400`;

            setImage({
                imgId: fakeImgId,
                bookId: bookId,
                imgUrl: fakeImgUrl,
            });
        } catch (e) {
            console.error(e);
            setError("이미지 생성 중 오류가 발생했어.");
        } finally {
            setLoading(false);
        }
    };

    // 생성된 이미지 등록 → BookCreatePage로 이동
    const handleSelectImage = () => {
        if (!image) {
            alert("먼저 이미지를 생성해줘!");
            return;
        }

        navigate("/register", {
            state: {
                coverImage: image.imgUrl,
                imageId: image.imgId,
                bookId: image.bookId,

                // 기존 입력값 유지
                title: rawBook.title,
                author: rawBook.author,
                description: rawBook.description,
            },
        });
    };

    return (
        <div className="ai-page">
            <div className="ai-book-info">
                <div className="ai-book-label">도서 :</div>
                <div className="ai-book-title">『{bookTitle}』</div>
                <div className="ai-book-id">book_id : {bookId}</div>

                <div className="ai-guide-text">
                    도서 제목 + 설명을 기반으로 표지 이미지를 생성해볼게요.
                </div>

                <textarea
                    className="ai-prompt-textarea"
                    placeholder="예: 파스텔톤, 따뜻한 일러스트, 책 읽는 고양이 등"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
            </div>

            <button
                className="ai-generate-btn"
                onClick={handleGenerateImage}
                disabled={loading}
            >
                {loading ? "이미지 생성 중..." : "이미지 생성하기"}
            </button>

            {error && <div className="ai-error">{error}</div>}

            <div className="ai-image-box">
                {image ? (
                    <img
                        src={image.imgUrl}
                        alt="generated-cover"
                        className="ai-image"
                    />
                ) : (
                    "🖼"
                )}
            </div>

            {image && (
                <div className="ai-image-meta">
                    img_id : {image.imgId} / book_id : {image.bookId}
                </div>
            )}

            <button
                className="ai-register-btn"
                onClick={handleSelectImage}
                disabled={!image}
            >
                이미지 등록
            </button>
        </div>
    );
}

export default AiImagePage;
