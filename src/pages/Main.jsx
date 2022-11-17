import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContextProvider";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {
  const [movies, setMovies] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const getMovies = (API) => {
    setSpin(true);
    axios
      .get(API)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err))
      .finally(() => setSpin(false));
  };

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);
  // console.log(movies);
  const [searchWords, setSearchWords] = useState("");
  const [spin, setSpin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchWords && currentUser) {
      getMovies(SEARCH_API + searchWords);
      if (movies.length === 0) {
        alert("Not found.");
        // todo ilk anlamsiz stringde calismiyor ikinci stringde calisiyor
      }
      setSearchWords("");
    } else if (!currentUser) {
      alert("Please log in to search movie..");
    } else {
      alert("Please enter a string..");
    }
  };

  return (
    <>
      <form className="flex justify-center p-2" onSubmit={handleSubmit}>
        <input
          type="search"
          className="w-80 h-8 rounded-md outline-none border p-1 m-2"
          placeholder="Search a movie..."
          onChange={(e) => setSearchWords(e.target.value)}
          value={searchWords}
        />
        <button className="text-white" type="submit">
          Search
        </button>
      </form>

      <div className="flex justify-center flex-wrap">
        {/* loading true ise spinner olussun.false ise cardlar basilsin */}
        {spin ? (
          <div className="flex justify-center items-center">
            <div
              className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          movies.map((movie) => {
            return <MovieCard key={movie.id} {...movie} />;
          })
        )}
      </div>
    </>
  );
};

export default Main;

//  to get video key use
//  https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}.
//  Use https://image.tmdb.org/t/p/w1280${poster_path} for image src.

//! flex-wrap --> küçültünce büyültünce taşmaları aşağıya atar

//?  {...movie} -->  movies array'indeki her bir item'i (movie) açmiş olduk.gönderdigimiz komponentde item'in altindaki verileri direk yazarak kullanabiliriz.

//* inputlari form icine koymanin bir avantaji da enter ile calismasi.tekrardan enter icin fonk yazmamiza gerek kalmiyor
//? input'un type'ına search verilirse inputun en sağında clear özelligi aktif olur
