import PageHeader from "./Common/pageHeader";
import Input from "./Common/input";
import Joi from "joi";
import formikValidateUsingJoi from "../Utils/formikValidateUsingJoi.js";

import {useFormik} from "formik";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {createCard} from "../Services/cardService";

const CreateCard = ({redirect}) => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      bizDescription: "",
      bizName: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
    validate: formikValidateUsingJoi({
      bizName: Joi.string().min(2).max(255).required().label("Name"),
      bizDescription: Joi.string()
        .min(2)
        .max(1024)
        .required()
        .label("Description"),
      bizAddress: Joi.string().min(2).max(400).required().label("Address"),
      bizPhone: Joi.string()
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/)
        .label("Phone"),
      bizImage: Joi.string().min(11).max(1024).allow(""),
    }),

    async onSubmit(values) {
      try {
        const {bizImage, ...body} = values;
        //! in body we have all biz except bizImage because he is not necessary like the rest of the biz. if there is a image add her to the body
        if (bizImage) {
          body.bizImage = bizImage;
        }

        await createCard(body);
        toast("Your business card has been created successfully! 🎴", {
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

  return (
    <>
      <PageHeader
        title={<>Create a new business card</>}
        description="Here you can enter the relevant information and quickly create a business card"
      />
      <div>
        <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
          {error && <div className="alert alert-danger">{error}</div>}

          <Input
            type="text"
            label="Business Name"
            required
            {...form.getFieldProps("bizName")}
            error={form.touched.bizName && form.errors.bizName}
          />

          <Input
            type="text"
            label="Description"
            required
            {...form.getFieldProps("bizDescription")}
            error={form.touched.bizDescription && form.errors.bizDescription}
          />

          <Input
            type="text"
            label="Address"
            required
            {...form.getFieldProps("bizAddress")}
            error={form.touched.bizAddress && form.errors.bizAddress}
          />

          <Input
            type="text"
            label="Phone Number"
            required
            {...form.getFieldProps("bizPhone")}
            error={form.touched.bizPhone && form.errors.bizPhone}
          />

          <Input
            type="text"
            label="Image URL"
            {...form.getFieldProps("bizImage")}
            error={form.touched.bizImage && form.errors.bizImage}
          />

          <div className="my-2">
            <button
              type="text"
              disabled={!form.isValid}
              className="btn btn-primary"
            >
              Create My Card
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCard;
