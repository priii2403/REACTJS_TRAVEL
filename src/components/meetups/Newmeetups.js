import React, { useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./Newmeetups.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Newmeetups(props) {
  const formRef = useRef();
  const editValues = props?.details?.data;
  const isEditMode = props?.edit;
  const initialValues = {
    title: "",
    image: "",
    address: "",
    description: "",
    // date: new Date(),
  };

  const onSubmit = (values, { resetForm }) => {
    if (isEditMode) {
      props.onUpdateMeetup(values);
    } else {
      props.onAddMeetup(values);
    }

    resetForm();
  };

  // useEffect(() => {
  //   if (isEditMode && formRef?.current?.values?.date) {
  //     formRef?.current?.setFieldValue("date", new Date(editValues.date)); // Parse the ISO 8601 string into a Date object
  //   }
  // }, [isEditMode]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    image: Yup.string().url("Invalid URL").required("Image URL is required"),
    address: Yup.string().required("Address is required"),
    description: Yup.string().required("Description is required"),
    // date: Yup.string().required("date is required"),
  });

  return (
    <div className="form">
      <Formik
        initialValues={isEditMode ? editValues : initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize={true}
        innerRef={formRef}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="control">
              <label htmlFor="title" style={{ color: "grey" }}>
                Meetup Title
              </label>
              <Field type="text" id="title" name="title" />

              {errors.title && touched.title && (
                <div className="error-message">{errors.title}</div>
              )}
            </div>
            <div className="control">
              <label htmlFor="image" style={{ color: "grey" }}>
                Meetup Image
              </label>
              <Field type="url" id="image" name="image" />
              {errors.image && touched.image && (
                <div className="error-message">{errors.image}</div>
              )}
            </div>
            <div className="control">
              <label htmlFor="address" style={{ color: "grey" }}>
                Address
              </label>
              <Field type="text" id="address" name="address" />
              {errors.address && touched.address && (
                <div className="error-message">{errors.address}</div>
              )}
            </div>
            {/* {(isEditMode && values.date) || !isEditMode ? (
                <div className="control">
                  <label htmlFor="date" style={{ color: "grey" }}>
                    Date
                  </label>
                  <DatePicker
                    id="date"
                    selected={isEditMode ? new Date(values.date) : values.date}
                    onChange={(date) => setFieldValue("date", date)}
                    // onChange={(date) => console.log("date", date)}
                    dateFormat="MM/dd/yyyy"
                    className="custom-datepicker"
                  />
                  {errors.date && touched.date && (
                    <div className="error-message">{errors.date}</div>
                  )}
                </div>
              ) : null} */}

            <div className="control">
              <label htmlFor="description" style={{ color: "grey" }}>
                Description
              </label>
              <Field
                component="textarea"
                id="description"
                name="description"
                rows="5"
              />
              {errors.description && touched.description && (
                <div className="error-message">{errors.description}</div>
              )}
            </div>

            <div className="actions">
              <button type="submit">
                {isEditMode ? "Update Meetup" : "Add Meetup"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Newmeetups;
