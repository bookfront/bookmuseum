import { useState } from "react";
import emptyHeart from "../assets/heart-empty.png";
import filledHeart from "../assets/heart-filled.png";

export default function BookCard({ type }) {
  // 좋아요 상태
  const [liked, setLiked] = useState(false);

  const toggleLike = () => setLiked(!liked);

  return (
    <div style={styles.card}>
      <div style={styles.thumbnail}></div>

      <div style={styles.titleRow}>
        <p style={styles.title}>책 제목</p>

        {type === "like" && (
          <img
            src={liked ? filledHeart : emptyHeart}
            alt="heart"
            onClick={toggleLike}
            style={styles.likeIcon}
          />
        )}
      </div>

      {type === "owner" && (
        <div>
          <button style={styles.modify}>수정</button>
          <button style={styles.delete}>삭제</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    width: "160px",
    height: "260px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "12px",
  },
  thumbnail: {
    width: "100%",
    height: "160px",
    background: "#f4f4f4",
    borderRadius: "6px",
    marginBottom: "10px",
  },
  title: { fontSize: "14px", margin: "4px 0" },
  modify: {
    border: "none",
    color: "#457BFF",
    background: "transparent",
    marginRight: "8px",
    cursor: "pointer",
  },
  delete: {
    border: "none",
    color: "#F44E3B",
    background: "transparent",
    cursor: "pointer",
  },
  like: {
    fontSize: "20px",
    cursor: "pointer",
    marginTop: "8px",
  },
  titleRow: {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "8px",
  },
  likeIcon: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },
};
