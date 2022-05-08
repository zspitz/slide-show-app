import { onSubmitEditPic, onSubmitPic } from "../app.js";
import createPicListeners from "../listeners/createPicListeners.js";
import editPicListeners from "../listeners/editPicListeners.js";
import PAGES from "../models/pageModel.js";
import Picture from "../models/PictureModel.js";
import { onChangePage } from "../routes/router.js";
import {
  URL_CREATE_PIC_FIELD,
  ALT_CREATE_PIC_FIELD,
  CREDIT_CREATE_PIC_FIELD,
  PRICE_CREATE_PIC_FIELD,
  URL_EDIT_PIC_FIELD,
  ALT_EDIT_PIC_FIELD,
  CREDIT_EDIT_PIC_FIELD,
  PRICE_EDIT_PIC_FIELD,
  EDIT_IMAGE_DISPLAY,
  URL_CREATE_PIC_ERROR,
  ALT_CREATE_PIC_ERROR,
  CREDIT_CREATE_PIC_ERROR,
  PRICE_CREATE_PIC_ERROR,
  CANCELֹ_BTN,
  SUBMIT_CREATE_PIC_BTN,
  ALT_EDIT_PIC_ERROR,
  CREDIT_EDIT_PIC_ERROR,
  PRICE_EDIT_PIC_ERROR,
  URL_EDIT_PIC_ERROR,
  SUBMIT_EDIT_PIC_BTN,
  CANCELֹ_EDIT_BTN,
} from "./domService.js";
import useForm from "./formService.js";

/********** create picture **********/

export const handleCreatePic = () => {
  onChangePage(PAGES.CREATE_PIC);
  createPicListeners();
  CANCELֹ_BTN.addEventListener("click", onCancelCreatePic);
  SUBMIT_CREATE_PIC_BTN.addEventListener("click", onSubmitPic);
};

export const onCancelCreatePic = () => {
  const { onClearFormFields } = useForm();
  const fields = [
    URL_CREATE_PIC_FIELD,
    ALT_CREATE_PIC_FIELD,
    CREDIT_CREATE_PIC_FIELD,
    PRICE_CREATE_PIC_FIELD,
  ];

  const errorSpans = [
    URL_CREATE_PIC_ERROR,
    ALT_CREATE_PIC_ERROR,
    CREDIT_CREATE_PIC_ERROR,
    PRICE_CREATE_PIC_ERROR,
  ];
  onClearFormFields(SUBMIT_CREATE_PIC_BTN, fields, errorSpans);
  onChangePage(PAGES.HOME);
};

export const onCreateNewPic = array => {
  let newArray = [...array];
  const pic = new Picture({
    url: URL_CREATE_PIC_FIELD.value,
    alt: ALT_CREATE_PIC_FIELD.value,
    credits: CREDIT_CREATE_PIC_FIELD.value,
    price: PRICE_CREATE_PIC_FIELD.value,
  });
  newArray.push(pic);
  return newArray;
};

export const mapToModel = (array, _id) => {
  const pic = array.find(pic => pic._id === _id);
  if (!pic) return null;
  const { url, alt, credits, price } = pic;
  URL_EDIT_PIC_FIELD.value = url;
  ALT_EDIT_PIC_FIELD.value = alt;
  CREDIT_EDIT_PIC_FIELD.value = credits;
  PRICE_EDIT_PIC_FIELD.value = price;
  EDIT_IMAGE_DISPLAY.src = url;
  EDIT_IMAGE_DISPLAY.alt = alt;
};

/********** edit picture **********/
export const onEditPic = (array, id) => {
  const pic = array.find(pic => pic._id === id);
  if (!pic) throw new Error("No Picture with the given id...");
  pic.url = URL_EDIT_PIC_FIELD.value;
  pic.alt = ALT_EDIT_PIC_FIELD.value;
  pic.credits = CREDIT_EDIT_PIC_FIELD.value;
  pic.price = PRICE_EDIT_PIC_FIELD.value;
  let picIndex = array.findIndex(pic => pic._id === id);
  array[picIndex] = pic;
  return array;
};

export const handleEditPic = (pictures, id) => {
  onChangePage(PAGES.EDIT_PIC);
  mapToModel(pictures, id);
  editPicListeners();
  SUBMIT_EDIT_PIC_BTN.addEventListener("click", () => onSubmitEditPic(id));
  CANCELֹ_EDIT_BTN.addEventListener("click", onCancelEditPic);
};

export const onCancelEditPic = () => {
  const { onClearFormFields } = useForm();
  const errorSpans = [
    ALT_EDIT_PIC_ERROR,
    CREDIT_EDIT_PIC_ERROR,
    PRICE_EDIT_PIC_ERROR,
    URL_EDIT_PIC_ERROR,
  ];
  onClearFormFields(SUBMIT_EDIT_PIC_BTN, [], errorSpans);
  onChangePage(PAGES.HOME);
};
