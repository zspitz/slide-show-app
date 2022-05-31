import { handleDeletePic } from "../app.js";
import renderCards from "../components/renderCards.js";
import renderTable from "../components/renderTable.js";
import DISPLAY from "../models/displayModel.js";
import { onChangeDisplayMode } from "../routes/router.js";
import { CARDS_CONTAINER, TABLE_BODY } from "./domService.js";
import { handleEditPic } from "./picService.js";

// Display Mode
export const handleDisplayMode = (pictures, display) => {
  onChangeDisplayMode(pictures, display);
  if (display === DISPLAY.TABLE) {
    renderTable(pictures);
    pictures.forEach(item => {
      addOnDelete(item._id);
      addOnEditPic(pictures, item._id);
    });
  }
  if (display === DISPLAY.CARDS) {
    renderCards(pictures);
    pictures.forEach(item => {
      addOnLikePic(item._id);
    });
  }
  return display;
};

// הוספת מאזין לעריכת תמונה
export const addOnEditPic = (pictures, id) => {
  const root = document.getElementById(`edit${id}`);
  root.addEventListener("click", () => handleEditPic(pictures, id));
};

// הוספת מאזין למחיקת תמונה
const addOnDelete = id => {
  const root = document.getElementById("delete" + id);
  root.addEventListener("click", () => handleDeletePic(id));
};

/********** liking a picture **********/
const handleLikePic = id => {
  console.log("you liked pic num: " + id);
};

const addOnLikePic = id => {
  const root = document.getElementById(`like${id}`);
  root.addEventListener("click", () => handleLikePic(id));
};
