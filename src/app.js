import {
  HOME_PAGE_LINK,
  ABOUT_PAGE_LINK,
  CREATE_PIC_PAGE_LINK,
  LOGIN_PAGE_LINK,
  LINK_TO_HOME_PAGE,
  SLIDER_IMAGE,
  SLIDER_CREDITS,
  SLIDER_PREV_BTN,
  SLIDER_NEXT_BTN,
} from "./services/domService.js";
import PAGES from "./models/pageModel.js";
import { onChangePage } from "./routes/router.js";
import Picture from "./models/PictureModel.js";

const picObj = { url: "url", alt: "alt", credits: "credits" };

const array = [
  { url: "url", alt: "alt", credits: "credits", _id: 0 },
  { url: "url", alt: "alt", credits: "credits", _id: 1 },
  { url: "url", alt: "alt", credits: "credits", _id: 2 },
  { url: "url", alt: "alt", credits: "credits", _id: 3 },
  { url: "url", alt: "alt", credits: "credits", _id: 4 },
  { url: "url", alt: "alt", credits: "credits", _id: 5 },
  { url: "url", alt: "alt", credits: "credits", _id: 6 },
  { url: "url", alt: "alt", credits: "credits", _id: 7 },
  { url: "url", alt: "alt", credits: "credits", _id: 8 },
];

const pic = new Picture(picObj, array);
console.log(pic);

/********** לוגיקה ***********/
const onSliderChangeImage = term => {
  console.log(term);
};

/********** האזנה לאירועים ***********/
// ניתוב דפים
HOME_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.HOME));
ABOUT_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.ABOUT));
CREATE_PIC_PAGE_LINK.addEventListener("click", () =>
  onChangePage(PAGES.CREATE_PIC)
);
LOGIN_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.LOGIN));
LINK_TO_HOME_PAGE.addEventListener("click", () => onChangePage(PAGES.HOME));

// מצגת תמונות
SLIDER_PREV_BTN.addEventListener("click", () => onSliderChangeImage("prev"));
SLIDER_NEXT_BTN.addEventListener("click", () => onSliderChangeImage("next"));
