import React, { useEffect } from "react";

const Loading = ({ LoadingEnd, setLoadingEnd }) => {
  useEffect(() => {
    setTimeout(() => {
      setLoadingEnd(true);
    }, 2000);
  });
  return (
    <div className="loading">
      <div className="center">
        <div className="ring"></div>
        <span>loading...</span>
      </div>
    </div>
  );
};

export default Loading;
