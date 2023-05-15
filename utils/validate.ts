import { PhotoFile } from "../context/AddProductContext";

const OnlyLetters: RegExp = /^[a-zA-Z]+$/;
const OnlyNumbers: RegExp = /^[\d\s]+$/;

export const validateNotEmpty = (
  value: string | PhotoFile[],
  setError: any
) => {
  if (value === "" || value.length === 0) {
    setError({ error: true, helperText: "Field cannot be empty" });
    return true;
  } else {
    setError({ error: false, helperText: "" });
    return false;
  }
};

export const validateOnlyLetters = (value: string, setError: any) => {
  if (value === "") {
    setError({ error: true, helperText: "Field cannot be empty" });
    return true;
  } else if (!OnlyLetters.test(value)) {
    setError({ error: true, helperText: "Field cannot contain numbers" });
    return true;
  } else {
    setError({ error: false, helperText: "" });
    return false;
  }
};

export const validateOnlyNumbers = (value: string, setError: any) => {
  if (value === "") {
    setError({ error: true, helperText: "Field cannot be empty" });
    return true;
  } else if (!OnlyNumbers.test(value)) {
    setError({ error: true, helperText: "Field cannot contain letters" });
    return true;
  }
  {
    setError({ error: false, helperText: "" });
    return false;
  }
};
