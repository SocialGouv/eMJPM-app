const modal = (
  state = {
    openModal: false,
    currentMandataire: [],
    currentEtablissementsForSelectedMandataire: [],
    allTisForOneMandataire: []
  },
  action
) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        openModal: true,
        currentMandataire: action.currentMandataire,
        currentEtablissementsForSelectedMandataire:
          action.currentEtablissementsForSelectedMandataire,
        allTisForOneMandataire: action.allTisForOneMandataire
      };
    case "CLOSE_MODAL":
      return {
        openModal: false
      };
    default:
      return state;
  }
};

export default modal;
