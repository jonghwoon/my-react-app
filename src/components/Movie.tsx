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
      <img src={coverImg} alt={title} className={styles.movie__img} />
      <div>
        <h2 className={styles.movie__title}>
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <h3 className={styles.movie__year}>{year}</h3>
        <p>{summary?.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p>
        <ul className={styles.movie__genres}>
          {genres?.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Movie;
