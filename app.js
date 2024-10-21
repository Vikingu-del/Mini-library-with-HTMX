import express from 'express';
import createHomepageTemplate from './views/index.js';
import createListTemplate from './views/list.js';
import BOOKS_DATA from './data/data.js';
import createBookTemplate from './views/book.js';
import createEditFormTemplate from './views/edit.js';

// create app
const app = express();
app.use(express.urlencoded({extended: false}));

// static assets
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
  res.send(createHomepageTemplate());
});

app.get('/books', (req, res) => {
  res.send(createListTemplate(BOOKS_DATA));
});

app.post('/books', (req, res) => {
  const {title, author} = req.body;
  const id = Math.random().toString();

  BOOKS_DATA.push({id, title, author});
  res.redirect(`/books/${id}`);
});

app.get('/books/:id', (req, res) => {
  const {id} = req.params;
  const book = BOOKS_DATA.find((book) => book.id === id);

  res.send(createBookTemplate(book));
})

app.post('/books/search', (req, res) => {
  const text = req.body.search;
  const books = BOOKS_DATA.filter((book) => book.title.toLowerCase().includes(text.toLowerCase()));

  res.send(createListTemplate(books));
});

app.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  const idx = BOOKS_DATA.findIndex((book) => book.id === id);
  BOOKS_DATA.splice(idx, 1);

  res.send();
});

app.put('/books/:id', (req, res) => {
  const {title, author} = req.body;
  const id = req.params.id;

  const updatedBook = {title, author, id};

  const idx = BOOKS_DATA.findIndex((book) => book.id = id);
  BOOKS_DATA[idx] = updatedBook;

  res.send(createBookTemplate(updatedBook));
});

app.get('/books/edit/:id', (req, res) => {
  const book = BOOKS_DATA.find((book) => book.id === req.params.id);

  res.send(createEditFormTemplate(book));
});

// listen to port
app.listen(3000, () => {
  console.log('App listening on port 3000');
});