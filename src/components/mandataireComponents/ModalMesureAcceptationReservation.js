import Form from "react-jsonschema-form";
import Modal from "react-modal";

import ExitButton from "../ExitButton";

const schema = {
  type: "object",
  required: ["code_postal", "commune", "civilite", "annee", "ouverture"],
  properties: {
    ouverture: {
      type: "string"
    },
    code_postal: { type: "string", title: "Code Postal" }
  }
};

const uiSchema = {
  ouverture: {
    "ui:autofocus": true,
    "ui:title": "Date d'ordonnance",
    "ui:widget": "date",
    "ui:options": {
      label: true
    }
  },
  code_postal: {
    "ui:placeholder": "Code Postal",
    classNames: "input_mesure_commune",
    "ui:options": {
      label: false
    }
  }
};

const ModalMesureAcceptationReservation = ({
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
        <h2>Valider une nouvelle mesure</h2>
        <br />
        <br />
        <p>Une nouvelle mesure vous a été attribué par le </p>
        <br />
        <p>Pour activer cette mesure, veuillez saisir les informations suivantes.</p>
        <Form schema={schema} uiSchema={uiSchema} formData={formData}>
          <button type="submit" className="btn btn-success" onClick={onClickSubmitMesure}>
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

export default ModalMesureAcceptationReservation;
