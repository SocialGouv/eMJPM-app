import Form from "react-jsonschema-form";
import Modal from "react-modal";

import ExitButton from "../ExitButton";

const schema = {
  type: "object",
  required: ["type", "annee"],
  properties: {
    type: {
      type: "string",
      title: "Nature de la mesure",
      enum: ["Tutelle", "Curatelle", "Sauvegarde de justice", "Mesure ad hoc", "MAJ"]
    },
    annee: { type: "integer", title: "Année de naissance" }
  }
};

const uiSchema = {
  annee: {
    "ui:placeholder": "Année de naissance",
    "ui:title": "Nature de la mesure",
    "ui:options": {
      label: false
    }
  },
  type: {
    "ui:placeholder": "Type de mesure",
    "ui:options": {
      label: true
    }
  }
};

const ModalMesureReservation = ({
  isOpen,
  closeModal,
  onClickSubmitMesure,
  formData,
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
      <div style={{ padding: "30px" }}>
        <ExitButton onClick={closeModal}>X</ExitButton>
        <h2>Attribution d'une nouvelle mesure</h2>
        <b>{reservationMandataire.etablissement}</b>
        <br />
        {reservationMandataire.type}
        <br />
        <br />
        {reservationMandataire.etablissement} recevra une notification par email.Une fois le mandat
        reçu le mandataire pourra valider cette attribution de mesure.
        <Form schema={schema} uiSchema={uiSchema} formData={formData} onSubmit={onClickSubmitMesure}>
          <button type="submit" className="btn btn-success">
            Valider
          </button>
          <button onClick={closeModal} className="btn btn-link  ">
            Annuler
          </button>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalMesureReservation;
