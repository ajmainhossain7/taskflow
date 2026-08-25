import { renderHook, act } from '@testing-library/react';
import useTodos from '../useTodos';

describe('useTodos hook', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should initialize with an empty array if localStorage is empty', () => {
    const { result } = renderHook(() => useTodos());
    const [todos] = result.current;
    expect(todos).toEqual([]);
  });

  it('should initialize with values from localStorage if they exist', () => {
    const mockTodos = [
      { id: '1', text: 'Test Task 1', completed: false, createdAt: Date.now() },
    ];
    localStorage.setItem('taskflow:todos', JSON.stringify(mockTodos));

    const { result } = renderHook(() => useTodos());
    const [todos] = result.current;
    expect(todos).toEqual(mockTodos);
  });

  it('should save todos to localStorage when they change', () => {
    const { result } = renderHook(() => useTodos());
    const [, setTodos] = result.current;

    const newTodos = [
      { id: '1', text: 'New Task', completed: false, createdAt: Date.now() },
    ];

    act(() => {
      setTodos(newTodos);
    });

    const [todos] = result.current;
    expect(todos).toEqual(newTodos);
    expect(localStorage.getItem('taskflow:todos')).toEqual(JSON.stringify(newTodos));
  });
});
