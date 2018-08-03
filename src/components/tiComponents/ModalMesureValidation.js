import Form from "react-jsonschema-form";
import Modal from "react-modal";

import ExitButton from "../ExitButton";

const ModalMesureValidation = ({
  isOpen,
  closeModal,
  reservationMandataire
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="mandataire"
      background="#e9ecef" // style={{ border: "1px solid black" }}
      className="ModalMesureUpdate"
      overlayClassName="OverlayInput"
    >
      <ExitButton onClick={closeModal}>X</ExitButton>
      <h2>Attribution d'une nouvelle mesure</h2>
      <br />
      L'attribution de mesure à bien été envoyée à {reservationMandataire.etablissement}
      <button onClick={closeModal} className="btn btn-link  ">
        Continuer
      </button>
    </Modal>
  );
};

export default ModalMesureValidation;
