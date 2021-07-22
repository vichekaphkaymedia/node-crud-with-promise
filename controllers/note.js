const Note = require('../models/Note.js')

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        })
    }

    // Create a Note
    const note = new Note({
        title: req.body.title || "Untitled Note",
        content: req.body.content
    })

    // Save Note in the database
    note.save()
        .then(data => {
            res.send(data)
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Internal Server Error"
        })
    })
}

// Retrieve and return all notes from the database.
exports.index = (req, res) => {
    Note.find()
        .then(notes => {
            res.send(notes)
        }).catch(err => {
        res.status(500).send({
            message: "Internal Server Error"
        })
    })
}

// Find a single note with a noteId
exports.show = (req, res) => {
    Note.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found"
                })
            }
            res.send(note)
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found"
            })
        }
        return res.status(500).send({
            message: "Internal Server Error"
        })
    })
}


// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        })
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found"
                })
            }
            res.send(note)
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found"
            })
        }
        return res.status(500).send({
            message: "Internal Server Error"
        })
    })
}


// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndDelete(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found"
                })
            }
            res.status(204).send()
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found"
            })
        }
        return res.status(500).send({
            message: "Internal Server Error"
        })
    })
}