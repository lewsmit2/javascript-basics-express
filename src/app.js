const express = require('express');
const qs = require('qs');
const {
  sayHello,
  uppercase,
  lowercase,
  firstCharacter,
  firstCharacters,
} = require('./lib/strings');

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

app.get('/strings/first-characters/:string', (req, res) => {
  res.status(200).json({ result: firstCharacter(req.params.string) });
});

// app.get('strings/first-characters/:string', (req, res) => {
//   const { string } = req.params;
//   const query = qs.parse(req.url.split('?')[1]);
//   const { length } = query.length;
//   res.status(200).json({ result: firstCharacters(string, length) });
// });

app.get('strings/first-characters/:string', (req, res) => {
  const n = req.query.length;
  console.log(req);
  res.status(200).json({ result: firstCharacters(req.params.string, n) });
});

module.exports = app;
