const PORT = process.env.PORT || 3001;
const express = require('express');
const fs = require('fs');
const path = require('path');
const unique = require('uniqid');
const { words } = require('./db/db.json');
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json());

/////start of get section
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, words);
      if(result){
        res.json(result);
      }
      else{
        res.send(404);
      }
});
/////end of get section

/////post section
app.post('/api/notes', (req, res) => {
    req.body.id = uniqid();
    const notes = createNewNote(req.body, words);
      res.json(notes);
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});