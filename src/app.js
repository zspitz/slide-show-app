import {
  HOME_PAGE_LINK,
  ABOUT_PAGE_LINK,
  CREATE_PIC_PAGE_LINK,
  SIGNUP_PAGE_LINK,
  LOGIN_PAGE_LINK,
  LINK_TO_HOME_PAGE,
  LINK_TO_CREATE_PIC_PAGE,
  SLIDER_PREV_BTN,
  SLIDER_NEXT_BTN,
  TABLE_ICON,
  SLIDER_ICON,
  CARDS_ICON,
  TABLE_BODY,
  CARDS_CONTAINER,
  SORT_DOWN_ICON,
  SORT_UP_ICON,
  SEARCH_BAR,
  LOGOUT_LINK,
} from "./services/domService.js";
import DISPLAY from "./models/displayModel.js";
import PAGES from "./models/pageModel.js";
import {
  onChangePage,
  onChangeDisplayMode,
  handleNoPictures,
  setNavDisplay,
} from "./routes/router.js";
import { setCounter } from "./services/sliderService.js";
import { renderSlider } from "./components/renderSlider.js";
import initialData from "./initialData/initialData.js";
import renderTable from "./components/renderTable.js";
import renderCards from "./components/renderCards.js";
import {
  filterArrayOfObjectsByTerm,
  sortArrayOfObject,
  sortReverseArrayOfObject,
} from "./utils/algoMethods.js";
import {
  onEditPic,
  onCreateNewPic,
  handleCreatePic,
  onCancelCreatePic,
  onCancelEditPic,
  handleEditPic,
} from "./services/picService.js";
import {
  handleLogin,
  handleSignupUser,
  onCancelSignupUser,
  onCreateNewUser,
  onLogin,
} from "./services/userService.js";
import { removeItemFromLocalStorage } from "./services/localStorageService.js";
import { handleDisplayMode } from "./services/displayModeService.js";

/********** יצירת משתנים גלובלים **********/
let counter = 0;
let pictures = initialData().pictures;
let users = initialData().users;
let display;

/********** הלוגיקה **********/
// Slider
const handleSliderPicChange = (controller = "") => {
  counter = setCounter(pictures, counter, controller);
  renderSlider(pictures, counter);
};

/********** Creating new picture **********/
export const onSubmitPic = () => {
  pictures = onCreateNewPic(pictures);
  onCancelCreatePic();
  display = handleDisplayMode(pictures, DISPLAY.TABLE);
};

/********** Edit picture **********/
export const onSubmitEditPic = id => {
  pictures = onEditPic(pictures, id);
  onCancelEditPic();
  display = handleDisplayMode(pictures, DISPLAY.TABLE);
};

/********** Creating new User **********/
export const onSubmitSignupUser = () => {
  users = onCreateNewUser(users);
  onCancelSignupUser();
  display = handleDisplayMode(pictures, DISPLAY.SLIDER);
};

/********** Login User **********/
export const handleSubmitLogin = (email, password) => {
  onLogin(email, password, users);
  setNavDisplay();
  display = handleDisplayMode(pictures, DISPLAY.SLIDER);
};

// Display Mode
// export const handleDisplayMode = (pictures, display) => {
//   onChangeDisplayMode(pictures, display);
//   if (display === DISPLAY.TABLE) {
//     TABLE_BODY.innerHTML = "";
//     renderTable(pictures);
//     return display;
//   }
//   return display;
// };

// Delete Picture
export const handleDeletePic = id => {
  pictures = pictures.filter(pic => pic._id !== id);
  display = handleDisplayMode(pictures, DISPLAY.TABLE);
};

// filter pictures
const handleFilterPictures = e => {
  const newPictures = filterArrayOfObjectsByTerm(e, [...pictures], "alt");
  if (!newPictures.length) return handleNoPictures();
  if (display === DISPLAY.TABLE)
    return (display = handleDisplayMode(newPictures, DISPLAY.TABLE));
  display = handleDisplayMode(newPictures, DISPLAY.CARDS);
};

// /********** liking a picture **********/
// const handleLikePic = id => {
//   console.log("you liked pic num: " + id);
// };

/********** האזנה לאירועים ***********/
// הוספת מאזין הפיכת התמונה למועדפת
// const addOnLikePic = id => {
//   const root = document.getElementById(`like${id}`);
//   root.addEventListener("click", () => handleLikePic(id));
// };

// // הוספת מאזין לעריכת תמונה
// export const addOnEditPic = (pictures, id) => {
//   const root = document.getElementById(`edit${id}`);
//   root.addEventListener("click", () => handleEditPic(pictures, id));
// };

// ניתוב דפים
HOME_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.HOME));
ABOUT_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.ABOUT));
CREATE_PIC_PAGE_LINK.addEventListener("click", handleCreatePic);
LOGIN_PAGE_LINK.addEventListener("click", handleLogin);
SIGNUP_PAGE_LINK.addEventListener("click", handleSignupUser);
LOGOUT_LINK.addEventListener("click", () => {
  removeItemFromLocalStorage("user");
  setNavDisplay();
});
// לינקים לדפים
LINK_TO_CREATE_PIC_PAGE.addEventListener("click", () =>
  onChangePage(PAGES.CREATE_PIC)
);
LINK_TO_HOME_PAGE.addEventListener("click", () => onChangePage(PAGES.HOME));

// מצגת תמונות
SLIDER_PREV_BTN.addEventListener("click", () => handleSliderPicChange("prev"));
SLIDER_NEXT_BTN.addEventListener("click", () => handleSliderPicChange("next"));

/*********** Signup User Form **********/

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

// // הוספת מאזין למחיקת תמונה
// const addOnDelete = id => {
//   const root = document.getElementById("delete" + id);
//   root.addEventListener("click", () => handleDeletePic(id));
// };

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
setNavDisplay();
