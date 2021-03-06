import React, { useState, useEffect } from 'react'
import noteService from './services/notes'


const PersonForm = ({ addName, data }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={data.newName}
          onChange={data.handleNameChange} />
      </div>
      <div>number: <input value={data.newNumber}
          onChange={data.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
  </form>  
  )
}

const Persons = ({ filterPerson, setPerson, setMessage }) => {

  const isDelete = ( person ) => {
    const result = window.confirm(`Delete ${person.name}`)
    if (result) {
      noteService
        .remove(person.id)
        .then(response => {
          setPerson(filterPerson.filter(item => item !== person))
          setMessage({
            text: `${person.name} has been removed`,
            type: "success"
          })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
          })
        }
    }

    return (
      filterPerson.map((e) => 
      <p>
        {e.name}
        {" "}
        {e.number}
        {" "}
        <button onClick={() => isDelete(e)}>delete</button>
      </p>
      )
    )
  }

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <form>
      <div>
        filter shown with <input value={filter}
        onChange={handleFilterChange}/>
      </div>
  </form>
  )
}

const Display = ({ persons, toggleDelete }) => {
  return (
    <div>
    <ul>
    {persons.map(person => 
    <li key={person.name}>{person.name} {person.number}
    {" "}
    <button onClick={toggleDelete}>delete</button>
    </li>
    )}
  </ul>
  </div>
  )
}

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ message, setMessage ] = useState(null)

  const [ filter, setFilter ] = useState('')
  const [ filterPersons, setFilterPersons ] = useState(persons)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNames => {
        setPersons(initialNames)
      })
  }, [])

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
      setNewNumber('')
      console.log('button clicked', event.target)
    }

    noteService
      .create(nameObject)
      .then(returnedName => {
        setPersons(persons.concat(returnedName))
        setNewName('')
        setNewNumber('')
        console.log()
      })
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
    setPersons(persons.filter((person) => 
    (person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)))
  }

  const addPersonData = {
    newName,
    newNumber,
    handleNameChange,
    handleNumberChange
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addName={addName} data={addPersonData} />
      <h2>Numbers</h2>
      {filter === '' ?
      <Persons filterPerson={persons} setPersons={setPersons} setMessage={setMessage}/>
    :
    <Persons filterPerson={filterPersons} setPersons={setPersons} setMessage={setMessage}/>
    }
    </div>
  )
}

export default App