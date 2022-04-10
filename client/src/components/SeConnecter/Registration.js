import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import axios from "axios";

const Registration = ({ setRegister }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const initialValues = {
    nom: "",
    password: "",
    superUtilisateur: "false",
  };

  const validationSchema = Yup.object().shape({
    nom: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(8).max(20).required(),
  });

  const OnSubmit = (data, onSubmitProps) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}user/register`,
      withCredentials: true,
      data: data,
    })
      .then((value) => {
        console.log(value);
        setMessage(value.data.message);
        if (value.data.message === "SUCCESS") {
          setRegister(false);
        }
        // navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
    onSubmitProps.resetForm();
  };
  return (
    <div>
      <div style={{ color: "red" }}>{message}</div>
      <Formik
        initialValues={initialValues}
        onSubmit={OnSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Nom :</label>
          <ErrorMessage name="nom" component="span" />
          <Field
            className="inputCreatePost"
            name="nom"
            // placeholder="(Ex. Title..)"
          />
          <label>Password :</label>
          <ErrorMessage name="password" component="span" />
          <Field
            type="password"
            className="inputCreatePost"
            name="password"
            // placeholder="(Ex. Post..)"
          />
          {/* <Field
            className="inputCreatePost"
            style={{display:"hidden"}}

            name="superUtilisateur"
            // placeholder="(Ex. Post..)"
          /> */}
          <button className="pointer submit" type="submit">
            S'inscrire
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
