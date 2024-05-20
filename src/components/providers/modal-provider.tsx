"use client";
import { useMountedState } from "react-use";
import CreateListModal from "../list/modals/create-list-modal";
import { CreatePresentModal } from "../present/modals/create-modal-present";
import { EditListModal } from "../list/modals/edit-list-modal";

const ModalProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <CreateListModal />
      <EditListModal />

      <CreatePresentModal />
    </>
  );
};

export default ModalProvider;
