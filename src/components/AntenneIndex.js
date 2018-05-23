import React from "react";
import styled from "styled-components";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../../static/css/tabStyle.css";

import Navigation from "./Navigation";
import TableMesure from "./TableMesure";
import Footer from "./Footer";
import FormulaireMandataire from "./formulaire_mandataire";
import apiFetch from "./Api";
import TableMesureByAntenne from "./TableMesureByAntenne";
import InfoAntenne from "./InfoAntenne";

const getColorFromDisponibilite = dispo => {
  if (dispo <= 0) {
    return "#f05659";
  } else if (dispo <= 5) {
    return "#eb9123";
  }
  return "#43b04a";
};

const PillDispo = ({ dispo, dispo_max }) => (
  <Pill
    style={{
      background: getColorFromDisponibilite(dispo_max - dispo)
    }}
  >
    {dispo} / {dispo_max}
  </Pill>
);

const Pill = styled.p`
  font-size: 18px;
  width: 130px;
  height: 28px;
  line-height: 28px;
  border-radius: 2px;
  text-align: center;
  color: white;
  display: inline-block;
  margin-right: 10px;
`;

const Title = styled.div`
  color: black;
  font-size: 1.5em;
`;

const antenne = require("../../static/images/home.svg");
const person = require("../../static/images/user.svg");

class AntenneIndex extends React.Component {
  state = {
    data: [],
    datamesure: [],
    currentService: ""
  };

  componentDidMount() {
    apiFetch(`/serviceAntennes/1/mesures`).then(mesures =>
      apiFetch(`/serviceAntennes/1`).then(mandataire =>
        this.setState({
          datamesure: mesures,
          currentService: mandataire
        })
      )
    );
  }

  updateMesuresService = mesures => {
    this.setState({ datamesure: mesures });
  };

  updateService = mesures => {
    this.setState({ currentService: mesures });
  };

  render() {
    const filteredMesures = this.state.datamesure;
    const tabStyle = {
      backgroundColor: "#ebeff2",
      lineHeight: "50px",
      paddingBottom: 5,
      bottom: 0
    };
    return (
      <div style={{ backgroundColor: "#cad4de" }}>
        <div className="container">
          <Tabs>
            <TabList>
              <div className="panel">
                <div
                  className="panel__container"
                  style={{ paddingBottom: "0px" }}
                >
                  <div
                    style={{
                      paddingRight: "0px",
                      paddingLeft: "0px",
                      background: "white"
                    }}
                  >
                    <Title>
                      {this.state.currentMandataire.nom}{" "}
                      {this.state.currentMandataire.prenom}
                    </Title>
                    <Tab
                      style={tabStyle}
                      style={{
                        verticalAlign: "middle",
                        width: "50% !important"
                      }}
                    >
                      <PillDispo
                        dispo={this.disponibilite}
                        dispo_max={this.dispo_max}
                      />
                      <b>Mesures en cours</b>
                    </Tab>
                    <Tab
                      style={tabStyle}
                      style={{
                        verticalAlign: "middle",
                        width: "50% !important"
                      }}
                    >
                      <img
                        src={antenne}
                        style={{
                          padding: "5px",
                          width: "35px ",
                          height: "35px "
                        }}
                      />
                      <b>Information des antennes</b>
                    </Tab>
                  </div>
                </div>
              </div>
            </TabList>

            <TabPanel>
              <TableMesureByAntenne />
            </TabPanel>
            <TabPanel>
              <InfoAntenne
                currentServiceModal={this.state.currentServiceModal}
                updateService={this.updateService}
              />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default AntenneIndex;
