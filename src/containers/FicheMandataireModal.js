import { connect } from "react-redux";
import * as React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { openModalAction, closeModalAction } from "../actions";
import Commentaire from "../components/tiComponents/Commentaire";
import RowModal from "../components/communComponents/RowModal";

function mapStateToProps(state) {
  console.log("hllo", state);

  return { openModal: state.modal.openModal, currentMandataire: state.modal.currentMandataire };
  // currentEtablissementsForSelectedMandataire:
  //   state.modal.currentEtablissementsForSelectedMandataire,
  // allTisForOneMandataire: state.modal.allTisForOneMandataire
}

function mapDispatchToProps(dispatch) {
  return {
    onModalOpen: () => dispatch(openModalAction),
    oncloseModal: () => dispatch(closeModalAction)
  };
}

const TitleMandataire = styled.div`
  text-align: left;
  font-size: 1.5em;
  font-weight: bold;
`;

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class AddModalMandataire extends React.Component {
  /*    componentDidMount() {
        const { dispatch, selectedSubreddit } = this.props
        dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }*/

  render() {
    const {
      openModal,
      oncloseModal,
      currentMandataire,
      allTisForOneMandataire,
      currentEtablissementsForSelectedMandataire
    } = this.props;
    return (
      <Modal
        isOpen={openModal}
        onRequestClose={oncloseModal}
        style={modalStyles}
        contentLabel="mandataire"
        background="#e9ecef"
        className="Modal"
        overlayClassName="Overlay"
      >
        <button onClick={oncloseModal}>X</button>
        <FicheMandataire
          mandataire={currentMandataire}
          currentEtablissementsForSelectedMandataire={currentEtablissementsForSelectedMandataire}
          allTisForOneMandataire={allTisForOneMandataire}
        />
      </Modal>
    );
  }
}
export const FicheMandataire = ({
  mandataire,
  currentEtablissementsForSelectedMandataire,
  allTisForOneMandataire
}) => (
  <div className="container">
    {console.log("manda", mandataire)}
    <div className="row">
      <div className="col-6">
        <TitleMandataire>{mandataire.etablissement}</TitleMandataire>
        <div>{mandataire.type.toUpperCase()}</div>
        <div>{mandataire.genre}</div>
        <RowModal value={mandataire.adresse} />
        <div>
          {mandataire.code_postal} {mandataire.ville.toUpperCase()}
        </div>
        <br />
        <div data-cy="tab-telephone">{mandataire.telephone}</div>
        <div>{mandataire.email}</div>
        <br />
        <div style={{ textAlign: "left" }}>
          <b>Secrétariat </b>
          <br />
          {mandataire.secretariat === true ? "Oui" : "Non"} - {mandataire.nb_secretariat}
          <br />
          {currentEtablissementsForSelectedMandataire && (
            <React.Fragment>
              <b>Etablissement </b> <br />
              {currentEtablissementsForSelectedMandataire.map(etablissement => (
                <div>{etablissement.nom}</div>
              ))}
              <br />
            </React.Fragment>
          )}
          {allTisForOneMandataire && (
            <React.Fragment>
              <b>Tis </b> <br />
              {allTisForOneMandataire.map(ti => (
                <div>
                  {ti.etablissement} <br />
                </div>
              ))}
            </React.Fragment>
          )}
        </div>
      </div>
      <div className="col-6">
        <div
          style={{
            verticalAlign: "middle",
            paddingLeft: 10,
            borderBottom: "20px",
            lineHeight: "40px"
          }}
        >
          Mesures en cours : {mandataire.mesures_en_cours} / {mandataire.dispo_max}
        </div>
        <br />
        <Commentaire currentMandataire={mandataire} />
      </div>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(AddModalMandataire);
