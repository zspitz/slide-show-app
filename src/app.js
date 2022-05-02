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
  CARDS_ICON,
  TABLE_BODY,
  PRICE_CREATE_PIC_FIELD,
  PRICE_CREATE_PIC_ERROR,
  URL_EDIT_PIC_FIELD,
  ALT_EDIT_PIC_FIELD,
  CREDIT_EDIT_PIC_FIELD,
  PRICE_EDIT_PIC_FIELD,
  SUBMIT_EDIT_PIC_BTN,
  URL_EDIT_PIC_ERROR,
  ALT_EDIT_PIC_ERROR,
  CREDIT_EDIT_PIC_ERROR,
  PRICE_EDIT_PIC_ERROR,
  CANCELֹ_EDIT_BTN,
  EDIT_IMAGE_DISPLAY,
  CARDS_CONTAINER,
  SORT_DOWN_ICON,
  SORT_UP_ICON,
  SEARCH_BAR,
  TABLE_DISPLAY_MODE,
} from "./services/domService.js";
import DISPLAY from "./models/displayModel.js";
import PAGES from "./models/pageModel.js";
import {
  onChangePage,
  onChangeDisplayMode,
  handleNoPictures,
} from "./routes/router.js";
import { setCounter } from "./services/picService.js";
import { renderSlider } from "./components/renderSlider.js";
import initialData from "./initialData/initialData.js";
import {
  onClearCreatePicFields,
  onValidateField,
  onCheckErrors,
  onCreateNewPic,
  mapToModel,
  onClearEditPicFields,
  onEditPic,
} from "./services/formService.js";
import renderTable from "./components/renderTable.js";
import renderCards from "./components/renderCards.js";
import {
  filterArrayOfObjectsByTerm,
  sortArrayOfObject,
  sortReverseArrayOfObject,
} from "./utils/algoMethods.js";

/********** יצירת משתנים גלובלים **********/
let counter = 0;
let pictures = initialData().pictures;
let users = initialData().users;
let display;

console.log(users);

/********** הלוגיקה **********/
// Slider
const handleSliderPicChange = (controller = "") => {
  counter = setCounter(pictures, counter, controller);
  renderSlider(pictures, counter);
};

// Display Mode
const handleDisplayMode = (arrayOfPic, display) => {
  onChangeDisplayMode(arrayOfPic, display);
  if (display === DISPLAY.TABLE) {
    TABLE_BODY.innerHTML = "";
    renderTable(arrayOfPic);
    arrayOfPic.forEach(item => {
      addOnDelete(item._id);
      addOnEditPic(item._id);
    });
    return display;
  }
  if (display === DISPLAY.CARDS) {
    CARDS_CONTAINER.innerHTML = "";
    renderCards(arrayOfPic);
    arrayOfPic.forEach(item => {
      addOnLikePic(item._id);
    });
    return display;
  }
  return display;
};

// Form
const onChangeInputField = (element, btn) => {
  const { input, errorSpan, validation } = element;
  onValidateField(input, errorSpan, validation);
  onCheckErrors(btn);
};

const onCancelCreatePic = btn => {
  onClearCreatePicFields(btn);
  onChangePage(PAGES.HOME);
  renderSlider(pictures);
};

const onSubmitPic = () => {
  pictures = onCreateNewPic(pictures);
  onClearCreatePicFields(SUBMIT_CREATE_PIC_BTN);
  onChangePage(PAGES.HOME);
  display = handleDisplayMode(pictures, DISPLAY.TABLE);
  return;
};

const onCancelEditPic = btn => {
  onClearEditPicFields(btn);
  onChangePage(PAGES.HOME);
  renderSlider(pictures);
};

const onSubmitEditPic = () => {
  pictures = onEditPic(pictures);
  onClearEditPicFields(SUBMIT_EDIT_PIC_BTN);
  onChangePage(PAGES.HOME);
  display = handleDisplayMode(pictures, DISPLAY.TABLE);
};

