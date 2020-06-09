const express = require('express');
const app = express()
const pool = require("./src/db")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

app.use(express.json())

app.post("/registration", async (req, res) => {
    const today = new Date()
    try {
        const { email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await pool.query(
            "INSERT INTO users (email, password, dateofregistration) VALUES($1, $2, $3) RETURNING *",
            [email, hashedPassword, today]);
        res.sendStatus(200).json({message: 'User done'})
    } catch (error) {
        console.log(error)
    }
})

app.post("/login", async (req, res) => {

    console.log(req.body)
    try {
        const { email, password } = req.body

        const {rows: user} = await pool.query("SELECT * FROM users WHERE email = $1", [email])

        console.log(user)

        if (user.length === 0 || !user) {
            return res.status(400).json({message: 'No users with email'})
            // return res.sendStatus(400).json({message: 'No users with email'})
        }

        console.log('sss')
        const isMatch = await bcrypt.compare(password, user[0].password)

        if (!isMatch) {
            return res.status(400).json({message: 'Wrong password'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )       

        res.json({token, userId: user[0].id})

    } catch (error) {
        console.log(error)
    }
})

app.listen(5000, () => {
    console.log('server start')
})