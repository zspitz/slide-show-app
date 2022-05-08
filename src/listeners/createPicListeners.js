import {
  URL_CREATE_PIC_FIELD,
  ALT_CREATE_PIC_FIELD,
  CREDIT_CREATE_PIC_FIELD,
  URL_CREATE_PIC_ERROR,
  ALT_CREATE_PIC_ERROR,
  CREDIT_CREATE_PIC_ERROR,
  PRICE_CREATE_PIC_FIELD,
  PRICE_CREATE_PIC_ERROR,
  SUBMIT_CREATE_PIC_BTN,
} from "../services/domService.js";

import useForm from "../services/formService.js";
const { onChangeInputField } = useForm();

const createPicListeners = () => {
  const schema = ["url", "alt", "credits", "price"];
  URL_CREATE_PIC_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: URL_CREATE_PIC_ERROR,
        validation: {
          min: 10,
          max: 256,
          lowerCase: true,
          regex: /^http[s]?\:\/\/.{1,}.(jpg|png|jpeg)$/g,
        },
      },
      SUBMIT_CREATE_PIC_BTN
    )
  );

  ALT_CREATE_PIC_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: ALT_CREATE_PIC_ERROR,
        validation: { min: 2 },
      },
      SUBMIT_CREATE_PIC_BTN
    )
  );

  CREDIT_CREATE_PIC_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: CREDIT_CREATE_PIC_ERROR,
        validation: { min: 2 },
      },
      SUBMIT_CREATE_PIC_BTN
    )
  );

  PRICE_CREATE_PIC_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: PRICE_CREATE_PIC_ERROR,
        validation: { min: 1 },
      },
      SUBMIT_CREATE_PIC_BTN
    )
  );
};

export default createPicListeners;
