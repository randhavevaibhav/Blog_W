export const getLocalStorageItem = (key) => {
  const item = localStorage.getItem(key);

  if (item != "") {
    return JSON.parse(item);
  }

  return null;
};

export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
