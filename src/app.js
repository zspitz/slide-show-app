import {
  HOME_PAGE_LINK,
  ABOUT_PAGE_LINK,
  CREATE_PIC_PAGE_LINK,
  LOGIN_PAGE_LINK,
  HOME_PAGE,
  ABOUT_PAGE,
} from "./services/domService.js";
import PAGES from "./models/pageModel.js";

const onChangePage = (page) => {
  if (page === PAGES.HOME) {
    HOME_PAGE.className = "d-block";
    ABOUT_PAGE.className = "d-none";
  }
  if (page === PAGES.ABOUT) {
    HOME_PAGE.className = "d-none";
    ABOUT_PAGE.className = "d-block";
  }
};

HOME_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.HOME));
ABOUT_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.ABOUT));
CREATE_PIC_PAGE_LINK.addEventListener("click", () =>
  onChangePage(PAGES.CREATE_PIC)
);
LOGIN_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.LOGIN));
