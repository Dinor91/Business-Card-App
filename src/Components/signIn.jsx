import Input from "./Common/input";
import PageHeader from "./Common/pageHeader";
import Joi from "joi";
import formikValidateUsingJoi from "../Utils/formikValidateUsingJoi.js";

import {useFormik} from "formik";
import {useState} from "react";
import {useAuth} from "../Context/auth.context";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {Navigate} from "react-router-dom";

const SignIn = ({redirect}) => {
  const [error, setError] = useState("");

  const {login: loginUser, user} = useAuth();

  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },

    validate: formikValidateUsingJoi({
      email: Joi.string()
        .min(6)
        .max(225)
        .required()
        .email({tlds: {allow: false}}),
      password: Joi.string().min(6).max(1024).required(),
    }),

    async onSubmit(values) {
      try {
        await loginUser(values);

        toast("You logged in successfully! 🔓", {
          position: "bottom-left",
        });

        if (redirect) {
          navigate(redirect);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setError(error.response.data);
        }
      }
    },
  });

  if (user) {
    return <Navigate to="/home" />;
  }

  return (
    //! fragment go straight under div's father and not create a extra div between tow components App & About/ Home
    <>
      <PageHeader
        title={"Sign In "}
        description={"Sign in with you'r account! We are waiting for you!"}
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

          <div className="my-2">
            <button
              type="submit"
              disabled={!form.isValid}
              className="btn btn-primary"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;

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
