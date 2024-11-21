import React from 'react';
import { createPortal } from 'react-dom';

interface IModalProps {
  title: string;
  description: string;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<IModalProps> = ({
  title,
  description,
  onClose,
  children,
}) => {
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl mb-2 font-bold">{title}</h2>
        <p className="text-xl text-green-300 mb-4">{description}</p>
        {children}
      </div>
    </div>,
    document.querySelector('#modal-root') as HTMLElement
  );
};

export default Modal;
