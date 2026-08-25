import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppPage from '../page';

// Mock the AI hook so it does not query network or crash
jest.mock('../../../hooks/useTaskChat', () => {
  return jest.fn(() => ({
    messages: [],
    input: '',
    setInput: jest.fn(),
    handleInputChange: jest.fn(),
    handleSubmit: jest.fn(),
    isLoading: false,
    stop: jest.fn(),
    error: null,
  }));
});

describe('AppPage Workspace View', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should render empty workspace with appropriate empty state message', () => {
    render(<AppPage />);
    expect(screen.getByText(/No tasks yet. Add one above!/i)).toBeInTheDocument();
  });

  it('should add a new task when submitting form', () => {
    render(<AppPage />);
    
    const input = screen.getByLabelText(/New task/i);
    const addButton = screen.getByRole('button', { name: /^Add task$/i });

    fireEvent.change(input, { target: { value: 'Buy milk' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    expect(screen.queryByText(/No tasks yet/i)).not.toBeInTheDocument();
  });

  it('should toggle a task status when checkbox clicked', () => {
    render(<AppPage />);
    
    const input = screen.getByLabelText(/New task/i);
    const addButton = screen.getByRole('button', { name: /^Add task$/i });
    fireEvent.change(input, { target: { value: 'Test toggle' } });
    fireEvent.click(addButton);

    const toggleButton = screen.getByLabelText(/Mark "Test toggle" as complete/i);
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.getByLabelText(/Mark "Test toggle" as incomplete/i)).toBeInTheDocument();
    expect(screen.getByText(/1 of 1 tasks completed/i)).toBeInTheDocument();
  });

  it('should delete a task when delete clicked', () => {
    render(<AppPage />);
    
    const input = screen.getByLabelText(/New task/i);
    const addButton = screen.getByRole('button', { name: /^Add task$/i });
    fireEvent.change(input, { target: { value: 'Test delete' } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByLabelText(/Delete task "Test delete"/i);
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(screen.queryByText('Test delete')).not.toBeInTheDocument();
    expect(screen.getByText(/No tasks yet. Add one above!/i)).toBeInTheDocument();
  });

  it('should filter tasks by All/Active/Completed status', () => {
    render(<AppPage />);
    
    const input = screen.getByLabelText(/New task/i);
    const addButton = screen.getByRole('button', { name: /^Add task$/i });
    
    fireEvent.change(input, { target: { value: 'Active Task' } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: 'Completed Task' } });
    fireEvent.click(addButton);

    const toggleButton = screen.getByLabelText(/Mark "Completed Task" as complete/i);
    fireEvent.click(toggleButton);

    expect(screen.getByText('Active Task')).toBeInTheDocument();
    expect(screen.getByText('Completed Task')).toBeInTheDocument();

    const activeFilters = screen.getAllByRole('button', { name: /Active/ });
    fireEvent.click(activeFilters[0]);

    expect(screen.getByText('Active Task')).toBeInTheDocument();
    expect(screen.queryByText('Completed Task')).not.toBeInTheDocument();

    const completedFilters = screen.getAllByRole('button', { name: /Completed/ });
    fireEvent.click(completedFilters[0]);

    expect(screen.queryByText('Active Task')).not.toBeInTheDocument();
    expect(screen.getByText('Completed Task')).toBeInTheDocument();
  });

  it('should clear completed tasks when clicking Clear Completed button', () => {
    render(<AppPage />);
    
    const input = screen.getByLabelText(/New task/i);
    const addButton = screen.getByRole('button', { name: /^Add task$/i });
    
    fireEvent.change(input, { target: { value: 'Task to clear' } });
    fireEvent.click(addButton);

    const toggleButton = screen.getByLabelText(/Mark "Task to clear" as complete/i);
    fireEvent.click(toggleButton);

    const clearButton = screen.getByRole('button', { name: /Clear completed/i });
    fireEvent.click(clearButton);

    expect(screen.queryByText('Task to clear')).not.toBeInTheDocument();
    expect(screen.getByText(/No tasks yet. Add one above!/i)).toBeInTheDocument();
  });

  it('should filter tasks by search query text', () => {
    render(<AppPage />);
    
    const input = screen.getByLabelText(/New task/i);
    const addButton = screen.getByRole('button', { name: /^Add task$/i });
    
    fireEvent.change(input, { target: { value: 'Buy apples' } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: 'Sell bananas' } });
    fireEvent.click(addButton);

    const searchInput = screen.getByLabelText(/Search tasks/i);
    fireEvent.change(searchInput, { target: { value: 'banan' } });

    expect(screen.queryByText('Buy apples')).not.toBeInTheDocument();
    expect(screen.getByText('Sell bananas')).toBeInTheDocument();
  });
});
