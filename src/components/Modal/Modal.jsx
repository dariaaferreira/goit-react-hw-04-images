import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { Overlay, ModalImg } from "./Modal.styled";

export const Modal = ({ selectedImage, onClose }) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [onClose]);

  const handleClickOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClickOverlay}>
      <ModalImg>
        <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
      </ModalImg>
    </Overlay>
  );
};

Modal.propTypes = {
  selectedImage: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
