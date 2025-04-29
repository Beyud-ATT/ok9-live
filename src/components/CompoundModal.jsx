import { Modal } from "antd";
import { createContext, useContext, useState } from "react";
import { useCallback } from "react";

const ModalContext = createContext();

function CompoundModal({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen((state) => !state);
  }, []);

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, toggleModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function ModalTrigger({ render }) {
  const { openModal } = useModal();
  return render(openModal);
}

function ModalContent({ children, ...rest }) {
  const { isOpen, closeModal } = useModal();
  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      footer={null}
      closeIcon={false}
      classNames={{ content: "!bg-[var(--background-color)]" }}
      {...rest}
    >
      {children}
    </Modal>
  );
}

function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a CompoundModal");
  }
  return context;
}

CompoundModal.Trigger = ModalTrigger;
CompoundModal.Content = ModalContent;

export { CompoundModal, useModal };
