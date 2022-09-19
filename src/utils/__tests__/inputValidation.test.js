import {
  fullNameValidation,
  userNameValidation,
  emailValidation,
  passwordValidation,
} from '../inputValidation';

describe('full name validation', () => {
  test('one word name', () => {
    expect(fullNameValidation('Neo')).toBeFalsy();
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
    expect(fullNameValidation('Thomas A. Anderson')).toBeFalsy();
    expect(fullNameValidation('Thomas_A_Anderson')).toBeFalsy();
  });
});

describe('user name validation', () => {
  test('user name length 4-15 characters', () => {});
  test('must start with letter', () => {});
  test('can contain only alphanumeric and -_ characters', () => {});
});

describe('email validation', () => {
  test('must contain @', () => {
    expect(emailValidation('test.example.com')).toBeFalsy();
  });
  test('Top Level domain can not start with dot', () => {
    expect(emailValidation('test@.example.com')).toBeFalsy();
  });
  test('@ at the beginning', () => {
    expect(emailValidation('@test.example.com')).toBeFalsy();
  });
  test('Invalid top level domain', () => {
    expect(emailValidation('test@.example.c')).toBeFalsy();
  });
  test('dot at the beginning', () => {
    expect(emailValidation('.test@example.com')).toBeFalsy();
  });
  test('allow only alphanumeric characters, underscore and dash', () => {
    expect(emailValidation('test+@example.com')).toBeFalsy();
  });
  test('double dot is invalid', () => {
    expect(emailValidation('te..st@example.com')).toBeFalsy();
  });
  test('valid emails', () => {
    expect(emailValidation('test@example.com')).toBeTruthy();
    expect(emailValidation('test.test@example.com')).toBeTruthy();
    expect(emailValidation('test-test@example.com')).toBeTruthy();
    expect(emailValidation('test_test@example.com')).toBeTruthy();
    expect(emailValidation('8test9@example.com')).toBeTruthy();
    expect(emailValidation('_8-test-9_@example.com')).toBeTruthy();
  });
});
