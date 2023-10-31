const storage = {
  getFromLocalStorage: (key: string) => {
    const storedData = localStorage.getItem(key);
    let parsedData;

    if (storedData) {
      try {
        parsedData = JSON.parse(storedData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
    return parsedData;
  },
  setInLocalStorage: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeFromLocalStorage: (key: string) => {
    localStorage.removeItem(key);
  }
}

export default storage;
