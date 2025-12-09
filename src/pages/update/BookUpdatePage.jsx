// src/pages/update/BookUpdatePage.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import noneImg from "../../asserts/noneimg.png";
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Card,
    CardActionArea,
    CardMedia,
} from "@mui/material";

// 🔗 백엔드 서버 주소 (BookCreatePage랑 맞게 사용)
const API_BASE_URL = "http://localhost:8080";

// 날짜를 "YYYY-MM-DD"로 만드는 유틸 함수
function formatDateToYMD(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

// props는 하나의 객체로 받기
function BookUpdatePage({ bookList, setBookList }) {
    const navigate = useNavigate();
    const location = useLocation();

    const fromState = location.state || {};

    // id 이름 통일 (id / book_id / bookId 대응)
    const initialId =
        fromState.bookId ?? fromState.id ?? fromState.book_id ?? 1;

    const [id] = useState(initialId);
    const [title, setTitle] = useState(
        fromState.title || "고양이와 함께한 순간"
    );
    const [author, setAuthor] = useState(fromState.author || "이수린");
    const [description, setDescription] = useState(
        fromState.description || "책 내용!"
    );
    const [coverImage, setCoverImage] = useState(
        fromState.coverImage || noneImg
    );
    const [coverImageId, setCoverImageId] = useState(
        fromState.imageId ?? fromState.coverImageId ?? 1001
    );

    // 등록일은 그대로 유지
    const [regTime] = useState(fromState.reg_time || null);

    const isFormValid =
        title.trim() && author.trim() && description.trim() && coverImage;

    // AiImagePage로 이동 (수정 모드)
    const goToAiImage = () => {
        navigate("/ai-image", {
            state: {
                mode: "edit",
                book: {
                    id,
                    title: title.trim(),
                    author: author.trim(),
                    description: description.trim(),
                },
                currentImageId: coverImageId || null,
            },
        });
    };

    // 도서 수정
    const handleEdit = async (e) => {
        e.preventDefault();

        if (!isFormValid) {
            alert("모든 정보를 입력해야 수정할 수 있어!");
            return;
        }

        // ✅ 백엔드 Book 엔티티에 맞는 payload (PUT /api/books/{bookId})
        // Book: title, author, content, imgUrl (추정)
        const apiPayload = {
            title: title.trim(),
            author: author.trim(),
            content: description.trim(),
            imgUrl: coverImage,
            // updateDate 같은 필드가 엔티티에 있으면 여기에 맞춰 추가
        };

        let apiSuccess = false;
        let updatedFromServer = null;
        const updateDate = formatDateToYMD();

        try {
            const res = await fetch(`${API_BASE_URL}/api/books/${id}`, {
                method: "PUT",               // 🔥 수정이니까 PUT
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",      // 🔥 JWT 쿠키 같이 보내기
                body: JSON.stringify(apiPayload),
            });

            if (res.ok) {
                updatedFromServer = await res.json().catch(() => null);
                apiSuccess = true;
                console.log("도서 수정 API 성공:", updatedFromServer);
            } else {
                console.warn("도서 수정 API HTTP 오류:", res.status);
            }
        } catch (err) {
            console.warn("도서 수정 API 호출 실패(서버 미구동/연결 문제):", err);
        }


        // 📦 프론트에서 쓰는 전체 책 정보 (UI 상태용)
        const updatedBook = {
            id,
            title: updatedFromServer?.title ?? title.trim(),
            author: updatedFromServer?.author ?? author.trim(),
            description: updatedFromServer?.content ?? description.trim(),
            coverImage: updatedFromServer?.imgUrl ?? coverImage,
            coverImageId,
            reg_time: regTime,
            update_time: updateDate,
            owner: fromState.owner,
        };

        // 중앙 bookList에서 이 책만 교체
        if (typeof setBookList === "function") {
            setBookList((prev) =>
                prev.map((b) => (b.id === id ? updatedBook : b))
            );
        } else {
            console.warn("setBookList가 안 넘어왔습니다.");
        }

        if (apiSuccess) {
            alert("수정 완료! (서버에도 반영됨)");
        } else {
            alert(
                "수정이 화면에는 반영되었지만, 서버 저장에 문제가 있을 수 있어요.\n" +
                "백엔드 서버 상태를 한 번 확인해 주세요."
            );
        }

        // MyPage 쪽에서 updatedBook 사용
        navigate("/mypage", {
            state: {
                updatedBook,
            },
        });
    };

    return (
        <Box
            sx={{
                width: "1400px",
                paddingTop: "80px",
                paddingLeft: "270px",
                boxSizing: "border-box",
            }}
        >
            {/* 타이틀 */}
            <Typography
                sx={{
                    fontSize: "30px",
                    fontWeight: 700,
                    marginBottom: "20px",
                }}
            >
                도서 수정
            </Typography>

            <Box component="form" onSubmit={handleEdit}>
                <Grid container columnSpacing={10}>
                    {/* LEFT - 이미지 영역 */}
                    <Grid item>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Card
                                sx={{
                                    width: 500,
                                    height: 550,
                                    borderRadius: 2,
                                    border: "1px dashed #ccc",
                                    boxShadow: "none",
                                    bgcolor: "#fafafa",
                                }}
                            >
                                <CardActionArea
                                    onClick={goToAiImage}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={coverImage || noneImg}
                                        alt="book-cover"
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </CardActionArea>
                            </Card>

                            <Button
                                type="button"
                                variant="outlined"
                                onClick={goToAiImage}
                                sx={{
                                    mt: 2.0,
                                    width: 150,
                                    height: 36,
                                    fontSize: 14,
                                    bgcolor: "#000",
                                    color: "#fff",
                                    ml: "340px",
                                    "&:hover": {
                                        bgcolor: "#222",
                                    },
                                }}
                            >
                                이미지 재생성
                            </Button>
                        </Box>
                    </Grid>

                    {/* RIGHT - 입력 영역 */}
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                maxWidth: 500,
                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                                pt: "20px",
                            }}
                        >
                            {/* 제목 */}
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box sx={{ width: 60, mr: 3 }}>
                                    <Typography
                                        sx={{ fontWeight: 600, fontSize: 14 }}
                                    >
                                        제목
                                    </Typography>
                                </Box>

                                <TextField
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="등록할 제목을 입력해주세요."
                                    sx={{
                                        width: "500px",
                                        "& .MuiInputBase-root": {
                                            height: "42px",
                                        },
                                        "& .MuiInputBase-input": {
                                            padding: "8px",
                                        },
                                    }}
                                />
                            </Box>

                            {/* 저자 */}
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box sx={{ width: 60, mr: 3 }}>
                                    <Typography
                                        sx={{ fontWeight: 600, fontSize: 14 }}
                                    >
                                        저자
                                    </Typography>
                                </Box>

                                <TextField
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    placeholder="등록할 저자를 입력해주세요."
                                    sx={{
                                        width: "500px",
                                        "& .MuiInputBase-root": {
                                            height: "42px",
                                        },
                                        "& .MuiInputBase-input": {
                                            padding: "8px",
                                        },
                                    }}
                                />
                            </Box>

                            {/* 내용 */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                }}
                            >
                                <Box sx={{ width: 60, mr: 3, pt: 1 }}>
                                    <Typography
                                        sx={{ fontWeight: 600, fontSize: 14 }}
                                    >
                                        내용
                                    </Typography>
                                </Box>

                                <TextField
                                    multiline
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="등록할 설명을 입력해주세요."
                                    sx={{
                                        width: "500px",
                                        "& .MuiInputBase-root": {
                                            padding: 0,
                                        },
                                        "& textarea": {
                                            minHeight: "350px",
                                            padding: "10px",
                                        },
                                    }}
                                />
                            </Box>

                            {/* 수정 버튼 */}
                            <Box
                                sx={{
                                    width: "500px",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    mt: 0.5,
                                }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={!isFormValid}
                                    sx={{
                                        width: 90,
                                        height: 40,
                                        fontSize: 14,
                                        bgcolor: isFormValid ? "#222" : "#aaa",
                                        "&:hover": {
                                            bgcolor: isFormValid
                                                ? "#333"
                                                : "#aaa",
                                        },
                                    }}
                                >
                                    수정
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default BookUpdatePage;
