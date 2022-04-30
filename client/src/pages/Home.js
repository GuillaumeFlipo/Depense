import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "../components/commun/Menu";

import Depense from "../components/home/Depense";

const Home = () => {
  // const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <Menu />
      <Depense />
    </React.Fragment>
  );
};

export default Home;
