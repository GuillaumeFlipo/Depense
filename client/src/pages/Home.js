import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../components/commun/Loading";
import Menu from "../components/commun/Menu";

import Depense from "../components/home/Depense";
import { isEmpty } from "../fonction_js/Utils";

const Home = () => {
  // const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const userData = useSelector((state) => state.userReducer);
  const [loadingEnd, setLoadingEnd] = useState(false);

  return (
    <React.Fragment>
      <Menu />
      {!isEmpty(userData) || loadingEnd ? (
        <Depense />
      ) : (
        <React.Fragment>
          <Loading loadingEnd={loadingEnd} setLoadingEnd={setLoadingEnd} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Home;
