import {
  ALT_EDIT_PIC_ERROR,
  ALT_EDIT_PIC_FIELD,
  CREDIT_EDIT_PIC_ERROR,
  CREDIT_EDIT_PIC_FIELD,
  EDIT_IMAGE_DISPLAY,
  PRICE_EDIT_PIC_ERROR,
  PRICE_EDIT_PIC_FIELD,
  URL_EDIT_PIC_ERROR,
  URL_EDIT_PIC_FIELD,
  SUBMIT_EDIT_PIC_BTN,
} from "../services/domService.js";

import useForm from "../services/formService.js";
const { onChangeInputField } = useForm({});

const editPicListeners = () => {
  const schema = ["url", "alt", "credits", "price"];
  const handleUrlEditChange = e => {
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: URL_EDIT_PIC_ERROR,
        validation: {
          min: 10,
          max: 256,
          lowerCase: true,
          regex: /^http[s]?\:\/\/.{1,}.(jpg|png|jpeg)$/g,
        },
      },
      SUBMIT_EDIT_PIC_BTN
    );
    EDIT_IMAGE_DISPLAY.src = e.target.value;
  };

  // עריכת תמונה
  URL_EDIT_PIC_FIELD.addEventListener("input", e => handleUrlEditChange(e));

  ALT_EDIT_PIC_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: ALT_EDIT_PIC_ERROR,
        validation: { min: 2 },
      },
      SUBMIT_EDIT_PIC_BTN
    )
  );

  CREDIT_EDIT_PIC_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: CREDIT_EDIT_PIC_ERROR,
        validation: { min: 2 },
      },
      SUBMIT_EDIT_PIC_BTN
    )
  );

  PRICE_EDIT_PIC_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: PRICE_EDIT_PIC_ERROR,
        validation: { min: 1 },
      },
      SUBMIT_EDIT_PIC_BTN
    )
  );
};

export default editPicListeners;
