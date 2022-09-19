const fullNameValidation = input => {
  const regex = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/i;
  return regex.test(input);
};

const userNameValidation = input => {
  const regex = /^[A-Za-z][A-Za-z0-9_-]{3,14}$/;
  return regex.test(input);
};

const emailValidation = input => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(input);
};

const passwordValidation = input => {
  // length
  // number
  // one lower case
  // one upper case
};

export {
  fullNameValidation,
  userNameValidation,
  emailValidation,
  passwordValidation,
};
