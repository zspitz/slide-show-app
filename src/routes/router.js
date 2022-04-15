import PAGES from "../models/pageModel.js";
import {
  HOME_PAGE,
  ABOUT_PAGE,
  CREATE_PIC_PAGE,
  LOGIN_PAGE,
  ERROR_PAGE,
} from "../services/domService.js";

export const onChangePage = (page) => {
  HOME_PAGE.className = "d-none";
  ABOUT_PAGE.className = "d-none";
  CREATE_PIC_PAGE.className = "d-none";
  LOGIN_PAGE.className = "d-none";
  ERROR_PAGE.className = "d-none";

  if (page === PAGES.HOME) return (HOME_PAGE.className = "d-block");
  if (page === PAGES.ABOUT) return (ABOUT_PAGE.className = "d-block");
  if (page === PAGES.CREATE_PIC) return (CREATE_PIC_PAGE.className = "d-block");
  if (page === PAGES.LOGIN) return (LOGIN_PAGE.className = "d-block");

  ERROR_PAGE.className = "d-block";
};
