const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const giveName = process.argv[3]
const giveNumber = process.argv[4]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.owmqf.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({

  name: String,
  number: String,
})

const Person = mongoose.model('person', personSchema)

const person = new Person({
  name: giveName,
  number: giveNumber,
})

if (typeof giveName === 'undefined' && typeof giveNumber === 'undefined') {

  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(person => {
      console.log(`${person.name} ${person.number}`)
      mongoose.connection.close()
    })
  })
}

else {
  person.save().then(() => {

    console.log(`added ${giveName} number ${giveNumber} to phonebook`)
    mongoose.connection.close()

  })
}
