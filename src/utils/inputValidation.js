const fullNameValidation = input => {
  const regex = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/i;
  const test = regex.test(input);
  if (test) return true;
  else throw new Error('input full name, like "John Dow"');
};

const userNameValidation = input => {
  const regex = /^[A-Za-z0-9_-]{3,24}$/;
  if (input.length < 4) throw new Error('minimum 4 characters');
  if (input.length > 25) throw new Error('maximum 25 characters');
  const test = regex.test(input);
  if (test) return true;
  else throw new Error('invalid input, use letters, numbers, - and _');
};

const emailValidation = input => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const test = regex.test(input);
  if (test) return true;
  else throw new Error('invalid email');
};

const passwordValidation = input => {
  const fullRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/;
  // one upper case letter
  if (!/[A-Z]/.test(input)) throw new Error('a uppercase letter');
  // one lower case
  if (!/[a-z]/.test(input)) throw new Error('a lowercase letter');
  // number
  if (!/[0-9]/.test(input)) throw new Error('a number');
  // special char
  if (!/[#?!@$%^&*-]/.test(input))
    throw new Error('a special character #?!@$%^&*-');
  // length
  if (input.length < 8) throw new Error('minimum 8 characters');
  // final test
  if (fullRegex.test(input)) return true;
  else throw new Error('invalid character');
};

export {
  fullNameValidation,
  userNameValidation,
  emailValidation,
  passwordValidation,
};
