export const catchQueryError = (cb = () => {}) => {
  return (...args) => {
    try {
     const res =  cb(...args);
     return res;
    } catch (error) {
      console.error(`Error stack ==> ${error.stack}`);
      console.error(`Error ==> ${error}`);
    }
  };
};
