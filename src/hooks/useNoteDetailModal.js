import { useState } from "react";

/**
 * Provides basic modal functionality.
 */
export default function useNoteDetailModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return { isModalOpen, openModal, closeModal };
}
