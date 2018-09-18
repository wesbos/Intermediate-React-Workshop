const express = require('express');
const cors = require('cors');
const db = require('diskdb');
const bodyParser = require('body-parser');

db.connect('./db', ['notes']);

const app = express();

app.use(cors());
app.use(bodyParser.json());

// CREATE
app.post('/notes', async (req, res) => {
  db.notes.save(req.body.note);
  res.json(req.body.note);
});

// READ
app.get('/notes', async (req, res) => {
  const notes = db.notes.find();
  res.json(notes);
});

// READ Single Note
app.get('/notes/:id', async (req, res) => {
  console.log('finding single note');
  const note = db.notes.findOne({ _id: req.params.id });
  res.json({ note });
});

// UPDATE
app.put('/notes/:id', async (req, res) => {
  db.notes.update({ _id: req.body.note._id }, req.body.note);
  res.json(req.body.note);
});

// DELETE
app.delete('/notes/:id', async (req, res) => {
  db.notes.remove({ _id: req.params.id });
  res.json({ status: 'success' });
});

app.listen(8888, () => console.log('Example app listening on port 8888!'));
