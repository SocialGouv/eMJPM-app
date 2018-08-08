import apiFetch from "../../communComponents/Api";

export const MANDATAIRES_UPDATED = "MANDATAIRES_UPDATED";
export const MESURES_SHOW = "MESURES_SHOW";
/* ---------- API */

const fetchMandataires = () => apiFetch(`/mandataires`);
const fetchMesures = () => apiFetch("/mesures/popup");

/* ---------- ACTIONS CREATORS */

export const tiMount = () => dispatch =>
    fetchMandataires()
        .then(json => dispatch(mandatairesUpdated(json)))
        .then(() => {
            fetchMesures().then(mesures => dispatch(mesuresShow(mesures)));
        });

/* ----------- PLAIN ACTIONS  */

export const mandatairesUpdated = data => ({
    type: MANDATAIRES_UPDATED,
    data
});

export const mesuresShow = data => ({
    type: MESURES_SHOW,
    data
});