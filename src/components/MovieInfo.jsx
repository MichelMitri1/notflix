import Navbar from "../components/Navbar.jsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../components/MovieInfo.css";
import StarIcon from "@mui/icons-material/Star";
import { auth, db } from "../init.js";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
function MovieInfo() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState("");
  const [rating, setRating] = useState(null);
  const navigate = useNavigate();
  let { id } = useParams();
  const user = auth.currentUser;
  async function rateMovie(ratingValue) {
    if (ratingValue) {
      setRating(ratingValue);
    }
    let codedId;
    const found = docs.find((doc) => doc.uid === user.uid);
    codedId = found.id;

    const ratingRef = doc(db, "ratings", codedId);
    const newRating = {
      ratingValue: ratingValue,
      rating: ratingValue,
    };

    if (ratingValue) {
      await updateDoc(ratingRef, newRating);
    }
  }

  async function deleteReview() {
    let codedId;
    const found = docs.find((doc) => doc.uid === user.uid);
    codedId = found.id;
    const ratingRef = doc(db, "ratings", codedId);
    const newRating = {
      ratingValue: 0,
      rating: 0,
    };
    await updateDoc(ratingRef, newRating);
  }

  async function getAllMovies() {
    setLoading(true);
    const getMoviesData = await fetch("https://api.jikan.moe/v4/anime");
    const getMovies = await getMoviesData.json();
    const movies = getMovies.data;
    setMovies(movies);
    setLoading(false);
  }

  async function getAllRatings() {
    const q = query(collection(db, "ratings"));
    onSnapshot(q, (snapshot) =>
      setDocs(snapshot.docs.map((elem) => ({ ...elem.data(), id: elem.id })))
    );
  }

  useEffect(() => {
    getAllRatings();
    if (!id) {
      return;
    } else {
      getAllMovies();
      getAllRatings();
    }
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="movie__infoContainer">
        <button className="movie__backButton" onClick={() => navigate("/home")}>
          ← Back
        </button>
        {loading ? (
          <div className="loading__wrapper">
            <div className="loading__spinner"></div>
          </div>
        ) : (
          movies
            .filter((movie) => movie?.mal_id === +id)
            .map((movie, index) => (
              <div className="movie__info" key={index}>
                <div className="rating__container"></div>
                <img
                  src={`${movie.images.jpg.image_url}`}
                  alt=""
                  className="movie__img"
                />
                <div className="rating__wrapper">
                  <div className="rating__star--wrapper">
                    {docs ? (
                      docs
                        .filter((doc) => user.uid === doc.uid)
                        .map((doc) =>
                          new Array(5).fill(0).map((_, i) => {
                            const ratingValue = i + 1;
                            return (
                              <label>
                                <input
                                  type="radio"
                                  name="rating"
                                  value={ratingValue}
                                  onClick={() => rateMovie(ratingValue)}
                                />
                                <StarIcon
                                  className="star"
                                  style={{
                                    color: `${
                                      ratingValue <= doc.rating
                                        ? "#e50914"
                                        : "grey"
                                    }`,
                                  }}
                                  fontSize="large"
                                  onClick={() => rateMovie()}
                                />
                              </label>
                            );
                          })
                        )
                    ) : (
                      <>Loading...</>
                    )}
                  </div>
                  <button
                    className="logout__button"
                    onClick={() => deleteReview()}
                  >
                    Remove review
                  </button>
                </div>
                <h1>Title: {movie.title}</h1>
                <h2>Episodes: {movie.episodes}</h2>
                <h2>Score: {movie.score}</h2>
                <h2>Rating: {movie.rating}</h2>
                <h2>Duration: {movie.duration}</h2>
                <h2>Genres: {movie.genres[0].name}</h2>
                <h2>Studios: {movie.studios[0].name}</h2>
                <p className="movie__synopsis">Synopsis: {movie.synopsis}</p>
                {movie.trailer.url ? (
                  <a
                    href={movie.trailer.url}
                    target="_blank"
                    rel="noreferrer"
                    className="movie__trailer"
                  >
                    Trailer: {movie.trailer.url}
                  </a>
                ) : (
                  "No trailer available :("
                )}
              </div>
            ))
        )}
      </div>
    </>
  );
}

export default MovieInfo;
