import { randomNumBetween } from "../utils/algoMethods.js";

class Picture {
  _id;
  url;
  alt;
  credits;
  createdAt;
  constructor(picture, array = []) {
    const { url, alt, credits } = picture;
    this.url = url;
    this.alt = alt;
    this.credits = credits;
    this.createdAt = new Date();
    this.generateId(array);
  }
  generateId(array) {
    const random = randomNumBetween(1_000_000, 9_999_999);
    const pic = array.findIndex(pic => pic._id === random);
    if (pic === -1) return (this._id = random);
    this.generateId(array);
  }
}

export default Picture;
