import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import it from '../assets/country-flags/it.svg'
import ca from '../assets/country-flags/ca.svg'
import mx from '../assets/country-flags/mx.svg'
import nz from '../assets/country-flags/nz.svg'
import kr from '../assets/country-flags/kr.svg'
import ie from '../assets/country-flags/ie.svg'
import gb from '../assets/country-flags/gb.svg'
import fr from '../assets/country-flags/fr.png'
import { getWinnerNumber } from '../services/ticketService'

const TicketContext = createContext()

// Set your ticket price here
const TICKET_PRICE = 0.4

// Utilidad para mostrar siempre 2 enteros y 2 decimales
const formatPrice = (value) => value.toFixed(2).padStart(5, '0')

export const TicketProvider = ({ children }) => {
  // Load from localStorage or start empty
  const [tickets, setTickets] = useState(() => {
    try {
      const stored = localStorage.getItem('tickets')
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading tickets from localStorage:', error)
      return []
    }
  })

  // Save to localStorage whenever tickets change
  useEffect(() => {
    try {
      localStorage.setItem('tickets', JSON.stringify(tickets))
    } catch (error) {
      console.error('Error saving tickets to localStorage:', error)
    }
  }, [tickets])

  //Add a ticket (numbers array)
  const addTicket = (countrySelections, selectedCount) => {
    setTickets((prev) => [
      ...prev,
      {
        selections: Object.entries(countrySelections)
          .filter(([_, number]) => number !== undefined && number !== null)
          .map(([countryCode, number]) => ({ countryCode, number })),
        price: Number(formatPrice(selectedCount * TICKET_PRICE)) // Formateado
      }
    ])
  }

  // Remove a ticket by index
  const removeTicket = (idx) => {
    setTickets((prev) => prev.filter((_, i) => i !== idx))
  }

  // Get total price
  const totalPrice = tickets.reduce((sum, t) => sum + t.price, 0)

  const [winnerNumbers, setWinnerNumbers] = useState({})

  // Fetch winner numbers from the backend
  useEffect(() => {
    const fetchWinnerNumbers = async () => {
      try {
        const res = await getWinnerNumber()
        // Transform the response into an object with countryCode as keys
        const transformedData = res.reduce((acc, item) => {
          acc[item.countryCode] = item.winnerNumber
          return acc
        }, {})
        setWinnerNumbers(transformedData)
      } catch (error) {
        console.error('Error fetching winner numbers:', error)
      }
    }

    fetchWinnerNumbers()
  }, [])

  // Merge winner numbers with countryConfigs
  const mergedCountryConfigs = countryConfigs.map((country) => ({
    ...country,
    winnerNumber: winnerNumbers[country.code] || null
  }))

  // Compare tickets with winner numbers
  const matchedTickets = tickets.map((ticket) => {
    const isWinner = ticket.selections.some((selection) => {
      return winnerNumbers[selection.countryCode] === selection.number
    })
    return { ...ticket, isWinner }
  })

  // Log matched tickets for debugging
  console.log('Matched Tickets:', matchedTickets)

  return (
    <TicketContext.Provider
      value={{
        tickets,
        addTicket,
        removeTicket,
        totalPrice,
        ticketPrice: TICKET_PRICE,
        formatPrice,
        countryConfigs: mergedCountryConfigs // Provide merged configs
      }}
    >
      {children}
    </TicketContext.Provider>
  )
}

// Custom hook for easy access
export const useTicket = () => useContext(TicketContext)

export const countryConfigs = [
  {
    code: 'IT',
    name: 'Italia',
    flag: it,
    totalNumbers: 90,
    winnerNumber: null
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: ca,
    totalNumbers: 49,
    winnerNumber: null
  },
  {
    code: 'MX',
    name: 'Mexico',
    flag: mx,
    totalNumbers: 56,
    winnerNumber: null
  },
  {
    code: 'NZ',
    name: 'New Zealand',
    flag: nz,
    totalNumbers: 40,
    winnerNumber: null
  },
  {
    code: 'KR',
    name: 'South Korea',
    flag: kr,
    totalNumbers: 45,
    winnerNumber: null
  },
  {
    code: 'IE',
    name: 'Ireland',
    flag: ie,
    totalNumbers: 47,
    winnerNumber: null
  },
  {
    code: 'UK',
    name: 'United Kingdom',
    flag: gb,
    totalNumbers: 59,
    winnerNumber: null
  },
  { code: 'FR', name: 'France', flag: fr, totalNumbers: 10, winnerNumber: null }
]
