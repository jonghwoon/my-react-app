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

  useEffect(() => {
    const getMovies = async () => {
      const json = await (
        await fetch(
          `https://movies-api.accel.li/api/v2/list_movies.json?minimum_rating=9&sort_by=year`,
        )
      ).json();
      setMovies(json.data.movies);
      setLoading(false);
    };
    getMovies();
  }, []);
  return (
    <div className={styles.container}>
      {loading ? (
        <h1 className={styles.loader}>Loading...</h1>
      ) : (
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
      )}
    </div>
  );
}

export default Home;
