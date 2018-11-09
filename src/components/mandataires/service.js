import apiFetch from "../communComponents/Api";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import DislayDate from "../communComponents/formatFrenchDate";
import FormulaireService from "./formulaireService";
import { applyMiddleware, bindActionCreators, combineReducers, createStore } from "redux";
import mesuresReducer from "../mandataires/reducers/mesures";
import mandataireReducer from "../mandataires/reducers/mandataire";
import { reducer as modal } from "redux-modal";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { mandataireMount } from "../mandataires/actions/mandataire";
import connect from "react-redux/es/connect/connect";
import Provider from "react-redux/es/components/Provider";
import PillDispo from "../mandataires/PillDispo";
import CreateMesure from "../mandataires/CreateMesure";
import TableMesures from "../mandataires/TableMesures";
import { Clock, FilePlus, Home, Map, UserMinus } from "react-feather";
import Profile from "../mandataires/Profile";
import InputFiles from "../mandataires/inputFiles";
import Header from "../mandataires/Header";
import { DummyTabs } from "../index";
import {
  CloseMesure,
  EditMandataire,
  EditMesure,
  ReactivateMesure,
  ValiderMesureEnAttente
} from "../mandataires/modals";

class ServiceTabs extends React.Component {
  /*state = {
    data: [],
    datamesure: [],
    currentMandataire: ""
  };

  componentDidMount() {
    apiFetch(`/mandataires/1`).then(json => {
      this.setState({
        currentMandataire: json
      });
    });
  }
  updateMadataire = mesures => {
    this.setState({ currentMandataire: mesures });
  };

  render() {
    return (
      <Tabs>
        <TabList>
          <div
            className="panel"
            style={{
              textAlign: "left",
              backgroundSize: "cover",
              heigth: "100px !important",
              backgroundColor: "#cad4de"
            }}
          >
            <div className="panel__container" style={{ paddingBottom: "0px" }}>
              <div className="container" style={{ paddingRight: "0px", paddingLeft: "0px" }}>
                <h2 style={{ color: "black" }}>
                  {" "}
                  {this.state.currentMandataire.etablissement} <br />
                </h2>
                <div style={{ textAlign: "right" }}>
                  {" "}
                  {this.state.currentMandataire.update_mesure && (
                    <div>
                      Dernière mise à jour:
                      <DislayDate date={this.state.currentMandataire.update_mesure.slice(0, 10)} />
                    </div>
                  )}
                </div>
                <div
                  style={{ backgroundColor: "#ebeff2", lineHeight: "40px", paddingBottom: "5px" }}
                >
                  <Tab>Vos informations</Tab>
                </div>
              </div>
            </div>
          </div>
        </TabList>
        <div className="container" style={{ backgroundColor: "white", minHeight: "70vh" }}>
          <TabPanel>
            <div style={{ minHeight: "70vh", paddingTop: "10px" }}>
              <FormulaireService
                currentMandataireModal={this.state.currentMandataire}
                updateMadataire={this.updateMadataire}
              />
            </div>
          </TabPanel>
        </div>
      </Tabs>
    );
  }*/

  componentDidMount() {
    // TODO: temp hack to trigger profile load
    if (this.props.onMount) {
      this.props.onMount();
    }
  }

  render() {
    // define the content of the tabs
    const tabs = [
      {
        text: "Mes informations",
        icon: <Home />,
        content: <Profile />
      }
    ];
    return (
      <React.Fragment>
        <Header />
        <DummyTabs tabs={tabs} />
        <EditMesure />
        <CloseMesure />
        <ReactivateMesure />
        <EditMandataire />
        <ValiderMesureEnAttente />
      </React.Fragment>
    );
  }
}

const rootReducer = combineReducers({
  mesures: mesuresReducer,
  mandataire: mandataireReducer,
  modal
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({ onMount: mandataireMount }, dispatch);

// connect to redux store actions
// connect to redux-modal
const ServiceTabsRedux = connect(
  null,
  mapDispatchToProps
)(ServiceTabs);

const Services = () => (
  <Provider store={store}>
    <ServiceTabsRedux />
  </Provider>
);

export default Mandataires;
