import useForm from "../services/formService.js";
const { onChangeInputField, onClearFormFields } = useForm();
import PAGES from "../models/pageModel.js";
import { onChangePage, setNavDisplay } from "../routes/router.js";
import User from "../models/UserModel.js";

import {
  EMAIL_LOGIN_FIELD,
  EMAIL_LOGIN_ERROR,
  PASSWORD_LOGIN_FIELD,
  PASSWORD_LOGIN_ERROR,
  SUBMIT_LOGIN_BTN,
  CANCEL_LOGIN_BTN,
  LINK_TO_SIGNUP_PAGE,
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
import { handleSubmitSignup } from "../app.js";
import { setItemInLocalStorage } from "./localStorageService.js";

/********** Signup **********/
const createUserListeners = () => {
  const schema = ["first", "last", "email", "password", "passwordReEnter"];

  FIRST_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: FIRST_SIGNUP_ERROR,
        validation: { min: 2 },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  LAST_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: LAST_SIGNUP_ERROR,
        validation: { min: 2 },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  STATE_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: STATE_SIGNUP_ERROR,
        validation: { min: 2 },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  COUNTRY_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: COUNTRY_SIGNUP_ERROR,
        validation: { min: 2 },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  CITY_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: CITY_SIGNUP_ERROR,
        validation: { min: 2 },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  STREET_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: STREET_SIGNUP_ERROR,
        validation: { min: 2 },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  HOUSE_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: HOUSE_SIGNUP_ERROR,
        validation: { min: 1 },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  ZIP_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: ZIP_SIGNUP_ERROR,
        validation: { min: 4 },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  EMAIL_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: EMAIL_SIGNUP_ERROR,
        validation: {
          regex: {
            regex: /.+@.+\..{2,}/g,
            message: "Please enter a valid email",
          },
        },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  PHONE_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: PHONE_SIGNUP_ERROR,
        validation: {
          regex: {
            regex: /^0[0-9]{1,2}(\-?|\s?)[0-9]{3}(\-?|\s?)[0-9]{4}/g,
            message: "Please enter a valid phone number",
          },
        },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  PASSWORD_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: PASSWORD_SIGNUP_ERROR,
        validation: {
          regex: {
            regex:
              /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/g,
            message:
              "The password must include at least six characters uppercase and lowercase letter number and one of the following special characters: !@#$%^&*-",
          },
        },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  PASSWORD_RE_ENTER_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: PASSWORD_RE_ENTER_SIGNUP_ERROR,
        validation: {
          min: 2,
          regex: {
            regex:
              /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/g,
            message:
              "The password must include at least six characters uppercase and lowercase letter number and one of the following special characters: !@#$%^&*-",
          },
        },
      },
      SUBMIT_BTN_SIGNUP
    )
  );
};

export const handleSignup = () => {
  onChangePage(PAGES.SIGN_UP);
  createUserListeners();
  CANCEL_BTN_SIGNUP.addEventListener("click", handleCancelSignup);
  SUBMIT_BTN_SIGNUP.addEventListener("click", handleSubmitSignup);
};

export const handleCancelSignup = () => {
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

export const onSignupNewUser = array => {
  let newArray = [...array];
  const isChecked = BIZ_SIGNUP_FIELD.checked;
  let user = {
    name: {
      first: FIRST_SIGNUP_FIELD.value,
      last: LAST_SIGNUP_FIELD.value,
    },
    address: {
      state: STATE_SIGNUP_FIELD.value ? STATE_SIGNUP_FIELD.value : "",
      country: COUNTRY_SIGNUP_FIELD.value ? COUNTRY_SIGNUP_FIELD.value : "",
      city: CITY_SIGNUP_FIELD.value ? CITY_SIGNUP_FIELD.value : "",
      street: STREET_SIGNUP_FIELD.value ? STREET_SIGNUP_FIELD.value : "",
      houseNumber: HOUSE_SIGNUP_FIELD.value ? HOUSE_SIGNUP_FIELD.value : "",
      zip: ZIP_SIGNUP_FIELD.value ? ZIP_SIGNUP_FIELD.value : "",
    },
    phone: PHONE_SIGNUP_FIELD.value ? PHONE_SIGNUP_FIELD.value : "050-0000000",
    email: EMAIL_SIGNUP_FIELD.value,
    password: PASSWORD_SIGNUP_FIELD.value,
    isBusiness: isChecked ? true : false,
  };
  user = new User(user, array);
  newArray.push(user);

  console.log(newArray);

  return newArray;
};

/********** Login **********/
export const loginListeners = () => {
  const schema = ["login-email", "login-password"];

  EMAIL_LOGIN_FIELD.addEventListener("input", e => {
    const validation = {
      regex: {
        regex: /.+@.+\..{2,}/g,
        message: "Please enter a valid email",
      },
    };

    const element = {
      input: e.target,
      errorSpan: EMAIL_LOGIN_ERROR,
      validation,
    };
    onChangeInputField(schema, element, SUBMIT_LOGIN_BTN);
  });

  PASSWORD_LOGIN_FIELD.addEventListener("input", e => {
    const validation = {
      regex: {
        regex:
          /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/g,
        message:
          "The password must include at least six characters uppercase and lowercase letter number and one of the following special characters: !@#$%^&*-",
      },
    };

    const element = {
      input: e.target,
      errorSpan: PASSWORD_LOGIN_ERROR,
      validation,
    };
    onChangeInputField(schema, element, SUBMIT_LOGIN_BTN);
  });
};

export const handleLogin = users => {
  onChangePage(PAGES.LOGIN);
  loginListeners();
  CANCEL_LOGIN_BTN.addEventListener("click", handleCancelLogin);
  SUBMIT_LOGIN_BTN.addEventListener("click", () => {
    try {
      onLogin(EMAIL_LOGIN_FIELD.value, PASSWORD_LOGIN_FIELD.value, users);
    } catch (error) {
      PASSWORD_LOGIN_ERROR.innerHTML = error.message;
    }
  });
};

export const handleCancelLogin = () => {
  const fields = [EMAIL_LOGIN_FIELD, PASSWORD_LOGIN_FIELD];
  const errorSpans = [EMAIL_LOGIN_ERROR, PASSWORD_LOGIN_ERROR];
  onClearFormFields(SUBMIT_LOGIN_BTN, fields, errorSpans);
  onChangePage(PAGES.HOME);
};

export const onLogin = (email, password, users = []) => {
  if (!users.length) throw new Error("You are not registered please signup!");
  const user = users.find(user => user.email === email);
  if (!user) throw new Error("User mail or password is incorrect!");
  if (user.password !== password)
    throw new Error("User mail or password is incorrect!");

  const { _id, isAdmin, isBusiness } = user;
  const payload = JSON.stringify({ _id, isAdmin, isBusiness });

  setItemInLocalStorage("user", payload);
  handleCancelLogin();
  setNavDisplay();
};
