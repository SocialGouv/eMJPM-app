import apiFetch from "../components/communComponents/Api";

const modal = (
  state = {
    openModal: false,
    currentMandataire: [],
    currentEtablissementsForSelectedMandataire: [],
    allTisForOneMandataire: []
  },
  action
) => {
  console.log("modal reducer", state, action);
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        openModal: true,
        currentMandataire: action.currentMandataire
      };
    // return apiFetch(`/mandataires/${action.currentMandataire.id}/tisEtablissement`).then(
    //   currentEtablissementsForSelectedMandataire =>
    //     apiFetch(`/mandataires/${action.currentMandataire.id}/tis-by-mandataire`)
    //       .then(allTisForOneMandataire => {
    //         return {
    //           currentEtablissementsForSelectedMandataire,
    //           allTisForOneMandataire,
    //           openModal: true,
    //           currentMandataire: action.currentMandataire
    //         };
    //       })
    //       .catch(e => {
    //         console.log(e);
    //       })
    // );
    case "CLOSE_MODAL":
      return {
        openModal: false
      };
    default:
      return state;
  }
};

export default modal;
