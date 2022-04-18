import Picture from "../models/PictureModel.js";
import {
  URL_CREATE_PIC_FIELD,
  URL_CREATE_PIC_ERROR,
  ALT_CREATE_PIC_FIELD,
  ALT_CREATE_PIC_ERROR,
  CREDIT_CREATE_PIC_FIELD,
  CREDIT_CREATE_PIC_ERROR,
} from "./domService.js";

let data = { url: "", alt: "", credit: "" };
let errors = {};

/********** validate term **********/
export const validateTerm = (field, validation) => {
  let errors = [];
  const {
    regex = undefined,
    min = 0,
    max = 1_000_000_000,
    upperCase = null,
    lowerCase = null,
  } = validation;
  const input = field.value;

  if (input.length < +min)
    errors.push(`This field must be at least ${min} characters long`);
  if (input.length > +max)
    errors.push(`This field cannot contain more than ${max} characters`);
  if (upperCase) {
    if (input.match(/[A-Z]/g) == undefined)
      errors.push(`This field must have at least one uppercase letter`);
  }
  if (lowerCase) {
    if (input.match(/[a-z]/g) == undefined)
      errors.push(`This field must have at least one lowercase letter`);
  }
  if (regex) {
    if (input.match(regex) == undefined)
      errors.push(
        `The field must contain the following regulatory expression: ${regex}`
      );
  }
  if (input.match(/[^A-Za-z0-9א-ת\s!@#$%^*&_/:.-]/g))
    errors.push("You used a forbidden sign!");

  errors = errors.length ? errors : null;
  return errors;
};

/********** input validation **********/
export const onValidateField = (input, errorSpan, validation = {}) => {
  data[input.name] = input.value;
  errorSpan.innerHTML = "";
  const errorsFromField = validateTerm(input, validation);
  if (errorsFromField) {
    errorsFromField.map(error => (errorSpan.innerHTML += error + "<br>"));
    errors[input.name] = errorsFromField;
    return;
  }
  delete errors[input.name];
};

/********** handle button disabled **********/
export const onCheckErrors = btn => {
  const { url, alt, credit } = data;
  if (!url | !alt | !credit) return;
  const keys = Object.keys(errors);
  if (keys.length) return btn.setAttribute("disabled", "disabled");
  btn.removeAttribute("disabled");
  return;
};

/********** clear all create pic form fields and errors **********/
export const onClearCreatePicFields = btn => {
  URL_CREATE_PIC_FIELD.value = "";
  URL_CREATE_PIC_ERROR.innerHTML = "";
  ALT_CREATE_PIC_FIELD.value = "";
  ALT_CREATE_PIC_ERROR.innerHTML = "";
  CREDIT_CREATE_PIC_FIELD.value = "";
  CREDIT_CREATE_PIC_ERROR.innerHTML = "";
  btn.setAttribute("disabled", "disabled");
  data = { url: "", alt: "", credit: "" };
  errors = {};
};

/********** create picture **********/
export const onCreateNewPic = array => {
  let newArray = [...array];
  const pic = new Picture({
    url: URL_CREATE_PIC_FIELD.value,
    alt: ALT_CREATE_PIC_FIELD.value,
    credits: CREDIT_CREATE_PIC_FIELD.value,
  });
  newArray.push(pic);
  return newArray;
};
