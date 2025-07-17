import React, { createContext, useContext, useState, useEffect } from 'react'

const TicketContext = createContext()

// Set your ticket price here
const TICKET_PRICE = 0.40

// Utilidad para mostrar siempre 2 enteros y 2 decimales
const formatPrice = (value) => value.toFixed(2).padStart(5, '0')

export const TicketProvider = ({ children }) => {
  // Load from localStorage or start empty
  const [tickets, setTickets] = useState(() => {
    const stored = localStorage.getItem('tickets')
    return stored ? JSON.parse(stored) : []
  })

  // Save to localStorage whenever tickets change
  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets))
  }, [tickets])

  //Add a ticket (numbers array)
  const addTicket = (countrySelections, selectedCount) => {
    console.log('Adding ticket:', countrySelections)
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

  return (
    <TicketContext.Provider
      value={{
        tickets,
        addTicket,
        removeTicket,
        totalPrice,
        ticketPrice: TICKET_PRICE,
        formatPrice
      }}
    >
      {children}
    </TicketContext.Provider>
  )
}

// Custom hook for easy access
export const useTicket = () => useContext(TicketContext)
