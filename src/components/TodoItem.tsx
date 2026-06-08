import { useState, useRef, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  function handleDoubleClick() {
    setEditValue(todo.text);
    setEditing(true);
  }

  function commitEdit() {
    if (editValue.trim()) {
      onEdit(todo.id, editValue);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') commitEdit();
    if (e.key === 'Escape') {
      setEditValue(todo.text);
      setEditing(false);
    }
  }

  return (
    <li
      className={clsx(
        'group flex items-center gap-3 px-4 py-3 transition-colors',
        'hover:bg-yellow-50/60'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
          todo.completed
            ? 'border-yellow-400 bg-yellow-400'
            : 'border-gray-300 hover:border-yellow-400'
        )}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Text / Edit */}
      {editing ? (
        <input
          ref={inputRef}
          value={editValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          className="flex-1 text-base text-gray-700 bg-white border border-yellow-300 rounded-lg px-2 py-0.5 outline-none focus:ring-2 focus:ring-yellow-200"
        />
      ) : (
        <span
          onDoubleClick={handleDoubleClick}
          className={clsx(
            'flex-1 text-base select-none cursor-default transition-colors',
            todo.completed ? 'line-through text-gray-300' : 'text-gray-700'
          )}
        >
          {todo.text}
        </span>
      )}

      {/* Delete */}
      {!editing && (
        <button
          onClick={() => onDelete(todo.id)}
          className="flex-shrink-0 text-gray-200 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      )}
    </li>
  );
}
