import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./join.css";

function Join() {
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwCheck, setPwCheck] = useState("");
    const [name, setName] = useState("");

    const [idCheckMessage, setIdCheckMessage] = useState("");
    const [pwError, setPwError] = useState("");
    const [inputError, setInputError] = useState("");

    const [isChecked, setIsChecked] = useState(false); // 중복확인 여부

    // 🔥 아이디 중복확인
    const handleIdCheck = async () => {
        if (!id) {
            setIdCheckMessage("아이디를 입력해주세요.");
            return;
        }

        try {
            const res = await fetch(`/api/member/check/${id}`, {
                method: "POST",
            });

            const data = await res.json();

            if (data.status === "중복") {
                setIdCheckMessage("이미 존재하는 아이디입니다.");
                setIsChecked(false);
            } else if (data.status === "사용가능") {
                setIdCheckMessage("사용 가능한 아이디입니다.");
                setIsChecked(true);
            } else {
                setIdCheckMessage(data.message || "확인 중 오류 발생");
                setIsChecked(false);
            }
        } catch (err) {
            console.error(err);
            setIdCheckMessage("서버 연결 오류");
        }
    };

    // 🔥 회원가입 처리
    const handleJoin = async () => {
        setInputError("");
        setPwError("");

        if (!id || !pw || !pwCheck || !name) {
            setInputError("모든 정보를 입력해주세요.");
            return;
        }

        if (!isChecked) {
            setInputError("아이디 중복확인을 해주세요.");
            return;
        }

        if (pw !== pwCheck) {
            setPwError("비밀번호가 일치하지 않습니다.");
            return;
        }

        // ⭐ 백엔드로 보낼 데이터 — pwCheck 절대 포함 X
        const payload = {
            loginId: id,  // ← 백엔드 필드명과 일치
            pass: pw,
            name: name,
        };

        try {
            const res = await fetch("/api/member", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.status === "success") {
                alert("회원가입이 완료되었습니다!");
                navigate("/login");
            } else {
                setInputError(data.message || "회원가입 실패");
            }
        } catch (err) {
            console.error(err);
            setInputError("서버와 연결할 수 없습니다.");
        }
    };

    return (
        <div className="join-container">
            <div className="join-box">

                <h3 className="join-title">아이디</h3>
                <div className="id-check-wrapper">
                    <input
                        className="join-input"
                        type="text"
                        placeholder="아이디를 입력해주세요."
                        value={id}
                        onChange={(e) => {
                            setId(e.target.value);
                            setIsChecked(false);
                            setIdCheckMessage("");
                        }}
                    />
                    <button className="id-check-button" onClick={handleIdCheck}>
                        중복확인
                    </button>
                </div>
                {idCheckMessage && <p className="id-check-message">{idCheckMessage}</p>}

                <h3 className="join-title">비밀번호</h3>
                <input
                    className="join-input"
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                />

                <h3 className="join-title">비밀번호 확인</h3>
                <input
                    className="join-input"
                    type="password"
                    placeholder="비밀번호를 다시 입력해주세요."
                    value={pwCheck}
                    onChange={(e) => setPwCheck(e.target.value)}
                />
                {pwError && <p className="error-message">{pwError}</p>}

                <h3 className="join-title">이름</h3>
                <input
                    className="join-input"
                    type="text"
                    placeholder="이름을 입력해주세요."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {inputError && <p className="error-message">{inputError}</p>}

                <button className="join-button" onClick={handleJoin}>
                    회원가입
                </button>
            </div>
        </div>
    );
}

export default Join;
