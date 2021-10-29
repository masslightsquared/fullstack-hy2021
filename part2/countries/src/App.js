import axios from 'axios'
import React, { useState, useEffect } from 'react'


const App = () => {
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }, [])

  return (
    countries.map((country) => (
      <p key={country.name}>
        {country.name}
      </p>
    ))

export default App