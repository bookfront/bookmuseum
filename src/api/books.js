// src/api/books.js

// 🔥 테스트용 기본 이미지 (AI 이미지 대신 임시 URL 사용)
const sampleImages = [
    "https://picsum.photos/seed/book1/300/400",
    "https://picsum.photos/seed/book2/300/400",
    "https://picsum.photos/seed/book3/300/400",
    "https://picsum.photos/seed/book4/300/400",
    "https://picsum.photos/seed/book5/300/400",
    "https://picsum.photos/seed/book6/300/400",
    "https://picsum.photos/seed/book7/300/400",
    "https://picsum.photos/seed/book8/300/400",
    "https://picsum.photos/seed/book9/300/400",
    "https://picsum.photos/seed/book10/300/400",
];

/* -------------------------
   ❤️ 좋아요 업데이트 API
-------------------------- */
export async function updateBookLike(bookId, liked) {
    console.log("백엔드로 보낼 좋아요 상태:", { bookId, liked });

    // 👉 백엔드 연동 시:
    // return fetch(`/api/books/${bookId}/like`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ liked }),
    // });
}


/* -------------------------
   🔥 인기 도서 목록 (viewCount 기준)
-------------------------- */
export async function fetchPopularBooks() {
    const data = [
        { id: 1, title: "해리포터", author: "J.K. Rowling", liked: false, viewCount: 320 },
        { id: 2, title: "데미안", author: "헤르만 헤세", liked: true, viewCount: 150 },
        { id: 3, title: "나미야 잡화점의 기적", author: "히가시노 게이고", liked: false, viewCount: 480 },
        { id: 4, title: "어린왕자", author: "생텍쥐페리", liked: false, viewCount: 900 },
        { id: 5, title: "1984", author: "조지 오웰", liked: true, viewCount: 1200 },
        { id: 6, title: "죄와 벌", author: "도스토예프스키", liked: false, viewCount: 80 },
        { id: 7, title: "모비 딕", author: "허먼 멜빌", liked: false, viewCount: 60 },
        { id: 8, title: "셜록 홈즈", author: "아서 코난 도일", liked: true, viewCount: 700 },
        { id: 9, title: "그리스인 조르바", author: "카잔차키스", liked: false, viewCount: 350 },
        { id: 10, title: "데미안 확장판", author: "헤르만 헤세", liked: false, viewCount: 90 }
    ];

    // 🔥 이미지 URL 추가
    return data.map((book, index) => ({
        ...book,
        imageUrl: sampleImages[index % sampleImages.length],
    }));
}


/* -------------------------
   📚 전체 도서 목록 (최신순 createdAt 기준)
-------------------------- */
export async function fetchBookList() {
    const data = [
        { id: 11, title: "2401 목록 책 1", author: "저자 A", liked: false, createdAt: "2024-01-10" },
        { id: 12, title: "2403 목록 책 2", author: "저자 B", liked: true, createdAt: "2024-03-01" },
        { id: 13, title: "2312 목록 책 3", author: "저자 C", liked: false, createdAt: "2023-12-20" },
        { id: 14, title: "54 목록 책", author: "저자 D", liked: false, createdAt: "2054-02-15" },
        { id: 15, title: "25 목록 책", author: "저자 E", liked: true, createdAt: "2025-03-01" },
        { id: 16, title: "20 목록 책", author: "저자 F", liked: false, createdAt: "2020-12-20" },
        { id: 17, title: "21 목록 책", author: "저자 G", liked: false, createdAt: "2021-02-15" },
        { id: 18, title: "22 목록 책", author: "저자 H", liked: true, createdAt: "2022-03-01" },
        { id: 19, title: "23 목록 책", author: "저자 I", liked: false, createdAt: "2023-12-20" },
        { id: 20, title: "24 목록 책", author: "저자 J", liked: false, createdAt: "2024-02-15" }
    ];

    // 🔥 이미지 URL 추가
    return data.map((book, index) => ({
        ...book,
        imageUrl: sampleImages[(index + 3) % sampleImages.length],  // 인기 책과 다르게 섞어서
    }));
}
