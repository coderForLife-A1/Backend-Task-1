const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [];
let nextId = 1;

app.get('/to-dos', (req, res) => {
    res.json(tasks);
});

app.post('/to-dos', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: 'Task content is required' });
    }
    const newTask = { id: nextId++, task };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.delete('/to-dos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    const deletedTask = tasks.splice(index, 1);
    res.json(deletedTask[0]);
});

app.listen(port, () => {
    console.log(`Task manager backend listening at http://localhost:${port}`);
});
