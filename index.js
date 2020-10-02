const express = require('express')
const morgan = require('morgan')
const app = express()



app.use(express.json())
app.use(morgan('tiny'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const nameAmount = persons.length
    const date = new Date()
    response.send(`Phonebook has info for ${nameAmount} people <br /> ${date}`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const randomId = Math.floor(Math.random() * 100000000000)
    return randomId
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body.name)

    if (!body.name) {
        return response.status(400).json({
            error: 'Oops! The name seems to be missing!!'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'Oopsie daisy! The number is missing from your request!'
        })
    }

    if (persons.map(person => person.name).includes(body.name)) {
        return response.status(400).json({
            error: 'Unoriginal! The name must be unique!'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT)
