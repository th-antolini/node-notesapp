const fs = require('fs')
const chalk = require('chalk')

module.exports = {
    addNote(title, body) {
        const notes = this.loadNotes()
        const duplicateNote = notes.find((note) => note.title === title)
        if (!duplicateNote) {
            notes.push({
                title,
                body
            })
            this.saveNotes(notes)
            console.log(chalk.green("\n" + 'Note added'))
        } else {
            console.log(chalk.red("\n" + 'Note already exists'))
        }
    },
    removeNote(title) {
        const notes = this.loadNotes()
        const notesToKeep = notes.filter((note) => note.title !== title)
        if (notes.length > notesToKeep.length) {
            this.saveNotes(notesToKeep)
            console.log(chalk.green("\n" + 'Note removed'))
        } else {
            console.log(chalk.red("\n" + 'Note not found'))
        }
    },
    listNotes() {
        const notes = this.loadNotes()
        if (notes.length) {
            console.log("\n  " + chalk.green('Note List'))
            notes.forEach(note => {
                console.log('- ' + note.title)
            })
        } else {
            console.log(chalk.red("\n" + 'There are no saved notes'))
        }
        
    },
    readNote(title) {
        const notes = this.loadNotes()
        const note = notes.find((note) => note.title === title)
        if (note) {
            console.log("\n" + chalk.green(note.title))
            console.log(note.body)
        } else {
            console.log(chalk.red("\n" + 'Note not found'))
        }
    },
    saveNotes(notes) {
        const dataJSON = JSON.stringify(notes)
        fs.writeFileSync('notes.json', dataJSON)
    },
    loadNotes() {
        try {
            const dataBuffer = fs.readFileSync('notes.json')
            const dataJSON = dataBuffer.toString()
            return JSON.parse(dataJSON)
        } catch (e) {
            return []
        }
    }
}