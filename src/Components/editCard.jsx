//!this components will be similar to "create-card" components with small deferent, she take the new info to the initial value. make edit card and take to back to "my-cards"

import PageHeader from "./Common/pageHeader";
import Input from "./Common/input";
import Joi from "joi";
import formikValidateUsingJoi from "../Utils/formikValidateUsingJoi.js";

import {useFormik} from "formik";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {updateCard} from "../Services/cardService";
import {useCard} from "../Hooks/useCard";

const EditCard = ({redirect}) => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const {id} = useParams();
  const card = useCard(id);

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

        await updateCard(id, body);
        toast("Your card has been successfully updated! 👌", {
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

  useEffect(() => {
    if (!card) {
      return;
    }

    const {bizDescription, bizName, bizAddress, bizPhone, bizImage} = card;

    form.setValues({
      bizDescription,
      bizName,
      bizAddress,
      bizPhone,
      bizImage,
    });
  }, [card]);

  return (
    <>
      <PageHeader
        title={<>Edit card</>}
        description="Here you can edit cards you've already created"
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
              Card update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCard;
