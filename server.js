const PORT = process.env.PORT || 3001;
const express = require('express');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');
const { words } = require('./db/db.json');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json());

/////start of get section
app.get('/api/notes', (req, res) => {
    res.json(words);
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes/', (req, res) => {
    const result = findById(req.params.id, words);
      if(result){
        res.json(result);
      }
      else{
        res.send(404);
      }
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
/////end of get section

/////post section
app.post('/api/notes', (req, res) => {
    req.body.id = uniqid();
    const notes = createNewNote(req.body, words);
      res.json(notes);
});
//////

function createNewNote(body, dbNotes) {
    const note = body;
    dbNotes.push(note);
    fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify({ words: dbNotes }, null, 2)
    );
    return note;
}

function findById(id, dbNotes) {
    const result = dbNotes.filter(words => words.id === id)[0];
      return result;
}

//app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});