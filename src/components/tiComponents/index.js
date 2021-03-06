// @flow
import dynamic from "next/dynamic";
import React from "react";
import Router from "next/router";
import { Users, Archive } from "react-feather";

//redux
import { createStore, combineReducers, applyMiddleware, bindActionCreators } from "redux";
import { reducer as modal } from "redux-modal";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { DummyTabs, LoadingMessage } from "..";
import { tiMount } from "./actions/mandataire";
import mandataireReducer from "./reducers/mandataire";
import mesuresReducer from "./reducers/mesures";
import mapReducer from "./reducers/map";
import {
  FicheMandataireModal,
  ModalMesureValidation,
  ModalMesureReservation,
  EditMesure
} from "./modals";
import TableMesures from "../mandataires/TableMesures";
//import TableMesures from "./TableMesures";
import apiFetch from "../communComponents/Api";

const MapTable = dynamic(() => import("./MapTi"), { ssr: false });

class Ti extends React.Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount();
    }
  }

  reloadMaps = () => {
    Router.push("/tis");
  };

  render() {
    const tabs = [
      {
        text: "Majeurs Protégés",
        icon: <Users />,
        url: "/tis/majeurs",
        content: <MapTable fetch={`/mesures/filters`} />
      },
      {
        text: "Mandataires",
        icon: <Users />,
        url: "/tis/mandataires",
        content: <MapTable fetch={`/mandataires/filters`} isMandataire={true} />
      },
      {
        text: "Mesures réservées",
        icon: <Archive />,
        url: "/tis/mesures",
        content: (
          <TableMesures
            fetch={() => apiFetch(`/mesures/getAllMesuresByTis`)}
            hideColumns={[
              "reactiver",
              "extinction",
              "residence",
              "valider",
              "date_demande",
              "ti",
              "mandataire_id",
              "fin-mandat"
            ]}
          />
        )
      }
    ];
    return (
      <div style={{ backgroundColor: "#ebeff2", minHeight: "60vh" }}>
        <DummyTabs tabs={tabs} />
        <FicheMandataireModal />
        <ModalMesureValidation />
        <ModalMesureReservation />
        <EditMesure />
      </div>
    );
  }
}

const rootReducer = combineReducers({
  mandataire: mandataireReducer,
  modal,
  mesures: mesuresReducer,
  map: mapReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const mapDispatchToProps = dispatch => bindActionCreators({ onMount: tiMount }, dispatch);

// connect to redux store actions
// connect to redux-modal
const TiRedux = connect(
  null,
  mapDispatchToProps
)(Ti);

const Tis = () => (
  <Provider store={store}>
    <TiRedux />
  </Provider>
);

export default Tis;
