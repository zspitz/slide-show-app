export function getByQs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getByQsAll(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

export function getById(id) {
  document.getElementById(id);
}

export function setSleep(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  });
}

// setSleep(1000).then(() => {});

export function randomNumBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomNum(num) {
  return Number((Math.random() * num).toFixed());
}

export function sortArrayOfObject(array, key) {
  return [
    ...array.sort((a, b) => {
      if (a[key].toLowerCase() < b[key].toLowerCase()) return -1;
      if (a[key].toLowerCase() > b[key].toLowerCase()) return 1;
      return 0;
    }),
  ];
}

export function sortReverseArrayOfObject(array, key) {
  return [
    ...array.sort((a, b) => {
      if (a[key].toLowerCase() > b[key].toLowerCase()) return -1;
      if (a[key].toLowerCase() < b[key].toLowerCase()) return 1;
      return 0;
    }),
  ];
}
