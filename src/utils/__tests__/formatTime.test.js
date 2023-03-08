import { formatTime } from '../formatTime';

describe('format time', () => {
  // test('current time', () => {
  //   const now = new Date().getTime();
  //   expect(formatTime(now)).toBe('Just now');
  // });

  test('seconds ago', () => {
    const time = new Date().getTime() - 1000;
    expect(formatTime(time)).toBe('1 seconds ago');
  });

  test('10 minutes ago', () => {
    const time = new Date().getTime() - 1000 * 60 * 10;
    expect(formatTime(time)).toBe('10 minutes ago');
  });

  test('yesterday', () => {
    const time = new Date().getTime() - 1000 * 60 * 60 * 24;
    expect(formatTime(time)).toBe('Yesterday');
  });

  test('3 day ago', () => {
    const time = new Date().getTime() - 1000 * 60 * 60 * 24 * 3;
    expect(formatTime(time)).toBe('3 days ago');
  });

  test('last week', () => {
    const time = new Date().getTime() - 1000 * 60 * 60 * 24 * 7;
    expect(formatTime(time)).toBe('Last week');
  });

  test('2 week ago', () => {
    const time = new Date().getTime() - 1000 * 60 * 60 * 24 * 14;
    expect(formatTime(time)).toBe('2 weeks ago');
  });

  test('last month', () => {
    const time = new Date().getTime() - 1000 * 60 * 60 * 24 * 30;
    expect(formatTime(time)).toBe('Last month');
  });

  test('5 months ago', () => {
    const time = new Date().getTime() - 1000 * 60 * 60 * 24 * 155;
    expect(formatTime(time)).toBe('5 months ago');
  });

  test('Last year', () => {
    const time = new Date().getTime() - 1000 * 60 * 60 * 24 * 365;
    expect(formatTime(time)).toBe('Last year');
  });
});
