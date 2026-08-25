import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ContactPage from '../page';

describe('ContactPage Form', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render contact page form details and FAQs', () => {
    render(<ContactPage />);
    expect(screen.getByRole('heading', { name: /Get in Touch/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  });

  it('should display error indicators if fields are empty on submit', () => {
    render(<ContactPage />);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    
    fireEvent.click(submitButton);

    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Message is required')).toBeInTheDocument();
  });

  it('should display error if email format is invalid', () => {
    render(<ContactPage />);
    
    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const msgInput = screen.getByLabelText(/Message/i);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.change(msgInput, { target: { value: 'Hi' } });

    fireEvent.click(submitButton);

    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  it('should show success box and disabled input states after delay on valid submit', () => {
    render(<ContactPage />);
    
    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const msgInput = screen.getByLabelText(/Message/i);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(msgInput, { target: { value: 'This is a message.' } });

    fireEvent.click(submitButton);

    expect(screen.getByRole('button', { name: /Sending.../i })).toBeInTheDocument();
    expect(nameInput).toBeDisabled();

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(screen.getByText('Message Sent')).toBeInTheDocument();
    expect(screen.getByText(/frontend demo interaction/i)).toBeInTheDocument();

    const resetBtn = screen.getByRole('button', { name: /Send Another Message/i });
    fireEvent.click(resetBtn);
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });
});
