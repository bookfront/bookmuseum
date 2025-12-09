// src/pages/aiImg/AiImagePage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import noneImg from "../../asserts/noneimg.png";
import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardMedia,
    CardContent,
    Stack,
    CircularProgress,
} from "@mui/material";

const API_BASE_URL = "http://localhost:8080"; // 스프링 서버 주소

function AiImagePage() {
    const location = useLocation();
    const navigate = useNavigate();

    // 등록에서 왔는지(create) / 수정에서 왔는지(edit)
    const mode = location.state?.mode ?? "create";

    // BookCreatePage 또는 BookUpdatePage에서 넘겨준 도서 정보
    const rawBook = location.state?.book;

    if (!rawBook) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#f5f5f5",
                    p: 3,
                }}
            >
                <Typography variant="h5" gutterBottom>
                    잘못된 접근입니다.
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    도서 등록/수정 화면에서 다시 시도해주세요.
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate("/register")}
                >
                    도서 등록으로 돌아가기
                </Button>
            </Box>
        );
    }

    // ✅ 도서 ID 통일: id 기준, 예전 book_id도 대비
    const bookId = rawBook.id ?? rawBook.book_id ?? null;
    const bookTitle = rawBook.title ?? "";
    const bookAuthor = rawBook.author ?? "";
    const bookDescription = rawBook.description ?? "";

    // OpenAI API 키 (연습이라 화면에서 받도록)
    const [apiKey, setApiKey] = useState("");

    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    // image: { imageId, bookId, imgUrl }
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    // ==============================
    // 🔷 OpenAI 이미지 생성 호출부
    // ==============================
    const handleGenerateImage = async () => {
        if (!apiKey.trim()) {
            alert("OpenAI API 키를 먼저 입력해줘!");
            return;
        }
        if (!prompt.trim()) {
            alert("이미지 설명을 입력해줘!");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                "https://api.openai.com/v1/images/generations",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({
                        prompt: prompt,
                        model: "dall-e-3",
                        n: 1,
                        size: "1024x1024",
                        quality: "standard",
                        style: "vivid",
                        response_format: "url",
                    }),
                }
            );

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                console.error("OpenAI error:", errData);
                throw new Error(
                    errData.error?.message || "OpenAI 요청 실패"
                );
            }

            const data = await response.json();
            const imageUrl = data.data?.[0]?.url;
            if (!imageUrl) {
                throw new Error("이미지 URL이 응답에 없습니다.");
            }

            console.log("생성된 이미지 URL:", imageUrl);

            // ✅ 프론트 상태에 저장
            setImage({
                imageId: Date.now(), // 프론트 임시 id
                bookId,
                imgUrl: imageUrl,
            });
        } catch (e) {
            console.error(e);
            setError(e.message || "이미지 생성 중 오류가 발생했어.");
        } finally {
            setLoading(false);
        }
    };

    // 생성된 이미지 선택 → (edit면 서버에 저장까지) → 원래 페이지로 이동
    const handleSelectImage = async () => {
        if (!image) {
            alert("먼저 이미지를 생성해줘!");
            return;
        }

        // 🟡 등록/수정 페이지로 넘길 공통 state
        const commonState = {
            id: bookId,
            coverImage: image.imgUrl,
            imageId: image.imageId,
            title: bookTitle,
            author: bookAuthor,
            description: bookDescription,
        };

        // 🟢 수정 모드일 때: 서버에 표지 URL 반영
        if (mode === "edit" && bookId) {
            try {
                const res = await fetch(
                    `${API_BASE_URL}/api/books/${bookId}/cover-url`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        // credentials: "include", // 세션 기반이면 주석 해제
                        body: JSON.stringify({
                            imgUrl: image.imgUrl, // CoverImageRequest의 필드명과 일치
                        }),
                    }
                );

                if (!res.ok) {
                    console.warn(
                        "표지 이미지 URL 업데이트 실패, 상태코드:",
                        res.status
                    );
                } else {
                    const updatedBook = await res
                        .json()
                        .catch(() => null);
                    console.log(
                        "서버에 표지 이미지 URL 반영 완료:",
                        updatedBook
                    );
                }
            } catch (err) {
                console.warn(
                    "표지 이미지 URL 업데이트 API 호출 실패:",
                    err
                );
            }
        }

        // 🟣 화면 이동
        if (mode === "edit") {
            navigate("/update", {
                state: commonState,
            });
        } else {
            navigate("/register", {
                state: commonState,
            });
        }
    };

    return (
        <Box
            className="detail-container"
            sx={{
                width: "1400px",
                paddingTop: "10px",
                paddingLeft: "270px",
                boxSizing: "border-box",
                minHeight: "100vh",
                maxWidth: 960,
                mx: "auto",
                px: 3,
            }}
        >
            <Box
                sx={{
                    maxWidth: 960,
                    bgcolor: "#ffffff",
                    mx: "auto",
                    px: 3,
                }}
            >
                {/* 상단: 도서 정보 + 안내 */}
                <Box sx={{ mb: 4 }}>
                    {/* 도서정보: 제목 (가로 정렬) */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700, fontSize: 30 }}
                        >
                            도서:
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", fontSize: 30 }}
                        >
                            {bookTitle}
                        </Typography>
                    </Box>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mt: 0.5, mb: 2 }}
                    >
                        ID : {bookId}
                    </Typography>

                    {/* 🔑 API 키 입력 */}
                    <TextField
                        label="OpenAI API Key"
                        type="password"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                    />

                    <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 1 }}
                    >
                        원하는 표지 이미지를 생성해보세요.
                    </Typography>

                    <TextField
                        label="이미지 설명 (프롬프트)"
                        placeholder="예: 파스텔톤, 따뜻한 일러스트, 책 읽는 고양이 등"
                        multiline
                        minRows={3}
                        fullWidth
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </Box>

                {/* 가운데: 버튼 + 이미지 카드 */}
                <Stack spacing={3} alignItems="center">
                    {/* 이미지 생성 버튼 */}
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            maxWidth: 880,
                            height: 44,
                            backgroundColor: "#000",
                            "&:hover": {
                                backgroundColor: "#333",
                            },
                        }}
                        onClick={handleGenerateImage}
                        disabled={loading}
                        startIcon={
                            loading ? (
                                <CircularProgress
                                    size={18}
                                    color="inherit"
                                />
                            ) : null
                        }
                    >
                        {loading ? "이미지 생성 중..." : "이미지 생성하기"}
                    </Button>

                    {/* 에러 메시지 */}
                    {error && (
                        <Typography
                            variant="body2"
                            color="error"
                            sx={{ maxWidth: 600, alignSelf: "stretch" }}
                        >
                            {error}
                        </Typography>
                    )}

                    {/* 이미지 카드 */}
                    <Card
                        sx={{
                            width: "100%",
                            maxWidth: 400,
                            borderRadius: 2,
                            boxShadow: 3,
                            overflow: "hidden",
                            height: 450,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "#f5f5f5",
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={image ? image.imgUrl : noneImg}
                            alt="generated-cover"
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </Card>

                    {/* 이미지 메타 정보 (URL은 안 보여주고 심플하게) */}
                    {image && (
                        <Card
                            sx={{
                                width: "100%",
                                maxWidth: 600,
                                borderRadius: 2,
                                bgcolor: "#fafafa",
                            }}
                        >
                            <CardContent sx={{ py: 1.5 }}>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    이미지 생성 완료 · image_id :{" "}
                                    {image.imageId}
                                </Typography>
                            </CardContent>
                        </Card>
                    )}

                    {/* 이미지 등록 버튼 */}
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            maxWidth: 880,
                            height: 44,
                            backgroundColor: "#000",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#222",
                            },
                            "&.Mui-disabled": {
                                backgroundColor: "#888",
                                color: "#fff",
                            },
                        }}
                        onClick={handleSelectImage}
                        disabled={!image}
                    >
                        이미지 등록
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}

export default AiImagePage;
