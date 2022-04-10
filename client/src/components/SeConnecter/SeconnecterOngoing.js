import React, { useEffect, useState } from "react";
import EditComponent from "../Articles/EditComponent";

const SeconnecterOngoing = () => {
  // const [element, setElement] = useState()
  // useEffect(()=>{
  //     setElement({
  //         content:"un content",
  //         table:"un table",
  //         id:"un id",
  //         path:"un path",
  //         nameInTable:"text",

  //     })
  // },[])
  const element = {
    content: "un content",
    table: "paragraph",
    nomInTable: "text",
    id: 9,
    path: "un path",
    type: "p",
  };

  //   useEffect(() => {
  //     console.log(element, "element");
  //   }, []);
  return (
    <div className="texte_container_seconnecter">
      <p>
        Se connecter est en cours d'intégration vous pourrez vous connecter à
        votre compte bientôt...
      </p>
      {/* <EditComponent element={element} isAuth={true} /> */}
    </div>
  );
};

export default SeconnecterOngoing;
