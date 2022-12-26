import Input from "./Common/input";
import PageHeader from "./Common/pageHeader";
import Joi from "joi";
import formikValidateUsingJoi from "../Utils/formikValidateUsingJoi.js";

import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../Context/auth.context";
import {toast} from "react-toastify";
import {Navigate} from "react-router-dom";

const SignUp = ({redirect}) => {
  const [error, setError] = useState("");

  const {createUser, user} = useAuth();

  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      name: "",
    },

    validate: formikValidateUsingJoi({
      name: Joi.string().min(2).max(225).required(),
      email: Joi.string()
        .min(6)
        .max(225)
        .required()
        .email({tlds: {allow: false}}),
      password: Joi.string().min(6).max(1024).required(),
    }),

    async onSubmit(values) {
      try {
        await createUser({...values, biz: false});

        toast("You'r account is ready to use! 😎", {
          position: "bottom-left",
        });

        if (redirect) {
          navigate(redirect);
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
          setError(error.response.data);
        }
      }
    },
  });

  if (user) {
    return <Navigate to="/home" />;
  }
  //! this if is mean that if the user is connected than put the next <Navigate/> jsx instead of the Jsx of the page

  return (
    //! fragment go straight under div's father and not create a extra div between tow components App & About/ Home
    <>
      <PageHeader
        title={"Sign up for the APP"}
        description={"Create a new account, it is free!"}
      />
      <div>
        <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
          {error && <div className="alert alert-danger">{error}</div>}

          <Input
            type="email"
            label="Email"
            required
            {...form.getFieldProps("email")}
            error={form.touched.email && form.errors.email}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            required
            {...form.getFieldProps("password")}
            error={form.touched.password && form.errors.password}
          />
          <Input
            type="text"
            label="Name"
            required
            {...form.getFieldProps("name")}
            error={form.touched.name && form.errors.name}
          />

          <div className="my-2">
            <button
              type="submit"
              disabled={!form.isValid}
              className="btn btn-primary"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;

//  <div className="form-group my-1">
//    <label htmlFor="password">Password</label>
//    <input
//      type="password"
//      id="password"
//      name="password"
//      className="form-control is-invalid"
//    />
//    <span className="invalid-feedback">Pleas provide a valid password</span>
//  </div>;

//!This validate has been moved to the utils folder and will now be an independent and dynamic function
// const {error} = schema.validate(values, {abortEarly: false});

// if (!error) {
//   return null;
// }

// const errors = {};
// for (const detail of error.details) {
//   const errorKey = detail.path[0];
//   errors[errorKey] = detail.message;
// }

// return errors;
