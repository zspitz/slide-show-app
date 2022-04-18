import { SLIDER_IMAGE, SLIDER_CREDITS } from "./domService.js";

/********** הדפסה לדף הגולש **********/
export const render = (pictures, num = 0) => {
  if (!pictures.length) return null;
  SLIDER_IMAGE.src = pictures[num].url;
  SLIDER_IMAGE.alt = pictures[num].alt;
  SLIDER_CREDITS.innerHTML = pictures[num].credits;
  return;
};
