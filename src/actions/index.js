import apiFetch from "../components/communComponents/Api";
import queryString from "query-string";

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

export const updateFilters = (filters, mesures) => ({
  type: "UPDATE_FILTERS",
  filters,
  mesures
});

export const changeTypeOfMandatairesFilters = filters => {
  return dispatch => {
    const stringified = queryString.stringify(filters);
    console.log(stringified);
    return apiFetch(`/mesures/popup?${stringified}`)
      .then(mesures => {
        dispatch(updateFilters(filters, mesures));
      })
      .catch(e => {
        console.log(e);
      });
  };
};
