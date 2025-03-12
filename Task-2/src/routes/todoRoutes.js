import express from 'express'
import db from '../db.js'

const router = express.Router()

// routes to handle requests for todo tables.

// Middleware will be getting the request before allowing the user to fetch data
// so after doing each endpoint we will do its setup in authMiddleware.js 

// Get all todos for logged-in user
router.get('/', (req, res) => {
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?')
    const todos = getTodos.all(req.userId) || []; // Ensure todos is an array
    console.log("Fetched todos:", todos); // Log the fetched todos

    res.json(todos)
})

// To create a new to-do
router.post('/', (req, res) => {
   const {task} = req.body
   const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
   const result = insertTodo.run(req.userId, task)

   res.json({id: result.lastInsertRowid, task, completed: 0})
})

// Update a to-do
router.put('/:id', (req, res) => { // Using a dynamic query parameter to reference to any todo table
    const {completed} = req.body
    const { id } = req.params
    //const { page } = req.query

    const updateTodo = db.prepare('UPDATE todos SET completed = ? WHERE id = ?')
    updateTodo.run(completed, id)

    res.json({ message: "Todo completed" })
})

// Delete a to-do (using hard-delete that's not recommended in big corporations)
router.delete('/:id', (req, res) => {
    const { id } = req.params
    const { userId } = req
    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`)
    deleteTodo.run(id, userId)

    res.json({ message: "Todo deleted" })
})

export default router;
