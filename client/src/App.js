import React from "react";

import { useState } from "react";
import RoutesComponent from "./components/RoutesComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions/user.action";
import axios from "axios";
import { UidContext } from "./components/AppContext";
import { getTransactions } from "./actions/transaction.action";
import Cookies from "js-cookie";

const App = () => {
  const userData = useSelector((state) => state.userReducer);
  const [sucessRequest, setSucessRequest] = useState(false);
  const [fetchBool, setFetchBool] = useState(false);

  const dispatch = useDispatch();
  const [uid, setUid] = useState(null);

  async function fetchToken() {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}jwtid`,
      withCredentials: true,
    })
      .then((res) => {
        setUid(res.data.id);
        setSucessRequest(true);
      })
      .catch((err) => {
        console.log(err);
      });

    setFetchBool(true);
  }

  useEffect(() => {
    fetchToken();
    console.log(uid);
    if (uid) {
      dispatch(getUser(uid));
      dispatch(getTransactions(uid));
    }
  }, [uid]);

  // useEffect(() => {
  //   console.log(sucessRequest, "sucessRequest");
  //   console.log(fetchBool, "fetchBool");
  // }, [fetchBool, sucessRequest]);

  useEffect(() => {
    if (fetchBool && !sucessRequest && Cookies.get("refresh") != "true") {
      Cookies.set("refresh", "true", { expires: 1 });
      window.location = "/";
    }
  }, [fetchBool]);
  return (
    <UidContext.Provider value={[uid, setUid]}>
      <RoutesComponent />
      <div>
        <p></p>
      </div>
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
