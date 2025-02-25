import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from "./routes/authRoutes.js"
import todoRoutes from "./routes/todoRoutes.js"

const app = express()
const PORT = process.env.PORT || 8800


// Get the file path from URL of current module 
const __filename = fileURLToPath(import.meta.url)
// Get the directory from file path
const __dirname = dirname(__filename)

/** Middlewares */
app.use(express.json())

// Tells express to serve all files as static assets / files.
// Any requests for css files will be thrown to public directory.
app.use(express.static(path.join(__dirname, '../public')))

// Serves HTML file from /public directory
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Routes
app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)

app.listen(PORT, () => {
    console.log(`Server has started on: ${PORT}`)
})