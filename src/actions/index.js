import apiFetch from "../components/communComponents/Api";

export const closeModalAction = {
  type: "CLOSE_MODAL"
};

export const openModalAction = (
  currentEtablissementsForSelectedMandataire,
  allTisForOneMandataire,
  openModal,
  currentMandataire
) => ({
  type: "OPEN_MODAL",
  currentEtablissementsForSelectedMandataire,
  allTisForOneMandataire,
  openModal,
  currentMandataire
});

export const getInformationforTisAndEtablissementForOneMandataire = (mandataire, openModal) => {
  return dispatch => {
    return apiFetch(`/mandataires/${mandataire.id}/tisEtablissement`).then(
      currentEtablissementsForSelectedMandataire =>
        apiFetch(`/mandataires/${mandataire.id}/tis-by-mandataire`)
          .then(allTisForOneMandataire =>
            dispatch(
              openModalAction(
                currentEtablissementsForSelectedMandataire,
                allTisForOneMandataire,
                openModal,
                mandataire
              )
            )
          )
          .catch(e => {
            console.log(e);
          })
    );
  };
};
