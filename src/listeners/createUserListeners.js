import {
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
} from "../services/domService.js";

import useForm from "../services/formService.js";
const { onChangeInputField } = useForm({});

const createUserListeners = () => {
  const schema = [
    "first",
    "last",
    "state",
    "country",
    "city",
    "street",
    "house",
    "zip",
    "email",
    "phone",
    "password",
    "passwordReEnter",
  ];

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
        validation: { min: 6, regex: /.+@.+\..{2,}/g },
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
          min: 9,
          max: 21,
          regex: /^0[0-9]{1,2}(\-?|\s?)[0-9]{3}(\-?|\s?)[0-9]{4}/g,
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
          min: 2,
          regex:
            /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/g,
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
          regex:
            /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/g,
        },
      },
      SUBMIT_BTN_SIGNUP
    )
  );
};

export default createUserListeners;
