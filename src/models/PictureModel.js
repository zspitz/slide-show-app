class Picture {
  _id;
  url;
  alt;
  credits;
  createdAt;
  constructor(picutre, array = []) {
    const { url, alt, credits } = picutre;
    this.url = url;
    this.alt = alt;
    this.credits = credits;
    this.createdAt = new Date();
    this.generateId(array);
  }
  generateId(array) {
    const random = randomNum(10);
    console.log(random);
    const pic = array.findIndex(pic => {
      return pic._id === random;
    });
    console.log(pic);
    if (pic === -1) return (this._id = random);
    this.generateId(array);
  }
}

export default Picture;

function randomNum(num) {
  return Number((Math.random() * num).toFixed());
}
