import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

// routes created to handle various requests like auth/login and auth/register

const router = express.Router();

// Register a new user endpoint /auth/register
router.post('/register', (req, res) => {

    const { username, password } = req.body;

    // save the username and an irreversibly encrypted password
    // save mailID | afafafa.f.adfda.f.daf....fd.d.....

    //encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8)

    // save the new user and hashed pwd to db
    try {
        const insertUser = db.prepare(`
            INSERT INTO users(username, password) VALUES(? , ?)
        `)
        const result = insertUser.run(username, hashedPassword)

        // Adding a default todo for the user we just registered
        const defaultTodo = 'Hello :) Add your first todo'; // This line is correct

        const insertTodo = db.prepare(`
            INSERT INTO todos(user_id, task) VALUES(?, ?)
        `)

        const insertTodoResult = insertTodo.run(result.lastInsertRowid, defaultTodo);
        if (!insertTodoResult) {
            return res.status(500).send({ message: "Failed to create default todo" });
        }

        // create a token (to avoid getting data other than user's own from getting modified)
        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, { expiresIn: '24h' })    
        res.json({ token })

    } catch(err) {
        console.log(err.message)
        res.sendStatus(503)
    }

})

router.post('/login', (req, res) => {
    // gets their email and look up password associated with that
    // but we get it back and see it's encrypted, which means that we
    // cannot compare to password with which user is trying to login 
    // so what we can do, is to encrypt the password the user just entered.

    const { username, password } = req.body

    try {
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
        
        const user = getUser.get(username)

        if (!user) {
            return res.status(404).send({ message: "User Not Found" })
        } // guard clause to check for user

        const passwordIsValid = bcrypt.compareSync(password, user.password) 
        // hashes the first pwd parameter and compares with the signup hashed pwd to return a boolean value
        
        if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password" })
        } // guard clause to check for password
        
        console.log(user)
        
        // Successful authentication
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "24h"})
        res.json({ token })
    } catch(err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

export default router;
