import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatPanel from '../ChatPanel';

describe('ChatPanel Component', () => {
  const mockProps = {
    open: true,
    onClose: jest.fn(),
    messages: [],
    input: '',
    handleInputChange: jest.fn(),
    handleSubmit: jest.fn(),
    isLoading: false,
    stop: jest.fn(),
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render suggested action options in empty state', () => {
    render(<ChatPanel {...mockProps} />);
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
    expect(screen.getByText('How can I help you today?')).toBeInTheDocument();
    expect(screen.getByText('What should I prioritize today?')).toBeInTheDocument();
  });

  it('should render message list when messages are provided', () => {
    const messages = [
      { id: '1', role: 'user', content: 'hello' },
      { id: '2', role: 'assistant', content: 'hi' },
    ];
    render(<ChatPanel {...mockProps} messages={messages} />);
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('hi')).toBeInTheDocument();
  });

  it('should render thinking loading state', () => {
    const messages = [{ id: '1', role: 'user', content: 'hello' }];
    render(<ChatPanel {...mockProps} messages={messages} isLoading={true} />);
    expect(screen.getByText('Thinking')).toBeInTheDocument();
  });

  it('should render warning banner when error state is present', () => {
    const mockError = new Error('Insufficient credit');
    render(<ChatPanel {...mockProps} error={mockError} />);
    expect(screen.getByText('Connection Error')).toBeInTheDocument();
    expect(screen.getAllByText(/credit balance is exhausted/i)[0]).toBeInTheDocument();
  });

  it('should call stop callback when generation stop button clicked', () => {
    render(<ChatPanel {...mockProps} isLoading={true} />);
    const stopButton = screen.getByLabelText('Stop generation');
    fireEvent.click(stopButton);
    expect(mockProps.stop).toHaveBeenCalled();
  });

  it('should render parsed Markdown formatting for assistant messages', () => {
    const messages = [
      { id: '1', role: 'assistant', content: '### AI suggestion\nThis is **bold** text and `code` blocks.' },
    ];
    render(<ChatPanel {...mockProps} messages={messages} />);
    expect(screen.getByText('AI suggestion').tagName).toBe('H4');
    expect(screen.getByText('bold').tagName).toBe('STRONG');
    expect(screen.getByText('code').tagName).toBe('CODE');
  });
});
