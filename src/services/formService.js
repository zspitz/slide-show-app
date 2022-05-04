import Picture from "../models/PictureModel.js";
import {
  URL_CREATE_PIC_FIELD,
  URL_CREATE_PIC_ERROR,
  ALT_CREATE_PIC_FIELD,
  ALT_CREATE_PIC_ERROR,
  CREDIT_CREATE_PIC_FIELD,
  CREDIT_CREATE_PIC_ERROR,
  URL_EDIT_PIC_FIELD,
  URL_EDIT_PIC_ERROR,
  ALT_EDIT_PIC_FIELD,
  ALT_EDIT_PIC_ERROR,
  CREDIT_EDIT_PIC_FIELD,
  CREDIT_EDIT_PIC_ERROR,
  EDIT_IMAGE_DISPLAY,
  PRICE_CREATE_PIC_FIELD,
  PRICE_EDIT_PIC_FIELD,
  PRICE_EDIT_PIC_ERROR,
  PRICE_CREATE_PIC_ERROR,
} from "./domService.js";

let data = { url: "", alt: "", credits: "", price: "" };
let errors = {};
let id;

/********** validate term **********/
export const validateTerm = (field, validation) => {
  let errors = [];
  const {
    regex = null,
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
    if (input.match(/[A-Z]/g) === null)
      errors.push(`This field must have at least one uppercase letter`);
  }
  if (lowerCase) {
    if (input.match(/[a-z]/g) === null)
      errors.push(`This field must have at least one lowercase letter`);
  }
  if (regex) {
    if (input.match(regex) === null)
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
  const { url, alt, credits, price } = data;
  if (!url | !alt | !credits | !price)
    return btn.setAttribute("disabled", "disabled");
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
  PRICE_CREATE_PIC_FIELD.value = "";
  PRICE_CREATE_PIC_ERROR.innerHTML = "";
  btn.setAttribute("disabled", "disabled");
  data = { url: "", alt: "", credits: "", price: "" };
  errors = {};
};

/********** clear all edit pic form fields and errors **********/
export const onClearEditPicFields = btn => {
  URL_EDIT_PIC_FIELD.value = "";
  URL_EDIT_PIC_ERROR.innerHTML = "";
  ALT_EDIT_PIC_FIELD.value = "";
  ALT_EDIT_PIC_ERROR.innerHTML = "";
  CREDIT_EDIT_PIC_FIELD.value = "";
  CREDIT_EDIT_PIC_ERROR.innerHTML = "";
  PRICE_EDIT_PIC_FIELD.value = "";
  PRICE_EDIT_PIC_ERROR.innerHTML = "";
  btn.setAttribute("disabled", "disabled");
  data = { url: "", alt: "", credits: "", price: "" };
  errors = {};
};

/********** create picture **********/
export const onCreateNewPic = array => {
  let newArray = [...array];
  const pic = new Picture({
    url: URL_CREATE_PIC_FIELD.value,
    alt: ALT_CREATE_PIC_FIELD.value,
    credits: CREDIT_CREATE_PIC_FIELD.value,
    price: PRICE_CREATE_PIC_FIELD.value,
  });
  newArray.push(pic);
  return newArray;
};

/********** edit picture **********/
export const onEditPic = array => {
  const pic = array.find(pic => pic._id === id);
  if (!pic) throw new Error("No Picture with the given id...");
  pic.url = URL_EDIT_PIC_FIELD.value;
  pic.alt = ALT_EDIT_PIC_FIELD.value;
  pic.credits = CREDIT_EDIT_PIC_FIELD.value;
  pic.price = PRICE_EDIT_PIC_FIELD.value;
  let picIndex = array.findIndex(pic => pic._id === id);
  array[picIndex] = pic;
  return array;
};

export const mapToModel = (array, _id) => {
  const pic = array.find(pic => pic._id === _id);
  if (!pic) return null;
  const { url, alt, credits, price } = pic;
  URL_EDIT_PIC_FIELD.value = url;
  ALT_EDIT_PIC_FIELD.value = alt;
  CREDIT_EDIT_PIC_FIELD.value = credits;
  PRICE_EDIT_PIC_FIELD.value = price;
  EDIT_IMAGE_DISPLAY.src = url;
  EDIT_IMAGE_DISPLAY.alt = alt;
  data = { url, alt, credits, price };
  id = _id;
};
