export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkValidity = (value, rules, newPassword) => {
  let isValid = true;
  if (!rules) {
    return true;
  }
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  if (rules.EqualNewPassword) {
    isValid = value === newPassword;
  }
  if (rules.containSpecialChars) {
    var format = /[`!@#$%^&*()_+\-=/\]{};':"\\|,.<>?~]/;
    var formatNums = /[0123456789]/;

    isValid = format.test(value) && isValid;
    isValid = formatNums.test(value) && isValid;
  }
  if (rules.containAtsignandDot) {
    let formatAt = /[@]/;
    let formatDot = /[.]/;
    isValid = formatAt.test(value);
    isValid = formatDot.test(value);
  }
  return isValid;
};