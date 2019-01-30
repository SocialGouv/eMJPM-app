import { hide } from "redux-modal";
import piwik from "react-piwik";

import apiFetch from "../../communComponents/Api";
import { mandatairesUpdated } from "../../tiComponents/actions/mandataire";

export const MESURE_UPDATED = "MESURE_UPDATED";
export const MESURE_CLOSED = "MESURE_CLOSED";

// ------------ API STUFF

const updateMesureApi = data =>
  apiFetch(`/mandataires/1/mesures/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

const closeMesureApi = data =>
  apiFetch(`/mandataires/1/mesures/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({
      status: "Eteindre mesure",
      extinction: data.date
    })
  });

// -------- ACTIONS CREATORS

export const updateMesure = data => dispatch =>
  updateMesureApi(data)
    .then(json => {
      dispatch(hide("EditMesure"));
      dispatch(mesureUpdated(json));
      piwik.push(["trackEvent", "Mesures", "Updated", data.id]);
    })
    .catch(e => {
      console.log(e);
      alert("Impossible de soumettre les données");
      throw e;
    });



export const closeMesure = data => dispatch =>
  closeMesureApi(data)
    .then(json => {
      dispatch(hide("CloseMesure"));
      dispatch(mesureClosed(json));
      piwik.push(["trackEvent", "Mesures", "Closed", data.id]);
    })
    .catch(e => {
      console.log(e);
      alert("Impossible de soumettre les données");
      throw e;
    });

// ------------ PLAIN ACTIONS

export const mesureUpdated = data => ({
  type: MESURE_UPDATED,
  data
});

export const mesureClosed = data => ({
  type: MESURE_CLOSED,
  data
});

