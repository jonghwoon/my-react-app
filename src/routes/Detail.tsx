import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Detail.module.css";

interface IMovieDetail {
  large_cover_image: string;
  medium_cover_image: string;
  title: string;
  rating: number;
  description_full: string;
  genres: string[];
}

function Detail() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<IMovieDetail | null>(null);

  useEffect(() => {
    const getDetail = async () => {
      const json = await (
        await fetch(
          `https://movies-api.accel.li/api/v2/movie_details.json?movie_id=${id}`,
        )
      ).json();
      setDetail(json.data.movie);
      setLoading(false);
    };
    getDetail();
  }, [id]);

  return (
    <div className={styles.container}>
      {loading ? (
        <h1 className={styles.loader}>Loading...</h1>
      ) : (
        detail && (
          <div>
            <button
              className={styles.backBtn}
              onClick={() => globalThis.history.back()}
            >
              &larr; Go Back
            </button>
            <div className={styles.card}>
              <img
                src={detail.large_cover_image || detail.medium_cover_image}
                alt={detail.title}
                className={styles.cover}
              />
              <div className={styles.content}>
                <h2 className={styles.title}>{detail.title}</h2>
                <div className={styles.rating}>
                  <div className={styles.starWrap}>
                    ★★★★★
                    <div
                      className={styles.starFill}
                      style={{ width: `${(detail.rating / 10) * 100}%` }}
                    >
                      ★★★★★
                    </div>
                  </div>
                  <span>{detail.rating} / 10.0</span>
                </div>
                <p className={styles.description}>{detail.description_full}</p>
                <ul className={styles.genres}>
                  {detail.genres?.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Detail;
