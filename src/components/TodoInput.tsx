import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

type TodoInputProps = {
  onAdd: (text: string) => void;
  onToggleAll: () => void;
  hasTodos: boolean;
};

export default function TodoInput({ onAdd, onToggleAll, hasTodos }: TodoInputProps) {
  const [value, setValue] = useState('');

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onAdd(value);
      setValue('');
    }
  }

  return (
    <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-100">
      {hasTodos && (
        <button
          onClick={onToggleAll}
          className={clsx(
            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors',
            'text-gray-300 hover:text-indigo-400'
          )}
          aria-label="Toggle all"
        >
          <ChevronDown size={20} />
        </button>
      )}
      {!hasTodos && <div className="w-8" />}
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
        className="flex-1 text-gray-700 text-base placeholder-gray-300 outline-none bg-transparent py-1"
        autoFocus
      />
      <button
        onClick={() => { onAdd(value); setValue(''); }}
        disabled={!value.trim()}
        className={clsx(
          'flex-shrink-0 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all',
          value.trim()
            ? 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-sm'
            : 'bg-gray-100 text-gray-300 cursor-not-allowed'
        )}
      >
        Add
      </button>
    </div>
  );
}
