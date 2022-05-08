import { onSubmitSignupUser } from "../app.js";
import createUserListeners from "../listeners/createUserListeners.js";
import PAGES from "../models/pageModel.js";
import User from "../models/userModel.js";
import { onChangePage } from "../routes/router.js";
import {
  BIZ_SIGNUP_FIELD,
  CANCEL_BTN_SIGNUP,
  CITY_SIGNUP_ERROR,
  CITY_SIGNUP_FIELD,
  COUNTRY_SIGNUP_ERROR,
  COUNTRY_SIGNUP_FIELD,
  EMAIL_SIGNUP_ERROR,
  EMAIL_SIGNUP_FIELD,
  FIRST_SIGNUP_ERROR,
  FIRST_SIGNUP_FIELD,
  HOUSE_SIGNUP_ERROR,
  HOUSE_SIGNUP_FIELD,
  LAST_SIGNUP_ERROR,
  LAST_SIGNUP_FIELD,
  PASSWORD_RE_ENTER_SIGNUP_ERROR,
  PASSWORD_RE_ENTER_SIGNUP_FIELD,
  PASSWORD_SIGNUP_ERROR,
  PASSWORD_SIGNUP_FIELD,
  PHONE_SIGNUP_ERROR,
  PHONE_SIGNUP_FIELD,
  STATE_SIGNUP_ERROR,
  STATE_SIGNUP_FIELD,
  STREET_SIGNUP_ERROR,
  STREET_SIGNUP_FIELD,
  SUBMIT_BTN_SIGNUP,
  ZIP_SIGNUP_ERROR,
  ZIP_SIGNUP_FIELD,
} from "./domService.js";
import useForm from "./formService.js";

export const handleSignupUser = () => {
  onChangePage(PAGES.SIGN_UP);
  createUserListeners();
  CANCEL_BTN_SIGNUP.addEventListener("click", onCancelSignupUser);
  SUBMIT_BTN_SIGNUP.addEventListener("click", onSubmitSignupUser);
};

export const onCancelSignupUser = () => {
  const { onClearFormFields } = useForm();
  const fields = [
    FIRST_SIGNUP_FIELD,
    LAST_SIGNUP_FIELD,
    STATE_SIGNUP_FIELD,
    COUNTRY_SIGNUP_FIELD,
    CITY_SIGNUP_FIELD,
    STREET_SIGNUP_FIELD,
    HOUSE_SIGNUP_FIELD,
    ZIP_SIGNUP_FIELD,
    PHONE_SIGNUP_FIELD,
    EMAIL_SIGNUP_FIELD,
    PASSWORD_SIGNUP_FIELD,
    PASSWORD_RE_ENTER_SIGNUP_FIELD,
  ];
  const errorSpans = [
    FIRST_SIGNUP_ERROR,
    LAST_SIGNUP_ERROR,
    STATE_SIGNUP_ERROR,
    COUNTRY_SIGNUP_ERROR,
    CITY_SIGNUP_ERROR,
    STREET_SIGNUP_ERROR,
    HOUSE_SIGNUP_ERROR,
    ZIP_SIGNUP_ERROR,
    EMAIL_SIGNUP_ERROR,
    PHONE_SIGNUP_ERROR,
    PASSWORD_SIGNUP_ERROR,
    PASSWORD_RE_ENTER_SIGNUP_ERROR,
  ];
  onClearFormFields(SUBMIT_BTN_SIGNUP, fields, errorSpans);
  BIZ_SIGNUP_FIELD.checked = false;
  onChangePage(PAGES.HOME);
};

/********** create user **********/
export const onCreateNewUser = array => {
  let newArray = [...array];
  const isChecked = BIZ_SIGNUP_FIELD.checked;
  let user = {
    name: {
      first: FIRST_SIGNUP_FIELD.value,
      last: LAST_SIGNUP_FIELD.value,
    },
    address: {
      state: STATE_SIGNUP_FIELD.value,
      country: COUNTRY_SIGNUP_FIELD.value,
      city: CITY_SIGNUP_FIELD.value,
      street: STREET_SIGNUP_FIELD.value,
      houseNum: HOUSE_SIGNUP_FIELD.value,
      zip: ZIP_SIGNUP_FIELD.value,
    },
    phone: PHONE_SIGNUP_FIELD.value,
    email: EMAIL_SIGNUP_FIELD.value,
    password: PASSWORD_SIGNUP_FIELD.value,
    isBusiness: isChecked ? true : false,
  };
  user = new User(user, array);
  newArray.push(user);

  console.log(newArray);

  return newArray;
};
