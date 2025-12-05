import BookCard from "../components/BookCard";

export default function MainPage() {
  return (
    <div style={styles.wrapper}>
      <h1>마이페이지</h1>

      {/* 등록한 도서 */}
      <section style={styles.section}>
        <h2 style={styles.title}>등록한 도서</h2>

        <div style={styles.cardList}>
          <BookCard type="owner" />
          <BookCard type="owner" />
          <BookCard type="owner" />
          <BookCard type="owner" />
        </div>
      </section>

      {/* 좋아요 누른 도서 */}
      <section style={styles.section}>
        <h2 style={styles.title}>좋아요 누른 도서</h2>

        <div style={styles.cardList}>
          <BookCard type="like" />
          <BookCard type="like" />
          <BookCard type="like" />
          <BookCard type="like" />
        </div>
      </section>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "40px 72px",
  },
  section: {
    marginBottom: "60px",
  },
  title: {
    marginBottom: "20px",
  },
  cardList: {
    display: "flex",
    gap: "20px",
  },
};
