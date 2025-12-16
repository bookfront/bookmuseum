
// ------------------------------------------------------
// 공통 응답 핸들러 (JSON 응답용)
// ------------------------------------------------------
async function handleResponse(response) {
    const text = await response.text();

    if (!response.ok) {
        console.error("📡 API 오류:", response.status, text);
        throw new Error(`API 오류 (${response.status}): ${text}`);
    }

    // 빈 응답이면 null 반환
    if (!text) return null;

    // JSON 파싱
    try {
        return JSON.parse(text);
    } catch (e) {
        console.error("❌ JSON 파싱 실패:", e, text);
        throw e;
    }
}

// ------------------------------------------------------
// 메인페이지 API
// ------------------------------------------------------

// 🔥 인기 도서 목록 (GET /api/main)
export async function fetchPopularBooks() {
    const res = await fetch("/api/main", {
        method: "GET",
        credentials: "include",
    });
    return handleResponse(res);
}

// 🔥 전체 도서 목록 (GET /api/main/hot)
export async function fetchBookList() {
    const res = await fetch("/api/main/hot", {
        method: "GET",
        credentials: "include",
    });
    return handleResponse(res);
}

// ------------------------------------------------------
// 좋아요 API (PATCH /api/books/{bookId})
// 응답은 JSON이 아니라 "liked" / "unliked" 텍스트
// ------------------------------------------------------

export async function updateBookLike(bookId) {
    console.log("📌 updateBookLike 호출됨, bookId:", bookId);

    const res = await fetch(`/api/books/${bookId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            member: { id: 1 } // TODO: 로그인 완성 후 실제 userId로 교체
        }),
    });

    const text = await res.text(); // API 명세서에 따라 텍스트로 받아야 함

    if (!res.ok) {
        console.error("📡 좋아요 API 오류:", res.status, text);
        throw new Error(`API 오류 (${res.status}): ${text}`);
    }

    console.log("💬 좋아요 API 응답:", text);
    return text; // "liked" 또는 "unliked"
}
