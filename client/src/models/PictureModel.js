import { generateUniqNumber } from "../utils/algoMethods.js";

class Picture {
  #id;
  url;
  alt;
  #createdBy;
  #price;
  #createdAt;
  likes = [];

  constructor(picture, pictures = []) {
    const { url, alt, credits, price } = picture;
    this.url = url;
    this.alt = alt;
    this.#createdBy = credits;
    this.#price = price;
    this.#createdAt = new Date();
    this.#id = generateUniqNumber(pictures, "_id");
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
