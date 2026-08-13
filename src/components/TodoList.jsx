import TodoItem  from './TodoItem';
import EmptyState from './EmptyState';

/**
 * TodoList component — renders the (already-filtered) todo list or an empty state.
 *
 * The parent (App.jsx) is responsible for filtering; this component just
 * renders whatever it receives.  The `filter` prop is forwarded to EmptyState
 * so it can display the correct context-aware message.
 *
 * Props:
 *  @param {Array<{ id: string, text: string, completed: boolean }>} todos  - Filtered todos to render.
 *  @param {'all'|'active'|'completed'}                              filter - Active filter (forwarded to EmptyState).
 *  @param {(id: string) => void}                                    onToggle
 *  @param {(id: string) => void}                                    onDelete
 */
const TodoList = ({ todos, filter = 'all', onToggle, onDelete }) => {
  if (todos.length === 0) {
    // Pass the active filter so EmptyState shows the right message.
    return <EmptyState filter={filter} />;
  }

  return (
    <ul
      className="flex flex-col gap-2.5"
      aria-label="Todo list"
      aria-live="polite"   /* announces additions/removals to screen readers */
    >
      {todos.map((todo) => (
        /*
         * `key` uses the stable UUID assigned at creation — never use the
         * array index as key when items can be deleted or reordered.
         */
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TodoList;
