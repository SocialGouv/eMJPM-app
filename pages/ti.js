// @flow
import * as React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import fetch from "isomorphic-fetch";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Router from "next/router";
import queryString from "query-string";
import { connect } from "react-redux";

import AddModalMandataire from "../src/containers/FicheMandataireModal";
import apiFetch from "../src/components/communComponents/Api";

const tabStyle = {
  backgroundColor: "#ebeff2",
  paddingBottom: 5,
  bottom: 0,
  textAlign: "middle",
  verticalAlign: "middle",
  lineHeight: "40px",
  width: "50%",
  display: "inline-flex"
};

const TabsShowMandataire = styled.div`
  padding-right: 0px;
  padding-left: 0px;
  background-color: #ebeff2;
  height: 60px;
`;

const OpenStreeMap = dynamic({
  modules: props => ({
    Map: import("../src/components/tiComponents/Map")
  }),
  render: (props, { Map }) => <Map {...props} />
});

const OpenStreeMapMandataires = dynamic({
  modules: props => ({
    MapMandataire: import("../src/components/tiComponents/MapMandataire")
  }),
  render: (props, { MapMandataire }) => <MapMandataire {...props} />
});

function mapStateToProps(state) {
  console.log("mapStateToProps", state.filters.filters, state.filters.mesures);
  return {
    filters: state.filters.filters,
    mesures: state.filters.mesures
  };
}

// postCode => [lat, lon]
const getPostCodeCoordinates = postCode => {
  // return null if no input
  if (!postCode || !postCode.trim()) {
    return Promise.resolve(null);
  }
  return fetch(`https://api-adresse.data.gouv.fr/search/?q=postcode=${postCode}`)
    .then(response => response.json())
    .then(json => json.features[0].geometry.coordinates);
};

const stringMatch = (str, needle) => str.toLowerCase().indexOf(needle.toLowerCase()) !== -1;

// filter and sort list of mandataires

const filterMandataires = (mandataires, filters) => {
  let filteredMandataires = mandataires.filter(mandataire => {
    return stringMatch(mandataire.type, filters.searchType);
  });
  return filteredMandataires.sort(sortMandataires);
};

const filterMesures = (mesures, filters) => {
  let filteredMesures = mesures.filter(mesure => {
    return stringMatch(mesure.type, filters.searchType);
  });
  return filteredMesures.sort(sortMandataires);
};

const sortByDispo = (a, b) => {
  const dispoA = parseFloat(a) || -Infinity;
  const dispoB = parseFloat(b) || -Infinity;
  if (dispoA < dispoB) {
    return -1;
  }
  if (dispoA > dispoB) {
    return 1;
  }
  return 0;
};

const sortMandataires = (a, b) =>
  sortByDispo(a.mesures_en_cours / a.dispo_max, b.mesures_en_cours / b.dispo_max);

type Props = {
  mandataires: Array<mixed>
};

type State = {
  searchType: string,
  modalIsOpen: boolean,
  postcodeCoordinates: string,
  data: Array<mixed>,
  searchNom: string,
  searchVille: string,
  currentMandataire: string,
  postcodeCoordinates: string,
  specialite: string,
  mandaMesures: Array<mixed>
};

