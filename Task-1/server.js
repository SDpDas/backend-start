// The address of this server connected to network is:
// URL -> http://localhost:8800
// IP -> 127.0.0.8800

/* ----------------- */

const express = require('express') // Requires express package
const app = express() // Invoke express as function
const PORT = 8800; 

let data = {
    name: 'Sagardeep'
}

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
    res.send(`
        <body style="background: gray; color: white">
            <h1>DATA</h1>
            <p>${JSON.stringify(data)}</p> 
        </body>
        `)
    // console.log('First endpoint reached', req.method)
    // res.sendStatus(404)
})

app.get('/dashboard', (req, res) => {
    res.send("<h1>dashboard</h1>")
})

// API Endpoints (non visual)

app.get('/api/data', (req, res) => {
    console.log("API Endpoint")
    res.send(data)
})

// These endpoints fall under CRUD action methods- 
// Create: post, Read: get, Update: put and Delete: delete

/** --------------- */