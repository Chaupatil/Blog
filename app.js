const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let posts = [];


app.get('/', (req, res) => {
    res.render('index', { posts });
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.get('/edit/:id', (req, res) => {
    const post = posts[req.params.id];
    res.render('edit', { post, id: req.params.id });
});

app.post('/add', (req, res) => {
    const { title, content } = req.body;
    posts.push({ title, content });
    res.redirect('/');
});

app.post('/update/:id', (req, res) => {
    const { title, content } = req.body;
    posts[req.params.id] = { title, content };
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    posts.splice(req.params.id, 1);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});