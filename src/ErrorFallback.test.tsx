import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorFallback } from './ErrorFallback'

describe('ErrorFallback', () => {
  it('renders error message', () => {
    const error = new Error('Test error message')
    const resetErrorBoundary = () => {}
    
    render(<ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />)
    
    expect(screen.getByText(/This spark has encountered a runtime error/i)).toBeInTheDocument()
    expect(screen.getByText('Test error message')).toBeInTheDocument()
  })

  it('renders try again button', () => {
    const error = new Error('Test error')
    const resetErrorBoundary = () => {}
    
    render(<ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />)
    
    expect(screen.getByText(/Try Again/i)).toBeInTheDocument()
  })
})
