export default function Header() {
  return (
    <header style={styles.header}>
      {/* 왼쪽 로고 */}
      <div style={styles.logo}>📚</div>

      {/* 오른쪽 버튼 영역 */}
      <div style={styles.right}>
        <button style={styles.userBtn}>사용자</button>
        <button style={styles.logoutBtn}>로그아웃</button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    width: "100%",
    padding: "16px 24px",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    background: "#fff",
    zIndex: 10,
  },
  logo: {
    fontSize: "24px",
    cursor: "pointer",
  },
  right: {
    display: "flex",
    gap: "12px",
  },
  userBtn: {
    border: "1px solid #ddd",
    padding: "6px 12px",
    borderRadius: "4px",
    background: "#fff",
    cursor: "pointer",
  },
  logoutBtn: {
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    background: "#333",
    color: "#fff",
    cursor: "pointer",
  },
};
