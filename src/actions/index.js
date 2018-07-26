import apiFetch from "../components/communComponents/Api";

export const closeModalAction = {
  type: "CLOSE_MODAL"
};

export const openModalAction = currentMandataire => ({
  type: "OPEN_MODAL",
  currentMandataire

});

/*
function fetchPosts(manda) {
    return dispatch => {
        return apiFetch(`/mandataires/${action.currentMandataire.id}/tisEtablissement`).then(
            currentEtablissementsForSelectedMandataire =>
                apiFetch(`/mandataires/${action.currentMandataire.id}/tis-by-mandataire`)
                    .then(allTisForOneMandataire => dispatch(openModalAction(currentEtablissementsForSelectedMandataire, allTisForOneMandataire,openModal,currentMandataire))));
    }
}*/
