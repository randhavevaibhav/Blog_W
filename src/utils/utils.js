import { format } from "date-fns";
import { getLocalStorageItem, setLocalStorageItem } from "./browser";
import { localSelectedTheme } from "./constants";
import { enUS } from "date-fns/locale";

export const setTheme = () => {
  const selectedTheme = getLocalStorageItem(localSelectedTheme) || "dark";
  // console.log("selectedTheme ===> ", selectedTheme);

  if (selectedTheme === "dark") {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  }
};

export const toggleTheme = () => {
  const isDark = document.body.classList.contains("dark");
  if (isDark) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    setLocalStorageItem(localSelectedTheme, "light");
  } else {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    setLocalStorageItem(localSelectedTheme, "dark");
  }
};

export const formatNumber = (number) => {
  // Use the toLocaleString method to add suffixes to the number
  if (isNaN(number)) {
    return 0;
  }
  const compactFormatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short", // Use 'short' for 'k', 'm', 'b'
  });

  return compactFormatter.format(number);
};

export const getFileFromFileObj = (fileObj) => {
  if (!fileObj) {
    throw new Error(`No file Obj specified !`);
  }

  let file = null;

  const byteString = atob(fileObj.data.split(",")[1]);
  const mimeString = fileObj.data.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  file = new File([blob], fileObj.name, { type: mimeString });

  return file;
};

export const getYupSchemaFields = ({ schema }) => {
  const getMax = ({ key }) => {
    const isMax = schema.fields[key].tests.find(
      (fn) => fn.OPTIONS.name == "max"
    );
    return isMax ? isMax.OPTIONS.params.max : null;
  };

  const getMin = ({ key }) => {
    const isMin = schema.fields[key].tests.find(
      (fn) => fn.OPTIONS.name == "min"
    );
    return isMin ? isMin.OPTIONS.params.min : null;
  };

  if (typeof schema === "object") {
    const fields = Object.keys(schema.fields).reduce((acc, key) => {
      return {
        ...acc,
        [key]: {
          name: key,
          max: getMax({ key }),
          min: getMin({ key }),
        },
      };
    }, {});

    return fields;
  } else {
    throw new Error(`Please provide valid object.`);
  }
};

export const debounce = ({ cb = () => {}, delay = 1000 }) => {
  let timer = null;

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      cb(...args);
    }, delay);

    return timer;
  };
};

export const getFormattedDateString = ({ createdAt }) => {
  const publishDate = new Date(createdAt);
  const publishDayDate = format(publishDate, "dd", { locale: enUS });

  const publishMonth = format(publishDate, "MMM", { locale: enUS });
  const publishYear = publishDate
    .getFullYear()
    .toString()
    .split("")
    .slice(2)
    .join("");

  const formattedDateStr = `${publishDayDate} ${publishMonth} ${publishYear}`;

  return formattedDateStr;
};
