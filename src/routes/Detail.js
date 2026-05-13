import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Detail() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const getDetail = async () => {
    const json = await (
      await fetch(
        `https://movies-api.accel.li/api/v2/movie_details.json?movie_id=${id}`,
      )
    ).json();
    setDetail(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getDetail();
  }, []);
  console.log(detail);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <button onClick={() => window.history.back()}>Go Back</button>
          <hr />
          <h2>{detail.title}</h2>
          <img src={detail.medium_cover_image} alt={detail.title} />
          <h3>Rating: {detail.rating}</h3>
          <p>{detail.description_full}</p>
          <ul>
            <h3>Genres</h3>
            {detail.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
