import { useState, useEffect } from 'react';

const STORAGE_KEY = 'taskflow:todos';

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount (client-only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw !== null) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setTodos(parsed);
        }
      }
    } catch (e) {
      console.warn('useTodos: could not read from localStorage.', e);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever todos changes, but only after initial load
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      console.warn('useTodos: could not write to localStorage.', e);
    }
  }, [todos, isInitialized]);

  return [todos, setTodos];
};

export default useTodos;
