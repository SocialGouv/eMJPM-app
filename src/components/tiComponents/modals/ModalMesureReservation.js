import * as React from "react";
import Form from "react-jsonschema-form";

//Redux
import { connect } from "react-redux";
import { show, connectModal } from "redux-modal";
import { bindActionCreators } from "redux";

import Layout from "../../mandataires/modals/Layout";
import { openValidationModal } from "../actions/mandataire";

const schema = {
  type: "object",
  required: ["type", "annee", "civilite"],
  properties: {
    type: {
      type: "string",
      title: "Nature de la mesure",
      enum: [
        "Tutelle",
        "Curatelle",
        "Sauvegarde de justice",
        "Mesure ad hoc",
        "MAJ",
        "tutelle aux biens",
        "tutelle à la personne",
        "tutelle aux biens et à la personne",
        "curatelle simple aux biens",
        "curatelle simple à la personne",
        "curatelle simple aux biens et à la personne",
        "curatelle renforcée aux biens",
        "curatelle renforcée à la personne",
        "curatelle renforcée aux biens et à la personne",
        "sauvegarde de justice",
        "sauvegarde de justice avec mandat spécial"
      ]
    },
    civilite: { type: "string", enum: ["F", "H"] },
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
  civilite: {
    "ui:placeholder": "Genre",
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
  reservationMandataire,
  show,
  openValidationModal,
  handleHide
}) => {
  const formData = {
    mandataire_id: reservationMandataire.id
  };

  return (
    <Layout show={show} handleHide={handleHide}>
      <div style={{ padding: "30px" }}>
        <h2>Attribution d&apos;une nouvelle mesure</h2>
        <b>{reservationMandataire.etablissement}</b>
        <br />
        {reservationMandataire.type}
        <br />
        <br />
        {reservationMandataire.etablissement} recevra une notification par email.Une fois le mandat
        reçu le mandataire pourra valider cette attribution de mesure.
        <br />
        <br />
        <Form
          style={{ margin: 0, padding: 0 }}
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onSubmit={openValidationModal}
        >
          <br />
          <br />
          <button type="submit" className="btn btn-success" data-cy="button-submit-mesure">
            Valider
          </button>
          <button onClick={handleHide} className="btn btn-link  ">
            Annuler
          </button>
        </Form>
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({ show, openValidationModal }, dispatch);
export default connect(
  null,
  mapDispatchToProps
)(connectModal({ name: "ModalMesureReservation" })(ModalMesureReservation));
