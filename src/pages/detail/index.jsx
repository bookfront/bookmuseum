import React, { useState } from "react";
import "./detail.css";

function Detail() {
  // 가상 로그인 상태
  const user = { username: "사용자1" }; // 로그인한 사용자 예시

  const book = {
    title: "고양이와 함께한 순간",
    date: "2025-01-01",
    image: "/cat-book.png",
    description: `
"우리는 때때로 너무 빨리 지나가 버리는 순간들을 뒤늦게 사랑하게 된다."
이 책은 일상 속에서 살아가는 사람들이 아주 작고 순한 순간들,
무심코 지나쳤던 감정과 풍경들을 다시 바라보도록 이끄는 이야기다.

저자는 반복되는 하루 속에서도 미묘한 움직임에서 조용히 피어나는 감정을
끌어 올려 글로 남긴다.

새벽의 흐릿한 지하철, 퇴근길 버스 창문에서 느껴지는 사람들의 체온,
오래된 동네 골목의 바람 등 모든 장면이 누군가의 기억 같은 느낌이다.

삶은 종종 거창한 목표보다 작은 순간들의 겹침으로 이루어진다.
사실 우리가 행복을 향해 나아간다고 말하는 것도 대부분 순간들이다.

그 순간들은 아무 일 없이 보이지만, 생각이 쌓여 지금의 나를 만든다.
저자는 그렇게 말한다.
"행복은 거대한 파도가 아니라, 매일 우리 곁을 스치고 지나가는 작은 물결이다."

평범한 일상 속에서 특별함을 만들고 싶은 모든 사람에게 바친다.
`,
  };

  const [comments, setComments] = useState([
    { id: 1, username: "사용자1", text: "이 책 읽어보고 싶었는데 감사합니다@@@ 표지가 엄청 귀엽네요 ㅎㅎㅎㅎㅎ" },
    { id: 2, username: "사용자2", text: "이 책 읽어보고 싶었는데 감사합니다@@@ 표지가 엄청 귀엽네요 ㅎㅎㅎㅎㅎ" },
    { id: 3, username: "사용자3", text: "이 책 읽어보고 싶었는데 감사합니다@@@ 표지가 엄청 귀엽네요 ㅎㅎㅎㅎㅎ" },
  ]);

  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);

  const handleAddComment = () => {
    if (!newComment.trim()) {
      alert("댓글을 입력해주세요!");
      return;
    }

    const newCommentData = {
      id: comments.length + 1,
      username: user.username,
      text: newComment,
    };

    if (editCommentId) {
      // 수정 모드일 경우 댓글 수정
      setComments(comments.map(comment => 
        comment.id === editCommentId ? { ...comment, text: newComment } : comment
      ));
      setEditCommentId(null); // 수정 후, 수정 모드 해제
    } else {
      // 새 댓글 추가
      setComments([...comments, newCommentData]);
    }

    setNewComment("");
  };

  // 댓글 삭제 처리
  const handleDeleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  // 댓글 수정 처리
  const handleEditComment = (id, text) => {
    setEditCommentId(id); // 수정할 댓글의 ID 설정
    setNewComment(text); // 해당 댓글의 내용 입력창에 설정
  };

  return (
    <div className="detail-container">
      <h2 className="detail-title">도서 상세 정보</h2>

      <div className="detail-box">
        {/* 이미지 */}
        <div className="detail-image-wrapper">
          <img src={book.image} alt="book" className="detail-image" />
        </div>

        {/* 내용 */}
        <div className="detail-content">
          <div className="detail-header">
            <h3 className="book-title">{book.title}</h3>

            <div className="book-date-wrapper">
              <img src="/date.png" className="book-date-icon" alt="date" />
              <span className="book-date">{book.date}</span>
            </div>
          </div>

          <pre className="book-description">{book.description}</pre>
        </div>
      </div>

      <div className="comment-section">
        <h3 className="comment-title">댓글</h3>

        <div className="comment-list">
          {comments.map((comment) => (
            <div className="comment-item" key={comment.id}>
              <span className="comment-user">{comment.username}</span>
              <span className="comment-text">{comment.text}</span>

              {/* 로그인한 사용자만 삭제/수정 가능 */}
              {comment.username === user.username && (
                <div className="comment-actions">
                  <button
                    className="comment-edit-btn"
                    onClick={() => handleEditComment(comment.id, comment.text)}
                  >
                    <img src="/edit.png" alt="edit" className="comment-edit-icon" />
                  </button>
                  <button
                    className="comment-delete-btn"
                    onClick={() => handleDeleteComment(comment.id)}
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
          <button className="comment-button" onClick={handleAddComment}>
            {editCommentId ? "수정" : "작성"} {/* 수정모드일 때는 '수정' 버튼 표시 */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
