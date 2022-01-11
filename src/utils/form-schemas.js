import * as yup from "yup";

export const orderSchema = yup.object().shape({
  address: yup
    .string("Please enter address in Maribor")
    .trim()
    .matches(
      /[a-zA-Z\s]+()? [0-9]{1,4}/g,
      "Please input correct address in Maribor"
    )
    .required("Please enter address in Maribor"),
  phoneNumber: yup
    .string("Please enter slovenian phone number, e.g. 030111222")
    .trim()
    .matches(
      /0[3-7][0,1,8][.\- ]?[0-9]{3}[.\- ]?[0-9]{3}/,
      "Please enter valid slovenian phone number, e.g. 030111222"
    )
    .max(9)
    .required("Please enter slovenian phone number"),
  payment: yup
    .string("Please select payment option")
    .required("Please select payment option"),
});

export const searchSchema = yup.object().shape({
  search: yup.string().min(3).required(),
});
