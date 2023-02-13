const express = require('express');
const {
  sayHello,
  uppercase,
  lowercase,
  firstCharacter,
  firstCharacters,
} = require('./lib/strings');
const { add, subtract, multiply, divide, remainder } = require('./lib/numbers');
const { negate, truthiness, isOdd, startsWith } = require('./lib/booleans');
const {
  getNthElement,
  arrayToCSVString,
  addToArray2,
  elementsStartingWithAVowel,
  removeNthElement2,
} = require('./lib/arrays');

const app = express();
app.use(express.json());

app.get('/strings/hello/:string', (req, res) => {
  res.status(200).json({ result: sayHello(req.params.string) });
});

app.get('/strings/upper/:string', (req, res) => {
  res.status(200).json({ result: uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  res.status(200).json({ result: lowercase(req.params.string) });
});

app.get('/strings/first-character/:string', (req, res) => {
  res.status(200).json({ result: firstCharacter(req.params.string) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  res.status(200).json({ result: firstCharacters(req.params.string, req.query.length) });
});

app.get('/numbers/add/:num1/and/:num2', (req, res) => {
  const a = parseInt(req.params.num1);
  const b = parseInt(req.params.num2);
  return Number.isNaN(a) || Number.isNaN(b)
    ? res.status(400).json({ error: 'Parameters must be valid numbers.' })
    : res.status(200).json({ result: add(a, b) });
});

app.get('/numbers/subtract/:num1/from/:num2', (req, res) => {
  const a = parseInt(req.params.num2);
  const b = parseInt(req.params.num1);
  return Number.isNaN(a) || Number.isNaN(b)
    ? res.status(400).json({ error: 'Parameters must be valid numbers.' })
    : res.status(200).json({ result: subtract(a, b) });
});

app.post('/numbers/multiply', (req, res) => {
  let { a } = req.body;
  let { b } = req.body;

  if (a === undefined || b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }

  if (typeof a === 'string' || typeof b === 'string') {
    a = parseInt(a, 10);
    b = parseInt(b, 10);
  }

  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }

  res.status(200).json({ result: multiply(a, b) });
});

app.post('/numbers/divide', (req, res) => {
  let { a } = req.body;
  let { b } = req.body;

  if (a === undefined || b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }

  if (b === 0 || b === '0') {
    res.status(400).json({ error: 'Unable to divide by 0.' });
  }

  if (typeof a === 'string' || typeof b === 'string') {
    a = parseInt(a, 10);
    b = parseInt(b, 10);
  }

  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }

  res.status(200).json({ result: divide(a, b) });
});

app.post('/numbers/remainder', (req, res) => {
  let { a } = req.body;
  let { b } = req.body;

  if (a === undefined || b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }

  if (a === 0) {
    res.status(200).json({ result: remainder(a, b) });
  }

  if (b === 0) {
    res.status(400).json({ error: 'Unable to divide by 0.' });
  }

  if (typeof a === 'string' || typeof b === 'string') {
    a = parseFloat(a, 10);
    b = parseFloat(b, 10);
  }
  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  }

  res.status(200).json({ result: remainder(a, b) });
});

app.post('/booleans/negate', (req, res) => {
  const { value } = req.body;
  res.status(200).json({ result: negate(value) });
});

app.post('/booleans/truthiness', (req, res) => {
  const { value } = req.body;
  res.status(200).json({ result: truthiness(value) });
});

app.get('/booleans/is-odd/:number', (req, res) => {
  let { number } = req.params;
  if (typeof number === 'string') {
    number = parseFloat(number, 10);
  }
  if (Number.isNaN(number)) {
    res.status(400).json({ error: 'Parameter must be a number.' });
  }
  res.status(200).json({ result: isOdd(req.params.number) });
});

app.get('/booleans/:string/starts-with/:character', (req, res) => {
  const { string } = req.params;
  const { character } = req.params;

  if (character.length !== 1) {
    res.status(400).json({ error: 'Parameter "character" must be a single character.' });
  }
  res.status(200).json({ result: startsWith(character, string) });
});

app.post('/arrays/element-at-index/:index', (req, res) => {
  const { index } = req.params;
  const { array } = req.body;
  res.status(200).json({ result: getNthElement(index, array) });
});

app.post('/arrays/to-string', (req, res) => {
  const { array } = req.body;
  res.status(200).json({ result: arrayToCSVString(array) });
});

app.post('/arrays/append', (req, res) => {
  res.status(200).json({ result: addToArray2(req.body.value, req.body.array) });
});

app.post('/arrays/starts-with-vowel', (req, res) => {
  res.status(200).json({ result: elementsStartingWithAVowel(req.body.array) });
});

app.post('/arrays/remove-element', (req, res) => {
  const index = parseInt(req.query.index, 0);
  console.log(index);
  const { array } = req.body;
  if (req.query.index) {
    res.status(200).json({ result: removeNthElement2(index, array) });
  } else {
    res.status(200).json({ result: removeNthElement2(0, array) });
  }
});

module.exports = app;
