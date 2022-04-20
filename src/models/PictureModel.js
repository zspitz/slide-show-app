import { randomNumBetween } from "../utils/algoMethods.js";

class Picture {
  #id;
  url;
  alt;
  #createdAt;
  #createdBy;
  likes = [];
  constructor(picture, array = []) {
    const { url, alt, credits } = picture;
    this.url = url;
    this.alt = alt;
    this.#createdBy = credits;
    this.#createdAt = new Date();
    this.generateId(array);
  }
  generateId(array) {
    const random = randomNumBetween(1_000_000, 9_999_999);
    const pic = array.findIndex(pic => pic._id === random);
    if (pic === -1) return (this.#id = random);
    this.generateId(array);
  }
  get _id() {
    return this.#id;
  }
  get createdBy() {
    return this.#createdBy;
  }
  get credits() {
    return this.#createdBy;
  }
  get createdAt() {
    return this.#createdAt;
  }
}

export default Picture;
