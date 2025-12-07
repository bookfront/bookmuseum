import React from "react";

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📚 Book Museum</h1>
      <p style={styles.text}>
        리액트가 정상적으로 실행되는지 테스트하는 페이지입니다.
      </p>

      <button style={styles.button} onClick={() => alert("테스트 버튼 클릭!")}>
        테스트 버튼
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "50px",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  text: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
