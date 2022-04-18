export const setCounter = (array, counter, controller) => {
  let newCounter;
  if (controller === "next") {
    newCounter = counter < array.length - 1 ? counter + 1 : 0;
    return newCounter;
  }
  newCounter = counter > 0 ? counter - 1 : (counter = array.length - 1);
  return newCounter;
};
