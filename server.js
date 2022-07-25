const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const notes = require('./db/db.json')
const path = require('path')
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// frontend(html) routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})


// backend(api) routes
app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.post('/api/notes', (req, res) => {
    const note = {
        id: Math.floor(Math.random()*1000000),
        title: req.body.title,
        text: req.body.text
    }
    notes.push(note)
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    console.log(notes)
    res.json(notes)
})
app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`))