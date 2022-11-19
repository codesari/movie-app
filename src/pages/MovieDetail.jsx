import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VideoSection from "../components/VideoSection";

//* bütün API'ler tek bir sayfada cekilmez (performans acisindan)
//? details sayfasi icin details apileri ayrı yazılır backend tarafinda.

const MovieDetail = () => {
  //* browserın adres cubugunda gözüken id yi parametre olarak almak için useParams()..
  const { id } = useParams();
  const [detail, setDetail] = useState("");
  const [video, setVideo] = useState("");
  const { name, key } = video;

  //!destr..
  const {
    title,
    poster_path,
    overview,
    vote_average,
    vote_count,
    release_date,
  } = detail;

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;

  //! SAYFA RENDER EDİLİR EDİLMEZ DATA CEKİLSİN İSTİYORSAM USEEFFECT KULLANMALIYIM..
  useEffect(() => {
    axios
      .get(movieDetailBaseUrl)
      .then((res) => setDetail(res.data))
      .catch((err) => console.log(err));
    axios
      .get(videoUrl)
      .then((res) => setVideo(res.data.results[0]))
      .catch((err) => console.log("err :>> ", err));
  }, [movieDetailBaseUrl, videoUrl]);
  // React Hook useEffect has a missing dependency: 'movieDetailBaseUrl'. Either include it or remove the dependency array

  return (
    <div className="container px-10 mx-auto py-5 ">
      <div>
        <h1 className="text-center text-white text-3xl mb-5">{title}</h1>
      </div>

      <div className="container flex justify-center px-10">
        <div className="flex flex-col lg:flex-row max-w-6xl rounded-lg bg-gray-100 shadow-lg ">
          <img
            className=" lg:w-1/3  lg:h-[600px] object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
            src={poster_path ? baseImageUrl + poster_path : defaultImage}
            alt="poster"
            height="900px"
            width="900px"
          />

          <div className="p-6 flex flex-col justify-between">
            <div>
              <h5 className="text-gray-900 text-xl font-medium mb-2">
                Overview
              </h5>

              <p className="text-gray-700 text-base mb-4">{overview}</p>
              {key && <VideoSection videoName={name} videoKey={key} />}
            </div>
            <ul className="bg-gray-100 rounded-lg border border-gray-400 text-gray-900">
              <li className="px-6 py-2 border-b border-gray-400 w-full rounded-t-lg">
                {"Release Date : " + release_date}
              </li>
              <li className="px-6 py-2 border-b border-gray-400 w-full">
                {"Rate : " + vote_average}
              </li>
              <li className="px-6 py-2 border-b border-gray-400 w-full">
                {"Total Vote : " + vote_count}
              </li>
              <li className="px-6 py-2 border-gray-400 w-full rounded-t-lg">
                <Link
                  to={-1}
                  className="text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4"
                >
                  <div class="flex space-x-2">
                    <button
                      type="button"
                      class="inline-block px-6 py-2.5 bg-red-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Go Back
                    </button>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