// Delete Picture
const handleDeletePic = id => {
  pictures = pictures.filter(pic => pic._id !== id);
  display = handleDisplayMode(pictures, DISPLAY.TABLE);
};

// Edit Picture
const handleEditPic = (page, array, id) => {
  onChangePage(page);
  mapToModel(array, id);
};

// filter pictures
const handleFilterPictures = e => {
  const newPictures = filterArrayOfObjectsByTerm(e, [...pictures], "alt");
  if (!newPictures.length) return handleNoPictures();
  if (display === DISPLAY.TABLE)
    return (display = handleDisplayMode(newPictures, DISPLAY.TABLE));
  display = handleDisplayMode(newPictures, DISPLAY.CARDS);
};

// like picture
const handleLikePic = id => {
  console.log("you liked pic num: " + id);
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
SLIDER_PREV_BTN.addEventListener("click", () => handleSliderPicChange("prev"));
SLIDER_NEXT_BTN.addEventListener("click", () => handleSliderPicChange("next"));

// וולידציות על שדות של טפסים
// יצירת תמונה
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

PRICE_CREATE_PIC_FIELD.addEventListener("input", e =>
  onChangeInputField(
    {
      input: e.target,
      errorSpan: PRICE_CREATE_PIC_ERROR,
      validation: { min: 1 },
    },
    SUBMIT_CREATE_PIC_BTN
  )
);

SUBMIT_CREATE_PIC_BTN.addEventListener("click", onSubmitPic);
CANCELֹ_BTN.addEventListener("click", () =>
  onCancelCreatePic(SUBMIT_CREATE_PIC_BTN)
);

const handleUrlEditChange = e => {
  onChangeInputField(
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
    {
      input: e.target,
      errorSpan: PRICE_EDIT_PIC_ERROR,
      validation: { min: 1 },
    },
    SUBMIT_EDIT_PIC_BTN
  )
);

// עריכת תמונה
CANCELֹ_EDIT_BTN.addEventListener("click", () =>
  onCancelEditPic(SUBMIT_EDIT_PIC_BTN)
);
SUBMIT_EDIT_PIC_BTN.addEventListener("click", onSubmitEditPic);

// בקרי תצוגה
TABLE_ICON.addEventListener(
  "click",
  () => (display = handleDisplayMode(pictures, DISPLAY.TABLE))
);
SLIDER_ICON.addEventListener(
  "click",
  () => (display = handleDisplayMode(pictures, DISPLAY.SLIDER))
);
CARDS_ICON.addEventListener(
  "click",
  () => (display = handleDisplayMode(pictures, DISPLAY.CARDS))
);

// הוספת מאזין למחיקת תמונה
const addOnDelete = id => {
  const root = document.getElementById("delete" + id);
  root.addEventListener("click", () => handleDeletePic(id));
};

// הוספת מאזין לעריכת תמונה
const addOnEditPic = id => {
  const root = document.getElementById(`edit${id}`);
  root.addEventListener("click", () =>
    handleEditPic(PAGES.EDIT_PIC, pictures, id)
  );
};

// הוספת מאזין לעריכת תמונה
const addOnLikePic = id => {
  const root = document.getElementById(`like${id}`);
  root.addEventListener("click", () => handleLikePic(id));
};

// מיון תמונות
SORT_DOWN_ICON.addEventListener("click", () => {
  pictures = sortReverseArrayOfObject(pictures, "alt");
  display = handleDisplayMode(pictures, display);
});

SORT_UP_ICON.addEventListener("click", () => {
  pictures = sortArrayOfObject(pictures, "alt");
  display = handleDisplayMode(pictures, display);
});

// שדה חיפוש
SEARCH_BAR.addEventListener("input", e => handleFilterPictures(e.target.value));

/********** אתחול התצוגה הראשונית **********/
onChangePage(PAGES.HOME);
onChangeDisplayMode(pictures, DISPLAY.SLIDER);
handleSliderPicChange();
