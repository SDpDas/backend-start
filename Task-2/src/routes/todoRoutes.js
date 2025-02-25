import express from 'express'
import db from '../db.js'

const router = express.Router()

// routes to handle requests for todo tables.

// Get all todos for logged-in user
router.get('/', (req, res) => {

})

// To create a new to-do
router.post('/', (req, res) => {

})

// Update a to-do
router.put('/:id', (req, res) => { // Using a dynamic query parameter to reference to any todo table
 
})

// Delete a to-do
router.delete('/:id', (req, res) => {

})

export default router;