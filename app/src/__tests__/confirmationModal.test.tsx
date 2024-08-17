import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '@/components/ui/Modal' // Certifique-se de que o caminho para o componente Modal está correto

describe('ConfirmationModal', () => {
  const onClose = jest.fn();
  const onConfirm = jest.fn();

  it("deve renderizar o modal com os textos corretos", () => {
    render(
      <Modal
        isOpen={true}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este curso?"
        onClose={onClose}
        onConfirm={onConfirm}
        confirmButtonText="Excluir"
        cancelButtonText="Cancelar"
      />
    );

    expect(screen.getByText("Confirmar Exclusão")).toBeInTheDocument();
    expect(screen.getByText("Tem certeza que deseja excluir este curso?")).toBeInTheDocument();
    expect(screen.getByText("Excluir")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("deve chamar onConfirm ao clicar em 'Excluir'", () => {
    render(
      <Modal
        isOpen={true}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este curso?"
        onClose={onClose}
        onConfirm={onConfirm}
        confirmButtonText="Excluir"
        cancelButtonText="Cancelar"
      />
    );

    fireEvent.click(screen.getByText("Excluir"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});