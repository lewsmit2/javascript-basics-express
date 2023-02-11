const express = require('express');
const {
  sayHello,
  uppercase,
  lowercase,
  firstCharacter,
  firstCharacters,
} = require('./lib/strings');
const { add, subtract } = require('./lib/numbers');

const app = express();

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
  console.log(req.query);
  res.status(200).json({ result: firstCharacters(req.params.string, req.query.length) });
});

app.get('/numbers/add/:num1/and/:num2', (req, res) => {
  const a = parseInt(req.params.num1);
  const b = parseInt(req.params.num2);
  res.status(200).json({ result: add(a, b) });
});

app.get('/numbers/add/:num1/and/num2', (req, res) => {
  const a = parseInt(req.params.num1);
  const b = parseInt(req.params.num2);
  res.status(200).json({ result: subtract(a - b) });
});

module.exports = app;
