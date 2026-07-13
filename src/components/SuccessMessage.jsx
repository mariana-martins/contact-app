import React from 'react';
import * as Toast from '@radix-ui/react-toast';
import { X } from 'lucide-react';

export default function SuccessMessage({ message, onClose }) {
  const [open, setOpen] = React.useState(true);

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      onClose();
    }
  };

  return (
    <Toast.Root
      open={open}
      onOpenChange={handleOpenChange}
      duration={4000}
      className="data-[state=open]:animate-slideIn data-[state=closed]:animate-hide flex items-center justify-between gap-4 rounded-xl bg-slate-900/95 px-4 py-3 text-white shadow-xl backdrop-blur-md transition-all"
    >
      <Toast.Description className="text-sm font-medium">
        {message}
      </Toast.Description>
      <Toast.Action asChild altText="Close notification">
        <button
          type="button"
          onClick={() => handleOpenChange(false)}
          aria-label="Close notification"
          className="rounded-lg p-1 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        >
          <X className="h-4 w-4" />
        </button>
      </Toast.Action>
    </Toast.Root>
  );
}
