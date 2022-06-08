import DISPLAY from "../models/displayModel.js";
import { onChangeDisplayMode } from "../routes/router.js";
import renderTable from "../components/renderTable.js";
import renderCards from "./../components/renderCards.js";
import { handleDeletePic } from "../app.js";
import { handleEditPic } from "./picService.js";

// window.callbacks = {};

export const handleDisplayMode = (display, pictures) => {
  onChangeDisplayMode(display, pictures);
  if (display === DISPLAY.TABLE) {
    renderTable(pictures);
    pictures.forEach(pic => {
      addOnDelete(pic._id);
      addOnEditPic(pictures, pic._id);
    });
  }
  if (display === DISPLAY.CARDS) {
    renderCards(pictures);
  }
};

// הוספת מאזין למחיקת תמונה
const addOnDelete = id => {
  document
    .getElementById("delete" + id)
    .addEventListener("click", () => handleDeletePic(id));
};

// // הוספת מאזין לעריכת תמונה
// export const addOnEditPic = (pictures, id) => {
//   const clickCallback = () => handleEditPic(pictures, id);
//   document.getElementById(`edit${id}`).addEventListener("click", clickCallback);
//   return clickCallback;
// };

// הוספת מאזין לעריכת תמונה
// export const addOnEditPic = (pictures, id) => {
//   const oldElement = document.getElementById(`edit${id}`);
//   const newElement = oldElement.cloneNode();
//   oldElement.parentNode.replaceChild(newElement, oldElement);
//   newElement.addEventListener("click", () => handleEditPic(pictures, id));
// };

// הוספת מאזין לעריכת תמונה
export const addOnEditPic = (pictures, id) => {
  document
    .getElementById(`edit${id}`)
    .addEventListener("click", () => handleEditPic(pictures, id));
};
