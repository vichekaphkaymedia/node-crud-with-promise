const express = require('express')
const router = express.Router()
const notes = require('../controllers/note.js')

router
    .post('/', notes.create)
    .get('/', notes.index)
    .get('/:noteId', notes.show)
    .put('/:noteId', notes.update)
    .delete('/:noteId', notes.delete)

module.exports = router