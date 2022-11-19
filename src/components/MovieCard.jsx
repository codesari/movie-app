import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { toastErrorNotify } from "../helpers/ToastNotify";

const IMG_API = "https://image.tmdb.org/t/p/w1280";
// const defaultImage = "https://picsum.photos/200/300";
const defaultImage =
  "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

const MovieCard = ({ poster_path, title, overview, vote_average, id }) => {
  const { currentUser } = useContext(AuthContext);
  const voteColor = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };
  const navigate = useNavigate();

  return (
    <div
      className="movie"
      onClick={() => {
        !currentUser &&
          toastErrorNotify("Please log in to see movie details..");
        navigate(`/details/${id}`);
      }}
    >
      <div className="img-div">
        <img
          loading="lazy"
          src={poster_path ? IMG_API + poster_path : defaultImage}
          alt="movie-card"
        />
        <div className="movie-over">
          <p>{overview}</p>
        </div>
      </div>

      <div className="flex align-baseline  justify-between p-1 text-white">
        <h5 className="flex items-center ml-2 font-bold">{title}</h5>

        {currentUser && (
          <span className={`tag ${voteColor(vote_average)}`}>
            {vote_average.toFixed(1)}
          </span>
        )}
      </div>
    </div>
  );
};

export default MovieCard;

//* <span className="tag"> index.css de üc tane renk secenegi var
//* reg,green,orange olarak..span'in className'ine dinamik olarak bu renklerieklemek istiyoruz

//? {vote_average.toFixed(1)} gelen number ın virgülden sonra tek hane olmasi icin.
