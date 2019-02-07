export default [
{
  name: 'Promise.all() vs Promise.race()',
  value: `
const GOOGLE = 'https://www.google.com';
const NEWS = 'https://www.news.google.com';

/* b, c, after */
Promise.all([
  fetch(GOOGLE).then(function b() {}),
  fetch(GOOGLE).then(function c() {}),
]).then(function after() {});

/* b, after, c */
// Promise.race([
//   fetch(GOOGLE).then(function b() {}),
//   fetch(GOOGLE).then(function c() {}),
// ]).then(function after() {});

/* c, after, b */
// Promise.race([
//   fetch(NEWS).then(function b() {}),
//   fetch(GOOGLE).then(function c() {}),
// ]).then(function after() {});
`.trim(),
},
{
  name: 'Promises and Errors',
  value: `
Promise.resolve()
  .then(function a() {
    Promise.resolve().then(function d() {})
    Promise.resolve().then(function e() {})
    throw new Error('OH TEH NOEZ!')
    Promise.resolve().then(function f() {})
  })
  .catch(function b() {})
  .then(function c() {})
`.trim(),
},
{
  name: 'Nested Promise Chain',
  value: `
Promise.resolve()
  .then(function a() {
    Promise.resolve().then(function c() {});
  })
  .then(function b() {
    Promise.resolve().then(function d() {});
  });
`.trim(),
},
{
  name: 'Wrapping setTimeout in Promise',
  value: `
const pause = (millis) =>
  new Promise(resolve => setTimeout(resolve, millis));

const start = Date.now();
console.log('Start');

pause(1000).then(() => {
  const end = Date.now();
  const secs = (end - start) / 1000;
  console.log('End:', secs);
});
`.trim(),
},
];
