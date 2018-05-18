import fetch from "isomorphic-fetch";
import Modal from "react-modal";
import Form from "react-jsonschema-form";
import styled from "styled-components";

import piwik from "../piwik";
import apiFetch from "./Api";
import RowModal from "./RowModal";
import SearchButton from "./SearchButton";

const ExitButton = styled.button`
  cursor: pointer;
  margin: 5px;
  background-color: grey;
  color: white;
  font-weight: bold;
  border-radius: 50%;
  border: 1px solid;
  border-color: grey;
  box-shadow: 0px 0px 0px grey;
  position: absolute;
  top: 0;
  right: 0;

  &:hover {
    background-color: red;
    border-color: red;
    box-shadow: 0px 0px 0px red;
  }
`;

const ModalInformation = styled(Modal)`
  position: absolute;
  width: 900px !important;
  height: 450px !important;
  background-color: white;
  opacity: 1 !important;
  overflow: auto;
  div.form-group {
    vertical-align: top;
  }
`;

const schema = {
  title: "Modifier vos informations",
  type: "object",
  required: [
    "nom",
    "prenom",
    "telephone",
    "telephone_portable",
    "email",
    "adresse",
    "code_postal",
    "ville",
    "dispo_max",
    "secretariat",
    "nb_secretariat"
  ],
  properties: {
    nom: { type: "string", title: "Nom", default: "" },
    prenom: { type: "string", title: "Prénom", default: "" },
    telephone: { type: "string", title: "Téléphone", default: "" },
    telephone_portable: {
      type: "string",
      title: "Téléphone Portable",
      default: ""
    },
    email: { type: "string", title: "Adresse email", default: "" },
    adresse: { type: "string", title: "Rue", default: "" },
    code_postal: { type: "string", title: "Code Postal", default: "" },
    ville: { type: "string", title: "Commune", default: "" },
    dispo_max: {
      type: "integer",
      title: "Nombre de mesures souhaitées",
      default: ""
    },
    secretariat: {
      type: "boolean",
      title: "Secretariat",
      enumNames: ["Oui", "Non"]
    },
    nb_secretariat: {
      type: "integer",
      title: "Secrétariat : nombre d'ETP",
      default: ""
    }
  }
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const uiSchema = {
  secretariat: {
    "ui:widget": "select" // could also be "select"
  },
  nom: {
    "ui:placeholder": "Nom"
  },
  prenom: {
    "ui:placeholder": "Prénom"
  },
  telephone: {
    "ui:placeholder": "Téléphone"
  },
  telephone_portable: {
    "ui:placeholder": "Téléphone Portable"
  },
  email: {
    "ui:placeholder": "Adresse email"
  },
  adresse: {
    "ui:placeholder": "Rue"
  },
  code_postal: {
    "ui:placeholder": "Code Postal"
    //"ui:options": {
    //  label: false
    //}
  },
  ville: {
    "ui:placeholder": "Commune"
    //"ui:options": {
    //    label: false
    // }
  },
  dispo_max: {
    "ui:placeholder": "Nombre de mesures souhaitées"
  },
  nb_secretariat: {
    "ui:placeholder": "Secrétariat : nombre d'ETP"
  }
  // nb_secretariat: {
  //     "ui:widget": "updown"
  // }
};

class FormulaireMandataire extends React.Component {
  state = {
    data: [],
    datamesure: [],
    currentMandataire: "",
    modalIsOpen: false
  };

  onSubmit = ({ formData }) => {
    apiFetch(`/mandataires/1`, {
      method: "PUT",
      body: JSON.stringify({
        nom: formData.nom || "",
        prenom: formData.prenom || "",
        telephone: formData.telephone || "",
        telephone_portable: formData.telephone_portable || "",
        email: formData.email || "",
        adresse: formData.adresse || "",
        code_postal: formData.code_postal || "",
        ville: formData.ville || "",
        dispo_max: formData.dispo_max || 0,
        secretariat: formData.secretariat,
        nb_secretariat: formData.nb_secretariat || 0
      })
    }).then(json => {
      if (formData.dispo_max !== this.props.currentMandataireModal.dispo_max) {
        piwik.push([
          "trackEvent",
          "mesures",
          "Modification du nombre de mesures souhaitées par un mandataire"
        ]);
      }

      this.props.updateMadataire(json);
    });
    this.closeModal();
  };

  openModal = mandataire => {
    this.setState({ modalIsOpen: true });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const formData = {
      nom: this.props.currentMandataireModal.nom,
      prenom: this.props.currentMandataireModal.prenom,
      telephone: this.props.currentMandataireModal.telephone,
      telephone_portable: this.props.currentMandataireModal.telephone_portable,
      ville: this.props.currentMandataireModal.ville,
      adresse: this.props.currentMandataireModal.adresse,
      secretariat: this.props.currentMandataireModal.secretariat,
      nb_secretariat: this.props.currentMandataireModal.nb_secretariat,
      email: this.props.currentMandataireModal.email,
      code_postal: this.props.currentMandataireModal.code_postal,
      dispo_max: this.props.currentMandataireModal.dispo_max
    };
    return (
      <div className="container">
        {this.props.currentMandataireModal && (
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div style={{ textAlign: "left" }}>
                  <b>
                    {this.props.currentMandataireModal.prenom}{" "}
                    {this.props.currentMandataireModal.nom}
                  </b>
                  <br />
                  {this.props.currentMandataireModal.type}
                  <br />
                  <br />
                  <b>Contact</b>
                  <br />
                  {this.props.currentMandataireModal.prenom}{" "}
                  {this.props.currentMandataireModal.nom}
                  <br />
                  {this.props.currentMandataireModal.telephone}
                  <br />
                  {this.props.currentMandataireModal.telephone_portable}
                  <br />
                  <br />
                  <b> Adresse</b>
                  <br />
                  {this.props.currentMandataireModal.adresse}
                  <br />
                  {this.props.currentMandataireModal.code_postal} <br />
                  {this.props.currentMandataireModal.ville}
                  <br />
                  <br />
                  <b> Nombre de mesures souhaitées</b>
                  <br />
                  {this.props.currentMandataireModal.dispo_max}
                  <br />
                  <br />
                  <b> Secrétariat</b>
                  <br />
                  {this.props.currentMandataireModal.secretariat} -{" "}
                  {this.props.currentMandataireModal.nb_secretariat} <br />
                  <br />
                  <SearchButton
                    className={"btn btn-dark"}
                    onClick={this.openModal}
                  >
                    Modifier mes informations
                  </SearchButton>
                </div>
              </div>
            </div>
          </div>
        )}

        <ModalInformation
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="mandataire"
          background="#e9ecef"
          style={customStyles}
          overlayClassName="OverlayInput"
        >
          <ExitButton onClick={this.closeModal}>X</ExitButton>
          <Form
            schema={schema}
            formData={formData}
            uiSchema={uiSchema}
            onSubmit={this.onSubmit}
          >
            <div
              style={{
                textAlign: "left",
                paddingBottom: "10px",
                marginLeft: "20px"
              }}
            >
              <SearchButton type="submit">Enregistrer</SearchButton>
            </div>
          </Form>
        </ModalInformation>
      </div>
    );
  }
}

export default FormulaireMandataire;
