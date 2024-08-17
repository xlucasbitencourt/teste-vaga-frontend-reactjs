import React from "react";
import { Button } from "@/components/ui/button";

type ModalProps = {
  isOpen: boolean;
  title: string;
  message?: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onlyClose?: boolean;
};

export default function Modal({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
  confirmButtonText = "Confirmar",
  cancelButtonText = "Cancelar",
  onlyClose = false,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="bg-white min-w-96 p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {message && <p className="mb-6">{message}</p>}
        <div className="flex justify-end gap-4">
          {onlyClose ? (
            <Button onClick={onClose}>{confirmButtonText}</Button>
          ) : (
            <>
              <Button variant="outline" onClick={onClose}>
                {cancelButtonText}
              </Button>
              <Button onClick={onConfirm}>{confirmButtonText}</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
