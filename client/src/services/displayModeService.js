import DISPLAY from "../models/displayModel.js";
import { onChangeDisplayMode } from "../routes/router.js";
import renderTable from "../components/renderTable.js";
import renderCards from "./../components/renderCards.js";
import { handleDeletePic } from "../app.js";
import { handleEditPic } from "./picService.js";

export const handleDisplayMode = (display, pictures) => {
  onChangeDisplayMode(display, pictures);
  if (display === DISPLAY.TABLE) {
    renderTable(pictures);
    // if (!window.eventsRegistered) {
    pictures.forEach(pic => {
      addOnDelete(pic._id);
      addOnEditPic(pictures, pic._id);
    });
    //   window.eventsRegistered = true;
    // }
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

// הוספת מאזין לעריכת תמונה
export const addOnEditPic = (pictures, id) => {
  document
    .getElementById(`edit${id}`)
    .addEventListener("click", () => handleEditPic(pictures, id, new Date()));
};
