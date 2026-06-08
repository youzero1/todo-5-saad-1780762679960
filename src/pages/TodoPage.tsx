import { useTodos } from '@/hooks/useTodos';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFooter from '@/components/TodoFooter';

export default function TodoPage() {
  const store = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex flex-col items-center py-16 px-4">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 select-none">
          Todo 5
        </h1>
        <p className="mt-2 text-gray-400 text-sm tracking-wide">Stay on top of your day</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        <TodoInput onAdd={store.addTodo} onToggleAll={store.toggleAll} hasTodos={store.todos.length > 0} />

        {store.filtered.length > 0 && (
          <TodoList
            todos={store.filtered}
            onToggle={store.toggleTodo}
            onDelete={store.deleteTodo}
            onEdit={store.editTodo}
          />
        )}

        {store.todos.length === 0 && (
          <div className="py-16 flex flex-col items-center gap-3 text-gray-300">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 9h18" />
            </svg>
            <p className="text-sm">No tasks yet — add one above!</p>
          </div>
        )}

        {store.todos.length > 0 && (
          <TodoFooter
            activeCount={store.activeCount}
            completedCount={store.completedCount}
            filter={store.filter}
            setFilter={store.setFilter}
            onClearCompleted={store.clearCompleted}
          />
        )}
      </div>

      <p className="mt-8 text-xs text-gray-300">Double-click a task to edit it</p>
    </div>
  );
}
