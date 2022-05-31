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
let pictures;
let users;
let display;

const getData = async () => {
  const data = await initialData();

  users = data.users;
  pictures = data.pictures;

  /********** הלוגיקה **********/
  // Slider
  const handleSliderPicChange = (controller = "") => {
    counter = setCounter(pictures, counter, controller);
    renderSlider(pictures, counter);
  };

  // filter pictures
  const handleFilterPictures = e => {
    const newPictures = filterArrayOfObjectsByTerm(e, [...pictures], "alt");
    if (!newPictures.length) return handleNoPictures();
    if (display === DISPLAY.TABLE)
      return (display = handleDisplayMode(newPictures, DISPLAY.TABLE));
    handleDisplayMode(newPictures, DISPLAY.CARDS);
  };

  /********** האזנה לאירועים ***********/
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
  SLIDER_PREV_BTN.addEventListener("click", () =>
    handleSliderPicChange("prev")
  );
  SLIDER_NEXT_BTN.addEventListener("click", () =>
    handleSliderPicChange("next")
  );

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

  // מיון תמונות
  SORT_DOWN_ICON.addEventListener("click", () => {
    pictures = sortReverseArrayOfObject(pictures, "alt");
    handleDisplayMode(pictures, display);
  });

  SORT_UP_ICON.addEventListener("click", () => {
    pictures = sortArrayOfObject(pictures, "alt");
    handleDisplayMode(pictures, display);
  });

  // שדה חיפוש
  SEARCH_BAR.addEventListener("input", e =>
    handleFilterPictures(e.target.value)
  );

  /********** אתחול התצוגה הראשונית **********/
  onChangePage(PAGES.HOME);
  onChangeDisplayMode(pictures, DISPLAY.SLIDER);
  handleSliderPicChange();
  setNavDisplay();
};

getData();

/********** Creating new picture **********/
export const onSubmitPic = () => {
  pictures = onCreateNewPic(pictures);
  onCancelCreatePic();
  handleDisplayMode(pictures, DISPLAY.TABLE);
};

/********** Edit picture **********/
export const onSubmitEditPic = id => {
  pictures = onEditPic(pictures, id);
  onCancelEditPic();
  handleDisplayMode(pictures, DISPLAY.TABLE);
};

/********** Creating new User **********/
export const onSubmitSignupUser = () => {
  users = onCreateNewUser(users);
  onCancelSignupUser();
  handleDisplayMode(pictures, DISPLAY.SLIDER);
};

/********** Login User **********/
export const handleSubmitLogin = (email, password) => {
  onLogin(email, password, users);
  setNavDisplay();
  handleDisplayMode(pictures, DISPLAY.SLIDER);
};

// Delete Picture
export const handleDeletePic = id => {
  pictures = pictures.filter(pic => pic._id !== id);
  handleDisplayMode(pictures, DISPLAY.TABLE);
};
