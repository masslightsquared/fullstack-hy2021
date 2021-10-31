import axios from 'axios'
import React, { useState, useEffect } from 'react'


const App = () => {
  const [ country, setCountry ] = useState("")
  const [ countries, setCountries ] = useState([])
  const [ countriesFilter, setCountriesFilter ] = useState([])
  const [ showCountry, setShowCountry ] = useState({})

  useEffect(() => {
    console.log('effect')
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    setShowCountry(
      countriesFilter.length === 1 ? { ...countriesFilter[0] } : {}
    )
  }, [countriesFilter])

  const searchCountry = (e) => {
    setCountry(e.target.value)
    setCountriesFilter(
      countries.filter(
        (country) =>
        country.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      )
    )
  }

  const showCountries = () => {
    return countriesFilter.map((country) => (
      <p key={country.name}>
        {country.name}
        <button onClick={() => setShowCountry(country)}>show</button>
      </p>
    ))
  }

  return (
    <>
      <p>
        find countries{" "}
        <input value={country} onChange={searchCountry} />
      </p>
      {countriesFilter.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        showCountries()
      )}
    </>
  )
}

export default App