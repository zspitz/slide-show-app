import {
  makeFirstLetterCapital,
  generateUniqNumber,
} from "../utils/algoMethods.js";

class User {
  #id;
  #name;
  address = {
    state: "",
    country: "",
    city: "",
    street: "",
    houseNum: 0,
    zip: "",
  };
  phone;
  #email;
  #password;
  #createdAt;
  #isAdmin;
  #isBusiness;

  constructor(user, users = []) {
    const {
      name,
      address,
      phone,
      email,
      password,
      isBusiness,
      isAdmin = false,
    } = user;
    this.#id = generateUniqNumber(users, "_id");
    this.#name = this.setName(name);
    this.address = address;
    this.phone = this.checkPhone(phone);
    this.#email = this.checkEmail(email, users);
    this.#password = this.checkPassword(password);
    this.#createdAt = new Date();
    this.#isAdmin = isAdmin;
    this.#isBusiness = isBusiness;
  }

  generateId(array) {
    const random = randomNumBetween(1_000_000, 9_999_999);
    const pic = array.findIndex(pic => pic._id === random);
    if (pic === -1) return (this.#id = random);
    this.generateId(array);
  }

  setName({ first, last }) {
    const firstName = makeFirstLetterCapital(first);
    const lastName = makeFirstLetterCapital(last);
    return `${firstName} ${lastName}`;
  }

  changeStatus(user) {
    if (!user.isAdmin) return null;
    this.#isBusiness = !this.#isBusiness;
  }

  checkPassword(password) {
    if (
      password.match(
        /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/g
      ) === null
    )
      throw new Error(
        "The password must contain at least one uppercase letter in English. One lowercase letter in English. Four numbers and one of the following special characters !@#$%^&*-"
      );
    return password;
  }

  checkPhone(phoneNumber) {
    if (
      phoneNumber.match(/^0[0-9]{1,2}(\-?|\s?)[0-9]{3}(\-?|\s?)[0-9]{4}/g) ===
      null
    )
      throw new Error("Please enter a standard phone number");
    return phoneNumber;
  }

  checkEmail(email, users = []) {
    if (email.match(/.+@.+\..{2,}/g) === null)
      throw new Error("Please enter a standard email");
    const user = users.findIndex(user => user.email === email);
    if (user !== -1) throw new Error("User is already registered!");
    return email;
  }

  get _id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }

  get password() {
    return this.#password;
  }

  get createdAt() {
    return this.#createdAt;
  }

  get isAdmin() {
    return this.#isAdmin;
  }

  get isBusiness() {
    return this.#isBusiness;
  }
}

export default User;
