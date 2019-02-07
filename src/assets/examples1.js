export default [
{
  name: 'Call Stack',
  value:`
function tenth() { }

function ninth() { tenth() }

function eigth() { ninth() }

function seventh() { eigth() }

function sixth() { seventh() }

function fifth() { sixth() }

function fourth() { fifth() }

function third() { fourth() }

function second() { third() }

function first() { second() }

first();
`.trim(),
},
{
  name: 'Task Queue',
  value: `
setTimeout(function a() {}, 1000);

setTimeout(function b() {}, 500);

setTimeout(function c() {}, 0);

function d() {}

d();
`.trim(),
},
{
  name: 'Microtask Queue',
  value: `
fetch('https://www.google.com')
  .then(function a() {});

Promise.resolve()
  .then(function b() {});

Promise.reject()
  .catch(function c() {});
`.trim(),
},
{
  name: 'Tasks vs Microtasks',
  value: `
setTimeout(function a() {}, 0);

Promise.resolve().then(function b() {});
`.trim(),
},
];
