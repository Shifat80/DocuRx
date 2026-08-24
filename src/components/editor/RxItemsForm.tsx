import { Plus, Trash2 } from 'lucide-react';
import { RxItem } from '../../types';
import { createId } from '../../utils/id';

interface RxItemsFormProps {
  items: RxItem[];
  onChange: (next: RxItem[]) => void;
}

const cellClass =
  'w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500';

export function RxItemsForm({ items, onChange }: RxItemsFormProps) {
  const updateItem = (id: string, patch: Partial<RxItem>) => {
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const addItem = () => {
    onChange([...items, { id: createId(), medicine: '', dosage: '', duration: '', instruction: '' }]);
  };

  const removeItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.id} className="rounded-lg border border-slate-200 p-3 space-y-2 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">#{index + 1}</span>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="text-slate-400 hover:text-red-600"
              aria-label="Remove medicine"
            >
              <Trash2 size={14} />
            </button>
          </div>
          <input
            className={cellClass}
            placeholder="Medicine name"
            value={item.medicine}
            onChange={(e) => updateItem(item.id, { medicine: e.target.value })}
          />
          <div className="grid grid-cols-3 gap-2">
            <input
              className={cellClass}
              placeholder="Dosage (e.g. ১+০+১)"
              value={item.dosage}
              onChange={(e) => updateItem(item.id, { dosage: e.target.value })}
            />
            <input
              className={cellClass}
              placeholder="Duration"
              value={item.duration}
              onChange={(e) => updateItem(item.id, { duration: e.target.value })}
            />
            <input
              className={cellClass}
              placeholder="Instruction"
              value={item.instruction}
              onChange={(e) => updateItem(item.id, { instruction: e.target.value })}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="w-full flex items-center justify-center gap-1.5 text-sm font-medium text-teal-700 border border-dashed border-teal-400 rounded-md py-2 hover:bg-teal-50"
      >
        <Plus size={15} />
        Add medicine
      </button>
    </div>
  );
}
