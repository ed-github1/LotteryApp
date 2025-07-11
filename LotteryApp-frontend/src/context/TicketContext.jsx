import React, { createContext, useContext, useState, useEffect } from 'react'

const TicketContext = createContext()

// Set your ticket price here
const TICKET_PRICE = 20

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

  // Add a ticket (numbers array)
  const addTicket = (numbers) => {
    setTickets((prev) => [...prev, { numbers, price: TICKET_PRICE }])
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
      }}
    >
      {children}
    </TicketContext.Provider>
  )
}

// Custom hook for easy access
export const useTicket = () => useContext(TicketContext)