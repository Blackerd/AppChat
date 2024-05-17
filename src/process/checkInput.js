function isEmail(value) {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return !(!value || regex.test(value) === false);
}
function isPassValid(value) {
  return value.length >= 6;
}

export { isEmail, isPassValid };
