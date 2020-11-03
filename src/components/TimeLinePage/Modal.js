import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";

import Spinner from "../common/Spinner";

ReactModal.setAppElement("body");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#333333",
    borderRadius: "20px",
    margin: "20px 50px",
    padding: "20px 50px",
  },
};

export default function Modal({
  isModalOpen,
  setIsModalOpen,
  handleDelete,
  isLoading,
}) {
  return (
    <ReactModal
      isOpen={isModalOpen}
      style={customStyles}
      contentLabel="Delete Modal"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ModalTitle>
            Tem certeza que deseja excluir essa publicacao?
          </ModalTitle>
          <ButtonsContainer>
            <CancelButton onClick={() => setIsModalOpen(!isModalOpen)}>
              Nao, voltar
            </CancelButton>
            <ConfirmButton onClick={handleDelete}>Sim, excluir</ConfirmButton>
          </ButtonsContainer>
        </>
      )}
    </ReactModal>
  );
}

const ModalTitle = styled.h1`
  font-family: var(--fontLato);
  font-weight: bold;
  font-size: 34px;
  color: white;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 30px;
`;

const CancelButton = styled.button`
  border-radius: 5px;
  background: white;
  color: var(--buttonBlue);
  border: none;
  outline: none;
  padding: 5px 20px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  border-radius: 5px;
  background: var(--buttonBlue);
  color: white;
  border: none;
  outline: none;
  padding: 5px 20px;
  cursor: pointer;
`;
