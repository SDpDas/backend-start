// The address of this server connected to network is:
// URL -> http://localhost:8800
// IP -> 127.0.0.1:8800

/* ----------------- */

const express = require('express') // Requires express package
const app = express() // Invoke express as function
const PORT = 8800; 

let data = {
    users: ["Sagar", "Rudra", "Akash", "Jatin"]
}

// Middleware used for POST request
app.use(express.json())

// Express server listens to incoming net requests at port
app.listen(PORT, () => console.log(`Server has started on ${PORT}`)) 
// Callback function executes when server is running

/** ---------------- */



/** ---------------- */

/** HTTP verbs (or methods) and paths (or routes) */

// The method informs nature of request and route is a further subdir
// (basically we direct the request to the body of code to respond appropriately
// and these routes are called endpoints)

// Website Endpoints (routes for sending html when user enters website URL)

app.get('/', (req, res) => {
    console.log("User requested some information")
    res.send(`
        <body style="background: gray; color: white">
            <h1>DATA</h1>
            <p>${JSON.stringify(data)}</p> 
            <a href="/dashboard" style="text-decoration: none;">Dashboard</a>
        </body>
        <script>console.log('This is one script')</script>
        `)
    // console.log('First endpoint reached', req.method)
    // res.sendStatus(404)
})

app.get('/dashboard', (req, res) => {
    res.send(`
        <div style="color:gray"> 
            <h1>dashboard</h1>
            <body>
                <a href="/" style="text-decoration: none;">Homepage</a>
            </body>
        </div>
        
        `)
})

// API Endpoints (non visual)

app.get('/api/data', (req, res) => {
    console.log("To show data is sent to server")
    res.status(599).send(data)
})

// These endpoints fall under CRUD action methods- 
// Create: post, Read: get, Update: put and Delete: delete

app.post('/api/data', (req, res) => {
    // body to create an user (for eg. during signup)
    // after entering credentials and clicking signup, browser sends net request
    // to server to handle the action
    const newEntry = req.body
    console.log(newEntry)
    data.users.push(newEntry.name)
    res.sendStatus(201)
})

app.delete('/api/data', (req, res) => {
    data.users.pop()
    console.log("Deleted the element from end of the array")
    res.sendStatus(203)
})

/** --------------- */