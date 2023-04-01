import classNames from 'classnames';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react'
// import GoogleLogin from 'react-google-login';
import ILogin, { ILoginError } from './types';
//import jwt_decode from 'jwt-decode';
import LoginSchema from './validations';
import axios from 'axios';
import { useActions } from '../../../hooks/useActions';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginPage : React.FC = () => {
  const initialValues: ILogin = {
    login: "",
    password: ""
  };
  const { LoginUser } = useActions();
  const navigate = useNavigate();
  const onHandleSubmit = async (values: ILogin) => {
    console.log(values);
    try{
      await LoginUser(values);
      await Swal.fire({
        icon: "success",
        title: "Nice!",
        text: "Succefully login!",
      });
      await navigate('/');
    }
    catch(errors){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Incorrect login or password!",
      });
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: onHandleSubmit,
  });
  const { errors, touched, handleSubmit, handleChange, setFieldValue } = formik;
  return (
    <div className="row">
    <div className="offset-md-3 col-md-6">
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="login" className="form-label">
              login
            </label>
            <input
              type="login"
              name="login"
              id="login"
              onChange={handleChange}
              className={classNames(
                "form-control",
                { "is-invalid": touched.login && errors.login },
                { "is-valid": touched.login && !errors.login }
              )}
            />
            {touched.login && errors.login && (
              <div className="invalid-feedback">{errors.login}</div>
            )}
          </div>

          

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
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

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </Form>
      </FormikProvider>
    </div>
  </div>
  )
}
export default LoginPage;