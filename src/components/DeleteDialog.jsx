import { useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Trash2 } from 'lucide-react';

export default function DeleteDialog({ name, onConfirm }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleConfirm = (e) => {
    e.stopPropagation();
    onConfirm();
    setOpen(false);
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={handleClickOpen}
        aria-label={`Delete ${name}`}
        className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <Trash2 className="h-5 w-5" aria-hidden="true" />
      </button>

      <AlertDialog.Portal>
        <AlertDialog.Overlay
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity duration-200"
        />
        <AlertDialog.Content
          onClick={(e) => e.stopPropagation()}
          className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl transition-all duration-200 focus:outline-none"
        >
          <AlertDialog.Title className="text-xl font-bold text-slate-900">
            Delete {name}?
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-3 text-sm leading-relaxed text-slate-600">
            You are going to delete{' '}
            <strong className="font-semibold text-slate-800">{name}</strong>{' '}
            from your contact list. Are you sure you want to do it?
          </AlertDialog.Description>
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95"
              >
                Yes, delete it!
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
