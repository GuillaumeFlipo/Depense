import React, { useEffect } from "react";
import Menu from "../components/commun/Menu";
import DashBoard from "../components/Profile/DashBoard";

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <React.Fragment>
      <Menu />
      <DashBoard />
    </React.Fragment>
  );
};

export default Profile;
