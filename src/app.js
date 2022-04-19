import {
  HOME_PAGE_LINK,
  ABOUT_PAGE_LINK,
  CREATE_PIC_PAGE_LINK,
  LOGIN_PAGE_LINK,
  LINK_TO_HOME_PAGE,
  LINK_TO_CREATE_PIC_PAGE,
  SLIDER_PREV_BTN,
  SLIDER_NEXT_BTN,
  SUBMIT_CREATE_PIC_BTN,
  CANCELֹ_BTN,
  URL_CREATE_PIC_FIELD,
  ALT_CREATE_PIC_FIELD,
  CREDIT_CREATE_PIC_FIELD,
  URL_CREATE_PIC_ERROR,
  ALT_CREATE_PIC_ERROR,
  CREDIT_CREATE_PIC_ERROR,
  TABLE_ICON,
  SLIDER_ICON,
  TABLE_BODY,
} from "./services/domService.js";
import DISPLAY from "./models/displayModel.js";
import PAGES from "./models/pageModel.js";
import { onChangePage, onChangeDisplayMode } from "./routes/router.js";
import { setCounter } from "./services/picService.js";
import { renderSlider } from "./components/renderSlider.js";
import initialData from "./initialData/initialData.js";
import {
  onClearCreatePicFields,
  onValidateField,
  onCheckErrors,
  onCreateNewPic,
} from "./services/formService.js";
import renderTable from "./components/renderTable.js";

/********** יצירת משתנים גלובלים **********/
let counter = 0;
// let pictures = [];
let pictures = initialData().pictures;

/********** הלוגיקה **********/
// Slider
const onChangeSliderPic = controller => {
  counter = setCounter(pictures, counter, controller);
  renderSlider(pictures, counter);
};

// Form
const onSubmitPic = () => {
  pictures = onCreateNewPic(pictures);
  onClearCreatePicFields(SUBMIT_CREATE_PIC_BTN);
  onChangePage(PAGES.HOME);
  renderSlider(pictures);
};

const onCancelCreatePic = () => {
  onClearCreatePicFields(SUBMIT_CREATE_PIC_BTN);
  onChangePage(PAGES.HOME);
  renderSlider(pictures);
};

const onChangeInputField = (element, btn) => {
  const { input, errorSpan, validation } = element;
  onValidateField(input, errorSpan, validation);
  onCheckErrors(btn);
};

// Display Mode
const handleDisplayMode = (arrayOfPic, display) => {
  onChangeDisplayMode(arrayOfPic, display);
  if (display === DISPLAY.TABLE) {
    TABLE_BODY.innerHTML = "";
    renderTable(arrayOfPic);
  }
};

/********** האזנה לאירועים ***********/
// ניתוב דפים
HOME_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.HOME));
ABOUT_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.ABOUT));
CREATE_PIC_PAGE_LINK.addEventListener("click", () =>
  onChangePage(PAGES.CREATE_PIC)
);
LOGIN_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.LOGIN));

// לינקים לדפים
LINK_TO_CREATE_PIC_PAGE.addEventListener("click", () =>
  onChangePage(PAGES.CREATE_PIC)
);
LINK_TO_HOME_PAGE.addEventListener("click", () => onChangePage(PAGES.HOME));

// מצגת תמונות
SLIDER_PREV_BTN.addEventListener("click", () => onChangeSliderPic("prev"));
SLIDER_NEXT_BTN.addEventListener("click", () => onChangeSliderPic("next"));

// וולידציות על שדות של טפסים

URL_CREATE_PIC_FIELD.addEventListener("input", e =>
  onChangeInputField(
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
    {
      input: e.target,
      errorSpan: CREDIT_CREATE_PIC_ERROR,
      validation: { min: 2 },
    },
    SUBMIT_CREATE_PIC_BTN
  )
);

// יצירת תמונה חדשה
SUBMIT_CREATE_PIC_BTN.addEventListener("click", onSubmitPic);
CANCELֹ_BTN.addEventListener("click", onCancelCreatePic);

// בקרי תצוגה
TABLE_ICON.addEventListener("click", () =>
  handleDisplayMode(pictures, DISPLAY.TABLE)
);
SLIDER_ICON.addEventListener("click", () =>
  handleDisplayMode(pictures, DISPLAY.SLIDER)
);

/********** אתחול התצוגה הראשונית **********/
onChangePage(PAGES.HOME);
onChangeDisplayMode(pictures, DISPLAY.SLIDER);
onChangeSliderPic();
