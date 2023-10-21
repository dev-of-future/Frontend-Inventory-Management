const utils = {
  getFromLocalStorage: (key: string) => {
    return JSON.parse(localStorage.getItem(key) || '');
  },
  setInLocalStorage: (key: string, value: string) => {
    localStorage.setItem(key, value);
  },
  removeFromLocalStorage: (key: string) => {
    localStorage.removeItem(key);
  }
}

export default utils;
