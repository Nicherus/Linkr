import React, { useState } from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";

import Map from "./Map";

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

export default function Location({ geolocation, userName }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <IconLocation onClick={toggleModal} />

      <ReactModal
        isOpen={isModalOpen}
        style={customStyles}
        contentLabel="Map Modal"
      >
        <ModalHeader>
          <ModalTitle>{userName}'s location</ModalTitle>
          <IconClose onClick={toggleModal} />
        </ModalHeader>
        <Map location={geolocation} zoomLevel={15} />
      </ReactModal>
    </>
  );
}

const IconLocation = styled(MdLocationOn)`
  color: white;
  margin-left: 10px;
  font-size: 18px;
  cursor: pointer;
`;

const ModalTitle = styled.h1`
  font-family: var(--fontLato);
  font-weight: bold;
  font-size: 34px;
  color: white;
  text-transform: capitalize;
`;

const IconClose = styled(AiOutlineCloseCircle)`
  color: white;
  font-size: 36px;
  cursor: pointer;
`;

const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;
