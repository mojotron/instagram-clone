import {
  fullNameValidation,
  userNameValidation,
  emailValidation,
  passwordValidation,
} from '../inputValidation';

describe('full name validation', () => {
  test('one word name', () => {
    const test = () => fullNameValidation('Neo');
    expect(test).toThrow('input full name, like "John Dow"');
  });
  test('two words name', () => {
    expect(fullNameValidation('Thomas Anderson')).toBeTruthy();
    expect(fullNameValidation('thomas anderson')).toBeTruthy();
    expect(fullNameValidation('THOMAS ANDERSON')).toBeTruthy();
  });
  test('multi words name', () => {
    expect(fullNameValidation('Thomas Anderson Neo')).toBeTruthy();
  });
  test('valid signs', () => {
    expect(fullNameValidation("T'homas Anderson-Neo")).toBeTruthy();
  });
  test('invalid signs', () => {
    const test1 = () => fullNameValidation('Thomas A. Anderson'); // no dot
    const test2 = () => fullNameValidation('Thomas_A_Anderson'); // no underscore
    expect(test1).toThrow('input full name, like "John Dow"');
    expect(test2).toThrow('input full name, like "John Dow"');
  });
});

describe('user name validation', () => {
  test('user name length 4-25 characters', () => {
    const smallUsername = () => userNameValidation('Neo');
    expect(smallUsername).toThrow('minimum 4 characters');
    const largeUsername = () =>
      userNameValidation('NeoNeoNeoNeoNeoNeoHeoNeoNeo');
    expect(largeUsername).toThrow('maximum 25 characters');
    expect(userNameValidation('thomas_anderson')).toBeTruthy();
  });
  test('can contain only alphanumeric and -_ characters', () => {
    expect(userNameValidation('thomas_anderson')).toBeTruthy();
    expect(userNameValidation('_NEO_')).toBeTruthy();
    expect(userNameValidation('-N-E-O-')).toBeTruthy();
    expect(userNameValidation('NE0_-_NEO')).toBeTruthy();
  });
});

describe('email validation', () => {
  test('must contain @', () => {
    const test = () => emailValidation('test.example.com');
    expect(test).toThrow('invalid email');
  });
  test('Top Level domain can not start with dot', () => {
    const test = () => emailValidation('test@.example.com');
    expect(test).toThrow('invalid email');
  });
  test('@ at the beginning', () => {
    const test = () => emailValidation('@test.example.com');
    expect(test).toThrow('invalid email');
  });
  test('Invalid top level domain', () => {
    const test = () => emailValidation('test@.example.c');
    expect(test).toThrow('invalid email');
  });
  test('dot at the beginning', () => {
    const test = () => emailValidation('.test@example.com');
    expect(test).toThrow('invalid email');
  });
  test('allow only alphanumeric characters, underscore and dash', () => {
    const test = () => emailValidation('test+@example.com');
    expect(test).toThrow('invalid email');
  });
  test('double dot is invalid', () => {
    const test = () => emailValidation('te..st@example.com');
    expect(test).toThrow('invalid email');
  });
  test('valid email', () => {
    expect(emailValidation('test@example.com')).toBeTruthy();
    expect(emailValidation('test.test@example.com')).toBeTruthy();
    expect(emailValidation('test-test@example.com')).toBeTruthy();
    expect(emailValidation('test_test@example.com')).toBeTruthy();
    expect(emailValidation('8test9@example.com')).toBeTruthy();
    expect(emailValidation('_8-test-9_@example.com')).toBeTruthy();
  });
});
describe('password validation', () => {
  test('must have at least 1 lowercase letter', () => {
    const test = () => passwordValidation('PASSWORD');
    expect(test).toThrow('a lowercase letter');
  });
  test('must have at least 1 uppercase letter', () => {
    const test = () => passwordValidation('password');
    expect(test).toThrow('a uppercase letter');
  });
  test('must have at least 1 numeric character', () => {
    const test = () => passwordValidation('pAssword');
    expect(test).toThrow('a number');
  });
  test('must at least have 1 special character #?!@$%^&*-', () => {
    const test = () => passwordValidation('pAssw0rd');
    expect(test).toThrow('a special character #?!@$%^&*-');
  });
  test('must at least have length of 8 characters', () => {
    const test = () => passwordValidation('pass!1A');
    expect(test).toThrow('minimum 8 characters');
  });
  test('invalid character', () => {
    const test = () => passwordValidation('päsSw0rd!');
    expect(test).toThrow('invalid character');
  });
  test('valid password', () => {
    expect(passwordValidation('m!n1Mum-')).toBeTruthy();
  });
});