class Ti extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      searchType: this.props.filters,
      datamesure: this.props.mesures,
      data: [],
      mandaMesures: [],
      manda: [],
      searchNom: "",
      searchVille: "",
      currentMandataire: "",
      modalIsOpen: false,
      postcodeCoordinates: "",
      specialite: "",
      value: "",
      timer: "inline-block"
    };
  }

  componentDidMount() {
    apiFetch("/mandataires").then(mandataires =>
      apiFetch("/mesures/popup")
        .then(mesures => {
          this.setState({
            data: mandataires,
            datamesure: mesures
          });
        })
        .catch(e => {
          console.log(e);
        })
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.filters.searchType !== this.state.searchType || nextProps.mesures !== this.state.datamesure) {
      this.setState({ searchType: nextProps.filters.searchType, datamesure: nextProps.mesures });
    }
  }

  changeTypeOfMandatairesFilters = filters => {
    const stringified = queryString.stringify(filters);
    apiFetch(`/mesures/popup?${stringified}`)
      .then(mesures => {
        this.setState({
          datamesure: mesures
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  updateMesures = mesures => {
    this.setState({ datamesure: mesures });
  };

  updateMandataireMesures = mesures => {
    this.setState({ mandaMesures: mesures });
  };

  updateMandataireFilters = mandataires => {
    this.setState({ manda: mandataires });
  };

  updateFilters = filters => {
    this.setState(filters, () => this.changeTypeOfMandatairesFilters(filters));
  };
  updateValue = value => {
    this.setState({ value: value });
  };

  updatePostCodeMandataires = mesures => {
    this.setState({ postcodeCoordinates: [mesures.longitude, mesures.latitude] });
  };

  updatePostCodeMandatairesByCommune = mesures => {
    this.setState({ postcodeCoordinates: mesures });
  };

  updateTimer = time => {
    this.setState({ timer: time });
  };

  findPostcode = postCode =>
    getPostCodeCoordinates(postCode).then(coordinates =>
      this.setState({
        postcodeCoordinates: coordinates
      })
    );

  reloadMaps = () => {
    Router.push("/tis");
  };

  render() {
    console.log(this.state.datamesure, this.state.searchType);
    const filteredMandataires = filterMandataires(
      this.state.manda,
      {
        searchType: this.state.searchType
      }
      // this.state.specialite
    );
    const filteredMesures = filterMesures(this.state.mandaMesures, {
      searchType: this.state.searchType
    });
    const mesureCount = this.state.mandaMesures.length;
    const mandataireCount = filteredMandataires.length;
    return (
      <TiView
        mesures={this.state.datamesure}
        postcodeMandataire={this.state.postcodeCoordinates}
        width={"100%"}
        height={"65vh"}
        updateMesures={this.updateMesures}
        updateMandataireMesures={this.updateMandataireMesures}
        filteredMesures={filteredMesures}
        mesureCount={mesureCount}
        updateFilters={this.updateFilters}
        findPostcode={this.findPostcode}
        updatePostCodeMandataires={this.updatePostCodeMandataires}
        updatePostCodeMandatairesByCommune={this.updatePostCodeMandatairesByCommune}
        value={this.state.value}
        updateValue={this.updateValue}
        mandataires={this.state.data}
        updateMandataireFilters={this.updateMandataireFilters}
        mandataireCount={mandataireCount}
        filteredMandataires={filteredMandataires}
        isOpen={this.state.modalIsOpen}
        closeModal={this.closeModal}
        mandataire={this.state.currentMandataire}
        updateTimer={this.updateTimer}
      />
    );
  }
}

const TiView = ({
  mesures,
  postcodeMandataire,
  width,
  height,
  updateMesures,
  updateMandataireMesures,
  filteredMesures,
  mesureCount,
  updateFilters,
  findPostcode,
  updatePostCodeMandataires,
  updatePostCodeMandatairesByCommune,
  value,
  updateValue,
  mandataires,
  updateMandataireFilters,
  mandataireCount,
  filteredMandataires,
  updateTimer
}) => (
  <div className="container" style={{ backgroundColor: "#ebeff2", minHeight: "60vh" }}>
    <Tabs>
      <TabList>
        <TabsShowMandataire className="container">
          <Tab style={tabStyle}>
            <b> Majeurs Protégés</b>
          </Tab>
          <Tab style={tabStyle} data-cy="tab-mandataire">
            <b>Mandataires</b>
          </Tab>
            <Tab style={tabStyle} data-cy="tab-mandataire">
                <b>MandatairesTry</b>
            </Tab>
        </TabsShowMandataire>
      </TabList>
      <TabPanel>
        <OpenStreeMap
          mesures={mesures}
          postcodeMandataire={postcodeMandataire}
          width={width}
          height={height}
          updateMesures={updateMesures}
          updateMandataireMesures={updateMandataireMesures}
          filteredMesures={filteredMesures}
          mesureCount={mesureCount}
          updateFilters={updateFilters}
          findPostcode={findPostcode}
          updatePostCodeMandataires={updatePostCodeMandataires}
          updatePostCodeMandatairesByCommune={updatePostCodeMandatairesByCommune}
          reloadMaps={this.reloadMaps}
          value={value}
          updateValue={updateValue}
          updateTimer={updateTimer}
          mandataires={mandataires}
        />
        <AddModalMandataire />
      </TabPanel>
      <TabPanel>
        <OpenStreeMapMandataires
          mandataires={mandataires}
          postcodeMandataire={postcodeMandataire}
          width={width}
          height={height}
          updateMandataireFilters={updateMandataireFilters}
          updateMandataireMesures={updateMandataireMesures}
          filteredMandataires={filteredMandataires}
          mandataireCount={mandataireCount}
          updateFilters={updateFilters}
          findPostcode={findPostcode}
          updatePostCodeMandataires={updatePostCodeMandataires}
          updatePostCodeMandatairesByCommune={updatePostCodeMandatairesByCommune}
          value={value}
          updateValue={updateValue}
          updateTimer={updateTimer}
        />
        <AddModalMandataire />
      </TabPanel>
        <TabPanel>
            <OpenStreeMap
                mesures={mandataires}
                mandataires={mandataires}
                postcodeMandataire={postcodeMandataire}
                width={width}
                height={height}
                updateMesures={updateMandataireFilters}
                updateMandataireMesures={updateMandataireMesures}
                filteredMesures={filteredMandataires}
                mesureCount={mandataireCount}
                updateFilters={updateFilters}
                findPostcode={findPostcode}
                updatePostCodeMandataires={updatePostCodeMandataires}
                updatePostCodeMandatairesByCommune={updatePostCodeMandatairesByCommune}
                value={value}
                updateValue={updateValue}
                updateTimer={updateTimer}
            />
            <AddModalMandataire />
        </TabPanel>
    </Tabs>
  </div>
);

export default connect(mapStateToProps, null)(Ti);
