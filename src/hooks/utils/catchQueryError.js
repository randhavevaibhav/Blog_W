export const catchQueryError = (cb = () => {}) => {
  return (...args) => {
    try {
      cb(...args);
    } catch (error) {
      console.error(`Error stack ==> ${error.stack}`);
      console.error(`Error ==> ${error}`);
    }
  };
};
