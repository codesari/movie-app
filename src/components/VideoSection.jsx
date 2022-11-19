import React from "react";

const VideoSection = ({ videoName, videoKey }) => {
  return (
    <div className="flex justify-center my-6">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoKey}`}
        title={videoName}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default VideoSection;
