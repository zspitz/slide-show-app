import { randomNumBetween } from "../utils/algoMethods.js";

class Picture {
  #id;
  url;
  alt;
  #createdBy;
  #price;
  #createdAt;
  likes = [];
  constructor(picture, array = []) {
    const { url, alt, credits, price } = picture;
    this.url = url;
    this.alt = alt;
    this.#createdBy = credits;
    this.#price = price;
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
  get price() {
    return this.#price;
  }
  set price(price) {
    this.#price = price;
  }
  set credits(credits) {
    this.#createdBy = credits;
  }
}

export default Picture;
