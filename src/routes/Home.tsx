import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const query = searchParams.get("query") || "";

  const [searchTerm, setSearchTerm] = useState(query);

  const limit = 12; // ページごとに表示する件数

  const { data, isLoading } = useQuery({
    queryKey: ["movies", page, query],
    queryFn: async () => {
      const url = query
        ? `https://movies-api.accel.li/api/v2/list_movies.json?query_term=${query}&sort_by=year&page=${page}&limit=${limit}`
        : `https://movies-api.accel.li/api/v2/list_movies.json?minimum_rating=9&sort_by=year&page=${page}&limit=${limit}`;
      const response = await fetch(url);
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  const movies: IMovie[] = data?.data?.movies || [];
  const maxPage = Math.ceil((data?.data?.movie_count || 0) / limit) || 1;

  const onPrevClick = () => {
    setSearchParams((prev) => {
      prev.set("page", String(Math.max(1, page - 1)));
      return prev;
    });
  };

  const onNextClick = () => {
    setSearchParams((prev) => {
      prev.set("page", String(Math.min(maxPage, page + 1)));
      return prev;
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm) {
      setSearchParams({ query: searchTerm, page: "1" });
    } else {
      setSearchParams({ page: "1" });
    }
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
      {isLoading ? (
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
