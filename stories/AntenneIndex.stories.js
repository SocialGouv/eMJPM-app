import React from "react";
import styled from "styled-components";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../static/css/tabStyle.css";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import Navigation from "../src/components/Navigation";
import TableMesure from "../src/components/TableMesure";
import Footer from "../src/components/Footer";
import FormulaireMandataire from "../src/components/formulaire_mandataire";
import apiFetch from "../src/components/Api";
import TableMesureByAntenne from "../src/components/TableMesureByAntenne";
import InfoAntenne from "../src/components/InfoAntenne";

const nbCol = 1;
const disponibilite = 229;
const dispo_max = 255;

const getColorFromDisponibilite = dispo => {
  if (dispo <= 0) {
    return "#f05659";
  } else if (dispo <= 5) {
    return "#eb9123";
  }
  return "#43b04a";
};

const getSize = nbCol => {
  if (nbCol == 4) {
    return "25%";
  }
  return "50%";
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

const antenne = require("../static/images/icon-antenne.png");
const person = require("../static/images/icon-person.png");

class AntenneIndex extends React.Component {
  state = {
    data: [],
    datamesure: [],
    currentMandataire: ""
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
      <div className="container">
        <Tabs>
          <TabList>
            <div className="panel">
              <div className="panel__container" style={{ paddingBottom: "0px" }}>
                <div style={{ paddingRight: "0px", paddingLeft: "0px", background: "white" }}>
                  <Title>
                    {this.state.currentMandataire.nom} {this.state.currentMandataire.prenom}
                  </Title>
                  <Tab style={tabStyle} style={{ verticalAlign: "middle", width: getSize(nbCol) }}>
                    <PillDispo dispo={disponibilite} dispo_max={dispo_max} />
                    <b>Mesures en cours</b>
                  </Tab>
                  <Tab style={tabStyle} style={{ verticalAlign: "middle", width: getSize(nbCol) }}>
                    <img
                      src={antenne}
                      style={{ padding: "5px", width: "35px ", height: "35px " }}
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
            <InfoAntenne />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

storiesOf("AntenneIndex", module).add("AntenneIndex", () => <AntenneIndex />);
