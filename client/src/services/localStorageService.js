export const setItemInLocalStorage = (key, value) => {
  return localStorage.setItem(key, value);
};

export const getItemFromLocalStorage = item => {
  const result = localStorage.getItem(item);
  if (!result) return null;
  return result;
};

export const removeItemFromLocalStorage = item => {
  localStorage.removeItem(item);
};
