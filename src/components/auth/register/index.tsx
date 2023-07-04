import { Form, FormikProvider, useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { IRegister } from "./types";
import { RegisterSchema } from "./validations";
import classNames from "classnames";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import instance from "../../../api/configurations";
import { Typography } from "antd";

const RegisterPage = (props : any) => {
  const [isBot, setIsbot] = useState<boolean>(false);
  const navigate = useNavigate();
  const initialValues: IRegister = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    image: "",
    password: "",
    confirmPassword: "",
  };

  const onHandleSubmit = async (values: IRegister) => {
    try{
    //   const model = {...values, RecaptchaToken: recaptchaToken};
      instance
      .post("/api/Account/register", values)
      .then((data) => {
        console.log("data", data);
        Swal.fire({
          icon: "success",
          title: "Nice!",
          text: "Happy registration!",
        });
        navigate('/login');
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.log(err);
      });
    }
    catch(error){
      console.error("problem submit", error);
    }
    console.log(values);

  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterSchema,
    onSubmit: onHandleSubmit,
  });
  const { errors, touched, handleSubmit, handleChange, setFieldValue } = formik;

  return (
    <div className="row p-5">
      <div className="offset-md-3 col-md-6">
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
              <Typography>
                Email*
                </Typography>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                className={classNames(
                  "form-control",
                  { "is-invalid": touched.email && errors.email },
                  { "is-valid": touched.email && !errors.email }
                )}
              />
              {touched.email && errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
              <Typography>
                Password*
                </Typography>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                className={classNames(
                  "form-control",
                  { "is-invalid": touched.password && errors.password },
                  { "is-valid": touched.password && !errors.password }
                )}
              />
              {touched.password && errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
              <Typography>
                Confirm Password*
                </Typography>
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={handleChange}
                className={classNames(
                  "form-control",
                  {
                    "is-invalid":
                      touched.confirmPassword && errors.confirmPassword,
                  },
                  {
                    "is-valid":
                      touched.confirmPassword && !errors.confirmPassword,
                  }
                )}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
              <Typography>
                First Name
                </Typography>
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                onChange={handleChange}
                className={classNames(
                  "form-control",
                  { "is-invalid": touched.firstName && errors.firstName },
                  { "is-valid": touched.firstName && !errors.firstName }
                )}
              />
              {touched.firstName && errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
              <Typography>
                Last Name
                </Typography>
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                onChange={handleChange}
                className={classNames(
                  "form-control",
                  { "is-invalid": touched.lastName && errors.lastName },
                  { "is-valid": touched.lastName && !errors.lastName }
                )}
              />
              {touched.lastName && errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
              <Typography>
                Phone
                </Typography>
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                onChange={handleChange}
                className={classNames(
                  "form-control",
                  { "is-invalid": touched.phone && errors.phone },
                  { "is-valid": touched.phone && !errors.phone }
                )}
              />
              {touched.phone && errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};
export default RegisterPage;