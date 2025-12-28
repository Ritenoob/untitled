import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText(/Spark Template Ready/i)).toBeInTheDocument()
  })

  it('displays initial counter value of 0', () => {
    render(<App />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('increments counter when increment button is clicked', () => {
    render(<App />)
    const incrementButton = screen.getByText('Increment')
    fireEvent.click(incrementButton)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('decrements counter when decrement button is clicked', () => {
    render(<App />)
    const decrementButton = screen.getByText('Decrement')
    fireEvent.click(decrementButton)
    expect(screen.getByText('-1')).toBeInTheDocument()
  })

  it('resets counter to 0 when reset button is clicked', () => {
    render(<App />)
    const incrementButton = screen.getByText('Increment')
    const resetButton = screen.getByText('Reset')
    
    fireEvent.click(incrementButton)
    fireEvent.click(incrementButton)
    fireEvent.click(incrementButton)
    expect(screen.getByText('3')).toBeInTheDocument()
    
    fireEvent.click(resetButton)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('displays system status information', () => {
    render(<App />)
    expect(screen.getByText('✅ System Status')).toBeInTheDocument()
    expect(screen.getByText(/TypeScript configured/i)).toBeInTheDocument()
    expect(screen.getByText(/ESLint enabled/i)).toBeInTheDocument()
  })
})
