const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let todos = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  let todoItems = todos.map((item, index) => `<li>${item} <a href="/delete/${index}">[x]</a></li>`).join('');
  let html = `
    <h1>Simple To-Do App</h1>
    <form method="POST" action="/add">
      <input name="todo" placeholder="New task" required/>
      <button type="submit">Add</button>
    </form>
    <ul>${todoItems}</ul>
  `;
  res.send(html);
});

app.post('/add', (req, res) => {
  todos.push(req.body.todo);
  res.redirect('/');
});

app.get('/delete/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (!isNaN(index)) todos.splice(index, 1);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`To-Do app running at http://localhost:${port}`);
});