const express = require('express');
const app = express()
const pool = require("./src/db")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const path = require('path');

app.use(express.json())

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post("/registration", async (req, res) => {
    const today = new Date()
    try {
        const { email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 12)
        const { rows: existedEmails } = await pool.query("SELECT email FROM users", [])
        console.log("existedEmails", existedEmails)
        if (existedEmails.some(item => item.email === email)) {
            // res.sendStatus(200).json({ message: 'User exist' })
            console.log('exi')
            res.json({ message: 'User exist' })
        } else {
            const newUser = await pool.query(
                "INSERT INTO users (email, password, dateofregistration, timer, symbols) VALUES($1, $2, $3, $4, $5) RETURNING *",
                [email, hashedPassword, today, 15, 1000]);
            res.sendStatus(200).json({ message: 'User done' })
        }


    } catch (error) {
        console.log(error)
    }
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const { rows: user } = await pool.query("SELECT * FROM users WHERE email = $1", [email])

        if (user.length === 0 || !user) {
            return res.status(400).json({ message: 'No users with email' })
        }

        const isMatch = await bcrypt.compare(password, user[0].password)

        if (!isMatch) {
            return res.status(400).json({ message: 'Wrong password' })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        res.json({ token, userId: user[0].id, user: user[0] })

    } catch (error) {
        console.log(error)
    }
})

app.get("/questions", async (req, res) => {
    try {
        const { rows: questions } = await pool.query("SELECT * FROM questions")
        res.send(questions)
    } catch (error) {
        console.log(error)
    }
})

app.get("/todayquestions/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params

        let finalQuestion
        const { rows: questions } = await pool.query("SELECT * FROM questions")

        if (user_id === 'null') {
            finalQuestion = questions
        } else {
            const { rows: answers } = await pool.query("SELECT (question) FROM answers WHERE user_id = $1", [user_id])
            const onlyAnswers = answers.map(item => item.question)
            finalQuestion = questions.filter(item => !onlyAnswers.includes(item.name))
        }

        const twoQuestions = getSeveralRandomItemsInArray(finalQuestion, 2)
        res.send(twoQuestions)
    } catch (error) {
        console.log(error)
    }
})

app.post("/answers", async (req, res) => {
    try {
        const { user_id, question, text, date } = req.body
        const url = user_id + new Date().valueOf()

        const answer = await pool.query("INSERT INTO answers (user_id, question, text, date, url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [user_id, question, text, date, url])
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
    }
})

app.get("/answers/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params

        const { rows: answers } = await pool.query("SELECT * FROM answers WHERE user_id = $1",
            [user_id])

        const answersWithSliceText = answers.map(item => {
            return {
                ...item,
                text: item.text.substring(0, 300)
            }
        })
        res.send(answersWithSliceText)
    } catch (error) {
        console.log(error)
    }
})

app.get('/posts/:post_id', async (req, res) => {
    try {
        const { post_id } = req.params

        const { rows: answer } = await pool.query("SELECT * FROM answers WHERE url = $1", [post_id])
        res.send(answer[0])

    } catch (error) {
        console.log(error)
    }
})

const getSeveralRandomItemsInArray = (array, amount) => {
    const severalRandomItems = []
    for (let i = 1; i <= amount; i++) {
        const index = Math.floor(Math.random() * array.length)
        severalRandomItems.push(array[index])
        array.splice(index, 1)
    }
    return severalRandomItems
}

app.listen(5000, () => {
})