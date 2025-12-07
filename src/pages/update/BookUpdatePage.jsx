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

// ✅ 날짜를 "YYYY-MM-DD"로 만드는 유틸 함수
function formatDateToYMD(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

// ❌ function BookUpdatePage({bookList}, {setBookList})
// 👉 props는 하나의 객체로 받아야 함
function BookUpdatePage({ bookList, setBookList }) {
    const navigate = useNavigate();
    const location = useLocation();

    const fromState = location.state || {};

    // ✅ id 이름 통일 (book_id로 넘어와도 대비)
    const initialId = fromState.id ?? fromState.book_id ?? 1;

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

    // 🔹 등록일은 그대로 유지해야 하니까 state로 들고 있음
    const [regTime] = useState(fromState.reg_time || null);

    const isFormValid =
        title.trim() && author.trim() && description.trim() && coverImage;

    // ✅ AiImagePage로 이동 (수정 모드)
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

    const handleEdit = (e) => {
        e.preventDefault();

        if (!isFormValid) {
            alert("모든 정보를 입력해야 수정할 수 있어!");
            return;
        }

        // 📦 수정된 책 정보
        const payload = {
            id,
            title: title.trim(),
            author: author.trim(),
            description: description.trim(),
            coverImage,
            coverImageId,
            reg_time: regTime,               // ✅ 기존 등록일 유지
            update_time: formatDateToYMD(),  // ✅ 오늘 날짜로 수정일 저장
            owner: fromState.owner,  //로컬유저인식
        };

        // 🔥 중앙 bookList에서 이 책만 교체 (Home / 다른 곳에서 공유)
        if (typeof setBookList === "function") {
            setBookList((prev) =>
                prev.map((b) => (b.id === id ? payload : b))
            );
        } else {
            console.warn("setBookList가 안 넘어왔습니다.");
        }

        alert("수정 완료!");

        // 🔥 MyPage 쪽에서 기존 로직(updatedBook)도 활용하고 싶다면 이름 맞추기
        navigate("/mypage", {
            state: {
                updatedBook: payload, // ✅ MyPage의 updatedBook 과 이름 맞춤
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
