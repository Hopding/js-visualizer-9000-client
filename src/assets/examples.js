export default [
{
  name: 'Function Calls',
  value:`
function seventeenth() { }
function sixteenth() { seventeenth() }
function fifteenth() { sixteenth() }
function fourteenth() { fifteenth() }
function thirteenth() { fourteenth() }
function twelfth() { thirteenth() }
function eleventh() { twelfth() }
function tenth() { eleventh() }
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
  name: 'Weird Syntax',
  value: `
function funcOne(cb) { cb(); }
function microtaskTwo()
   {
}

const x = function() {}
funcOne(() =>



{




})
const y = ()=>{
  const foo = 'bar'
}

funcOne(function abacus() {
  // throw new Error('OMG')
})

setTimeout(function lulz()


{
  throw new Error('LULZ')
}, 0)

fetch('https://www.google.com')
  .then(function fetchCallback1(res) {
    return res.text()
  })
  .then(function fetchCallback2(text) {
    console.log('TEXT:', text.length)
  })
  .catch(function fetchErrorCallback(err) {
    console.error('Error:', err.message)
  })
`.trim(),
},
{
  name: 'Promises',
  value: `
setTimeout(function myTimeout() {}, 0);

fetch('https://www.google.com')
  .then(function foobar() {
    return Promise.resolve().then(function nestedPromise() {});
  })
  .catch(function quxbaz() {})
  .then(function bingbang() {});
`.trim(),
},
{
  name: 'Promises and Errors',
  value: `
setTimeout(function myTimeout() {}, 0);

fetch('https://www.google.com')
  .then(function foobar() {
    Promise.resolve().then(function nestedPromise1() {
        console.log('nestedPromise1()')
    })
    Promise.resolve().then(function nestedPromise2() {
        console.log('nestedPromise2()')
    })
    throw new Error('Oh teh noes!')
    Promise.resolve().then(function nestedPromise3() {})
  })
  .catch(function quxbaz() {
      console.log('quxbaz()')
  })
  .then(function bingbang() {})
`.trim(),
},
];
