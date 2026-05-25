import { Link } from "react-router-dom";
import styles from "./Movie.module.css";

interface IMovieProps {
  id: number;
  year: number;
  coverImg: string;
  title: string;
  summary: string;
  genres: string[];
}

function Movie({ id, year, coverImg, title, summary, genres }: IMovieProps) {
  return (
    <div className={styles.movie}>
      <Link to={`/movie/${id}`} style={{ display: "block" }}>
        <img src={coverImg} alt={title} className={styles.cover} />
      </Link>
      <div className={styles.info}>
        <h2 className={styles.title}>
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <h3 className={styles.year}>{year}</h3>
        <p className={styles.summary}>
          {summary?.length > 235 ? `${summary.slice(0, 235)}...` : summary}
        </p>
        <ul className={styles.genres}>
          {genres?.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Movie;
