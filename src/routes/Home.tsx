import { useState, useEffect } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

interface IMovie {
  id: number;
  year: number;
  large_cover_image: string;
  title: string;
  summary: string;
  genres: string[];
}

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      const limit = 12; // ページごとに表示する件数
      const url = query
        ? `https://movies-api.accel.li/api/v2/list_movies.json?query_term=${query}&sort_by=year&page=${page}&limit=${limit}`
        : `https://movies-api.accel.li/api/v2/list_movies.json?minimum_rating=9&sort_by=year&page=${page}&limit=${limit}`;
      const json = await (await fetch(url)).json();
      setMovies(json.data.movies || []); // データがない場合の処理
      setMaxPage(Math.ceil((json.data.movie_count || 0) / limit) || 1); // 全てのページ数計算
      setLoading(false);
    };
    getMovies();
  }, [page, query]);

  const onPrevClick = () => setPage((current) => Math.max(1, current - 1));
  const onNextClick = () =>
    setPage((current) => Math.min(maxPage, current + 1));

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(searchTerm);
    setPage(1); // 検索時新しく１ページとして設定
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={onSubmit}
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="タイトルで検索..."
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          検索
        </button>
      </form>
      {loading ? (
        <h1 className={styles.loader}>Loading...</h1>
      ) : movies.length === 0 ? (
        <>
          <h1 className={styles.loader}>検索結果がありません。</h1>
        </>
      ) : (
        <>
          <div className={styles.movies}>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                coverImg={movie.large_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
              />
            ))}
          </div>
          <div className={styles.pagination}>
            <button onClick={onPrevClick} disabled={page === 1}>
              前へ
            </button>
            <span>
              {page} / {maxPage}
            </span>
            <button onClick={onNextClick} disabled={page === maxPage}>
              次へ
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
