import React, { useState } from 'react'

const AddName = ({ event, persons, newName, newNumber, addName, handleNameChange }) => {
  event.preventDefault()
  const personArray = persons.map(e => e.name)
  const nameObject = {
    name: newName,
    date: new Date().toISOString(),
    number: newNumber,
    id: persons.length + 1
  }
  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
      </form>
    </div>
  )
}

const App = () => {
// Initialize pieces of state for storing the user submitted input 
const [persons, setPersons] = useState([
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const [ filter, setFilter ] = useState('')
  const [ filterPersons, setFilterPersons ] = useState(persons)

// Create addName function for creating new names, and nameObject for storing them. 
  const addName = (event) => {
    event.preventDefault()
    const personArray = persons.map(e => e.name) 
    const nameObject = {               
      name: newName,
      date: new Date().toISOString(),
      number: newNumber,
      id: persons.length
    }

// Prevent user from being able to add names that already exist in the phonebook.
// Issue a warning with the alert command when such action is attempted. 
    if (personArray.includes(`${nameObject.name}`)) {
      const oldPerson = persons.filter(e => e.name === newName)
      const _id = oldPerson.map(e => e.id)[0]
      const result = window.confirm(
        `${newName} is already added to phonebook.`
      )
      }
    else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      console.log('button clicked', event.target)
    }
  }

// Create an event handler that's called every time a change 
// occurs in the input element. 
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
// Event handler for name changes in input element
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
// Event handler for name filter
  const handleFilterChange = (event) => {
    console.log(event.target.value) 
    setFilter(event.target.value)
    setFilterPersons(persons.filter((person) => 
    (person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)))
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <div>
        filter shown with <input value={filter}
          onChange={handleFilterChange}/>
        </div>
        
      </form>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName}
            onChange={handleNameChange} />
        </div>
        <div>number<input value={newNumber}
            onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filterPersons.map(person => 
        <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )
}

export default App