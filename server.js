const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const notes = require('./db/db.json')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})
app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`))