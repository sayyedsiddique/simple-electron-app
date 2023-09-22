import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
// import * as Yup from 'yup';

import { Button } from "./common/Button";
import { TextField } from "./common/TextField";
import axios from "axios";

// const validationSchema = Yup.object().shape({
//   description: Yup.string().required('The description is required'),
// });

export const TodoForm = () => {
  // const ipcRenderer = (window as any).ipcRenderer;
  const initialValues = { description: "" };
  const ipcRenderer = window.ipcRenderer;

  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("task ", task);

  const setup = async () => {
    setLoading(true);

    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log("res ", res);
    setTask(res?.data)
    setLoading(false);
  };

  useEffect(() => {
    setup();

    // after submitting form we taking task data from electron main file 
    // and calling setup function again 
    ipcRenderer?.on("task:added", (event, data) => setup());
  }, []);

  const handleSubmit = (values, formikHelpers) => {
    // we send data from frondent side to ipcmain file means main.js of electron
    ipcRenderer?.send("submit:todoForm", values);
    // formikHelpers.resetForm();
    console.log("values ", values);
  };

  return (
    <div>
      {!loading ? (
        <ul>
          {task &&
            task?.map((item) => {
              return <li key={item?.id}>{item?.name}</li>;
            })}
        </ul>
      ) : (
        <div>loading... </div>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        // validationSchema={validationSchema}
      >
        <Form className="shadow border rounded-xl p-4 my-4">
          <div className="my-4">
            <label htmlFor="description" className="font-bold">
              Task description
            </label>
            <Field
              name="description"
              id="description"
              component={TextField}
              placeholder="Enter the description"
              autoFocus={true}
            />
          </div>
          <Button text="Add" />
        </Form>
      </Formik>
    </div>
  );
};
