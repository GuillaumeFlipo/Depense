import React from "react";

import { useState } from "react";
import RoutesComponent from "./components/RoutesComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions/user.action";
import axios from "axios";
import { UidContext } from "./components/AppContext";

const App = () => {
  const userData = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const [uid, setUid] = useState(null);

  function fetchToken() {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}jwtid`,
      withCredentials: true,
    })
      .then((res) => {
        setUid(res.data.id);
      })
      .catch((err) => console.log("No token"));
  }

  useEffect(() => {
    fetchToken();
    console.log(uid);
    if (uid) dispatch(getUser(uid));
  }, [uid]);
  return (
    <UidContext.Provider value={[uid, setUid]}>
      <RoutesComponent />
    </UidContext.Provider>
  );
};

export default App;

// ------------- tips js ---------------

// Pour ajouter une class sur un click

// let element=document.querySelector('.className');
// element.onclick = function (){
//     element.classList.className('active');
// }
