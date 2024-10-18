import toast, { Toaster } from 'react-hot-toast';
import { Check, X, Info, Alert, XCircle } from './Icon';

export const success = (message) => {
  toast.custom((t) => (
    <div
      className="flex items-center justify-between w-fit py-2.5 px-4 border bg-white border-gray-100 shadow-md rounded-md"
    >
      <div className="flex items-center">
        <Check className="w-5 h-5" />
        <div className="text-xs text-gray-700 font-semibold px-1.5">{message}</div>
      </div>
      <X className="cursor-pointer" onClick={() => toast.dismiss(t.id)} />
    </div>
  ));
};

export const info = (message) => {
  toast.custom((t) => (
    <div
      className="flex items-center justify-between w-fit py-2.5 px-4 border bg-white border-gray-100 shadow-md rounded-md"
    >
      <div className="flex items-center">
        <Info className="w-5 h-5" />
        <span className="block w-[1px] bg-gray-200"></span>
        <div className="text-xs text-gray-700 font-semibold px-1.5">{message}</div>
      </div>
      <X className="cursor-pointer" onClick={() => toast.dismiss(t.id)} />
    </div>
  ));
};

export const warning = (message) => {
  toast.custom((t) => (
    <div
      className="flex items-center justify-between w-fit py-2.5 px-4 border bg-white border-gray-100 shadow-md rounded-md"
    >
      <div className="flex items-center">
        <Alert className="w-5 h-5" />
        <span className="block w-[1px] bg-gray-200"></span>
        <div className="text-xs text-gray-700 font-semibold px-1.5">{message}</div>
      </div>
      <X className="cursor-pointer" onClick={() => toast.dismiss(t.id)} />
    </div>
  ));
};

export const error = (message) => {
  toast.custom((t) => (
    <div
      className="flex items-center justify-between w-fit py-2.5 px-4 border bg-white border-gray-100 shadow-md rounded-md"
    >
      <div className="flex items-center">
        <XCircle className="w-5 h-5" />
        <span className="block w-[1px] bg-gray-200"></span>
        <div className="text-xs text-gray-700 font-semibold px-1.5">{message}</div>
      </div>
      <X className="cursor-pointer" onClick={() => toast.dismiss(t.id)} />
    </div>
  ));
};

export const ToastProvider = () => {
  return <Toaster containerClassName="ml-[275px]" position="bottom-left" toastOptions={{ duration: 3000 }} />;
};
